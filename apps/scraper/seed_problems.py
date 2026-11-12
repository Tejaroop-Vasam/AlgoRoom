#!/usr/bin/env python3
import argparse
import json
import os
import re
import sys
from pathlib import Path
import boto3
import psycopg
from psycopg.types.json import Jsonb
import requests
from dotenv import load_dotenv
SCRAPER_DIR = Path(__file__).resolve().parent
APPS_DIR = SCRAPER_DIR.parent
PROJECT_ROOT = APPS_DIR.parent

for env_candidate in [SCRAPER_DIR / '.env', APPS_DIR / 'server' / '.env', PROJECT_ROOT / '.env']:
    if env_candidate.exists():
        load_dotenv(env_candidate)
        break

DATA_DIR = SCRAPER_DIR / 'data'
SERVER_DATA_DIR = APPS_DIR / 'server' / 'data'

CACHE_FILE = DATA_DIR / 'neenza-problems.json'
if not CACHE_FILE.exists() and (SERVER_DATA_DIR / 'neenza-problems.json').exists():
    CACHE_FILE = SERVER_DATA_DIR / 'neenza-problems.json'

NEENZA_URL = 'https://raw.githubusercontent.com/neenza/leetcode-problems/master/merged_problems.json'


def download_dataset(url: str, dest_path: Path):
    print(f"Downloading dataset from {url}...")
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    
    with requests.get(url, stream=True, timeout=60) as r:
        r.raise_for_status()
        with open(dest_path, 'wb') as f:
            for chunk in r.iter_content(chunk_size=1024 * 1024):
                if chunk:
                    f.write(chunk)
    print(f"Download complete: {dest_path}")


def init_r2_client():
    account_id = os.getenv("R2_ACCOUNT_ID")
    access_key = os.getenv("R2_ACCESS_KEY_ID")
    secret_key = os.getenv("R2_SECRET_ACCESS_KEY")
    endpoint_url = os.getenv("R2_ENDPOINT") or (f"https://{account_id}.r2.cloudflarestorage.com" if account_id else None)
    bucket_name = os.getenv("R2_BUCKET_NAME", "test-cases")

    if not (access_key and secret_key and endpoint_url):
        print("Cloudflare R2 credentials not fully specified in environment. Skipping R2 uploads.")
        return None, None

    try:
        s3 = boto3.client(
            "s3",
            endpoint_url=endpoint_url,
            aws_access_key_id=access_key,
            aws_secret_access_key=secret_key,
            region_name="auto",
        )
        s3.head_bucket(Bucket=bucket_name)
        print(f"Connected to Cloudflare R2 bucket: '{bucket_name}'")
        return s3, bucket_name
    except Exception as e:
        print(f"Warning: Could not connect to Cloudflare R2 bucket '{bucket_name}': {e}")
        return None, None


def upload_test_cases_to_r2(s3, bucket_name: str, key: str, test_cases: list) -> bool:
    if not s3 or not bucket_name:
        return False
    try:
        body = json.dumps(test_cases, indent=2).encode('utf-8')
        s3.put_object(
            Bucket=bucket_name,
            Key=key,
            Body=body,
            ContentType='application/json',
        )
        return True
    except Exception as e:
        print(f"Failed to upload test cases to R2 for key '{key}': {e}")
        return False


def parse_example_text(raw_text: str, idx: int):
    if not raw_text:
        return None

    input_match = re.search(r"Input:\s*([\s\S]*?)(?=\nOutput:|$)", raw_text, re.IGNORECASE)
    output_match = re.search(r"Output:\s*([\s\S]*?)(?=\nExplanation:|$)", raw_text, re.IGNORECASE)
    expl_match = re.search(r"Explanation:\s*([\s\S]*)", raw_text, re.IGNORECASE)

    if not input_match or not output_match:
        return None

    return {
        "id": idx + 1,
        "input": input_match.group(1).strip(),
        "expectedOutput": output_match.group(1).strip(),
        "explanation": expl_match.group(1).strip() if expl_match else None,
    }


JAVA_DRIVER_TEMPLATE = """import java.util.*;

// __USER_CODE__

class __Driver {
    public static void main(String[] args) throws Exception {
        String raw = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8).trim();
        if (raw.isEmpty()) return;

        List<String> rawArgs = parseInputArgs(raw);
        java.lang.reflect.Method target = findTargetMethod(rawArgs.size());
        if (target == null) {
            throw new RuntimeException("No matching method found in class Solution");
        }
        target.setAccessible(true);

        Class<?>[] paramTypes = target.getParameterTypes();
        java.lang.reflect.Type[] genericTypes = target.getGenericParameterTypes();
        Object[] callArgs = new Object[paramTypes.length];
        for (int i = 0; i < paramTypes.length; i++) {
            Object parsed = parseJsonValue(rawArgs.get(i));
            callArgs[i] = convertArg(parsed, paramTypes[i], genericTypes[i]);
        }

        Object result;
        try {
            result = target.invoke(new Solution(), callArgs);
        } catch (java.lang.reflect.InvocationTargetException e) {
            Throwable cause = e.getCause();
            if (cause instanceof Exception) throw (Exception) cause;
            if (cause instanceof Error) throw (Error) cause;
            throw new RuntimeException(cause);
        }

        if (target.getReturnType() == void.class) {
            System.out.println(callArgs.length > 0 ? toJson(callArgs[0]) : "null");
        } else {
            System.out.println(toJson(result));
        }
    }

    private static java.lang.reflect.Method findTargetMethod(int argCount) {
        java.lang.reflect.Method fallback = null;
        for (java.lang.reflect.Method m : Solution.class.getDeclaredMethods()) {
            if (m.isSynthetic() || m.isBridge() || "main".equals(m.getName())) continue;
            if (java.lang.reflect.Modifier.isPublic(m.getModifiers()) && m.getParameterCount() == argCount) {
                return m;
            }
            if (m.getParameterCount() == argCount && fallback == null) {
                fallback = m;
            }
        }
        return fallback;
    }

    private static List<String> parseInputArgs(String raw) {
        List<String> assignments = new ArrayList<>();
        int depth = 0;
        boolean inStr = false;
        char strCh = 0;
        int start = 0;
        boolean hasAssignment = false;

        for (int i = 0; i < raw.length(); i++) {
            char c = raw.charAt(i);
            if (inStr) {
                if (c == '\\\\') { i++; continue; }
                if (c == strCh) inStr = false;
                continue;
            }
            if (c == '"' || c == '\\'') {
                inStr = true;
                strCh = c;
            } else if (c == '[' || c == '{' || c == '(') {
                depth++;
            } else if (c == ']' || c == '}' || c == ')') {
                depth--;
            } else if (c == '=' && depth == 0) {
                hasAssignment = true;
            } else if (c == ',' && depth == 0 && hasAssignment) {
                String rest = raw.substring(i + 1).trim();
                if (rest.matches("^[a-zA-Z_][a-zA-Z0-9_]*\\\\s*=.*")) {
                    assignments.add(raw.substring(start, i).trim());
                    start = i + 1;
                }
            }
        }

        if (hasAssignment) {
            assignments.add(raw.substring(start).trim());
            List<String> values = new ArrayList<>();
            for (String item : assignments) {
                int eq = item.indexOf('=');
                values.add(eq >= 0 ? item.substring(eq + 1).trim() : item);
            }
            return values;
        }

        List<String> lines = new ArrayList<>();
        for (String line : raw.split("\\\\R")) {
            String trimmed = line.trim();
            if (!trimmed.isEmpty()) lines.add(trimmed);
        }
        return lines;
    }

    private static Object parseJsonValue(String s) {
        return new JsonParser(s).parse();
    }

    private static final class JsonParser {
        private final String s;
        private int pos = 0;

        JsonParser(String s) { this.s = s.trim(); }

        Object parse() {
            skipWs();
            if (pos >= s.length()) return null;
            char c = s.charAt(pos);
            if (c == '[') return parseArray();
            if (c == '"') return parseString();
            if (c == '\\'') {
                pos++;
                StringBuilder sb = new StringBuilder();
                while (pos < s.length() && s.charAt(pos) != '\\'') {
                    if (s.charAt(pos) == '\\\\' && pos + 1 < s.length()) pos++;
                    sb.append(s.charAt(pos++));
                }
                if (pos < s.length()) pos++;
                return sb.toString();
            }
            if (s.startsWith("true", pos)) { pos += 4; return Boolean.TRUE; }
            if (s.startsWith("false", pos)) { pos += 5; return Boolean.FALSE; }
            if (s.startsWith("null", pos)) { pos += 4; return null; }

            int start = pos;
            while (pos < s.length() && ",]} \\t\\r\\n".indexOf(s.charAt(pos)) == -1) pos++;
            String token = s.substring(start, pos);
            if (token.contains(".") || token.contains("e") || token.contains("E")) {
                try { return Double.parseDouble(token); } catch (Exception ignored) {}
            }
            try { return Long.parseLong(token); } catch (Exception ignored) {}
            return token;
        }

        private List<Object> parseArray() {
            pos++;
            List<Object> list = new ArrayList<>();
            skipWs();
            if (pos < s.length() && s.charAt(pos) == ']') { pos++; return list; }
            while (pos < s.length()) {
                list.add(parse());
                skipWs();
                if (pos < s.length() && s.charAt(pos) == ',') { pos++; continue; }
                if (pos < s.length() && s.charAt(pos) == ']') { pos++; break; }
                break;
            }
            return list;
        }

        private String parseString() {
            pos++;
            StringBuilder sb = new StringBuilder();
            while (pos < s.length()) {
                char c = s.charAt(pos++);
                if (c == '"') break;
                if (c == '\\\\' && pos < s.length()) {
                    char esc = s.charAt(pos++);
                    if (esc == 'n') sb.append('\\n');
                    else if (esc == 't') sb.append('\\t');
                    else if (esc == 'r') sb.append('\\r');
                    else sb.append(esc);
                } else {
                    sb.append(c);
                }
            }
            return sb.toString();
        }

        private void skipWs() {
            while (pos < s.length() && Character.isWhitespace(s.charAt(pos))) pos++;
        }
    }

    @SuppressWarnings("unchecked")
    private static Object convertArg(Object val, Class<?> type, java.lang.reflect.Type genericType) {
        if (val == null) return null;
        if (type == int.class || type == Integer.class) return ((Number) val).intValue();
        if (type == long.class || type == Long.class) return ((Number) val).longValue();
        if (type == double.class || type == Double.class) return ((Number) val).doubleValue();
        if (type == float.class || type == Float.class) return ((Number) val).floatValue();
        if (type == boolean.class || type == Boolean.class) return (Boolean) val;
        if (type == char.class || type == Character.class) {
            String str = String.valueOf(val);
            return str.isEmpty() ? '\\0' : str.charAt(0);
        }
        if (type == String.class) return String.valueOf(val);

        if (type == int[].class) {
            List<Object> list = (List<Object>) val;
            int[] arr = new int[list.size()];
            for (int i = 0; i < list.size(); i++) arr[i] = ((Number) list.get(i)).intValue();
            return arr;
        }
        if (type == long[].class) {
            List<Object> list = (List<Object>) val;
            long[] arr = new long[list.size()];
            for (int i = 0; i < list.size(); i++) arr[i] = ((Number) list.get(i)).longValue();
            return arr;
        }
        if (type == double[].class) {
            List<Object> list = (List<Object>) val;
            double[] arr = new double[list.size()];
            for (int i = 0; i < list.size(); i++) arr[i] = ((Number) list.get(i)).doubleValue();
            return arr;
        }
        if (type == boolean[].class) {
            List<Object> list = (List<Object>) val;
            boolean[] arr = new boolean[list.size()];
            for (int i = 0; i < list.size(); i++) arr[i] = (Boolean) list.get(i);
            return arr;
        }
        if (type == char[].class) {
            List<Object> list = (List<Object>) val;
            char[] arr = new char[list.size()];
            for (int i = 0; i < list.size(); i++) {
                String s = String.valueOf(list.get(i));
                arr[i] = s.isEmpty() ? '\\0' : s.charAt(0);
            }
            return arr;
        }
        if (type == String[].class) {
            List<Object> list = (List<Object>) val;
            String[] arr = new String[list.size()];
            for (int i = 0; i < list.size(); i++) arr[i] = String.valueOf(list.get(i));
            return arr;
        }
        if (type == int[][].class) {
            List<Object> outer = (List<Object>) val;
            int[][] arr = new int[outer.size()][];
            for (int i = 0; i < outer.size(); i++) arr[i] = (int[]) convertArg(outer.get(i), int[].class, int[].class);
            return arr;
        }
        if (type == char[][].class) {
            List<Object> outer = (List<Object>) val;
            char[][] arr = new char[outer.size()][];
            for (int i = 0; i < outer.size(); i++) arr[i] = (char[]) convertArg(outer.get(i), char[].class, char[].class);
            return arr;
        }
        if (type == String[][].class) {
            List<Object> outer = (List<Object>) val;
            String[][] arr = new String[outer.size()][];
            for (int i = 0; i < outer.size(); i++) arr[i] = (String[]) convertArg(outer.get(i), String[].class, String[].class);
            return arr;
        }
        if (List.class.isAssignableFrom(type) && genericType instanceof java.lang.reflect.ParameterizedType) {
            java.lang.reflect.Type elemType = ((java.lang.reflect.ParameterizedType) genericType).getActualTypeArguments()[0];
            Class<?> elemClass = elemType instanceof Class ? (Class<?>) elemType
                : (elemType instanceof java.lang.reflect.ParameterizedType
                    ? (Class<?>) ((java.lang.reflect.ParameterizedType) elemType).getRawType()
                    : Object.class);
            List<Object> rawList = (List<Object>) val;
            List<Object> out = new ArrayList<>(rawList.size());
            for (Object item : rawList) out.add(convertArg(item, elemClass, elemType));
            return out;
        }
        return val;
    }

    private static String toJson(Object obj) {
        if (obj == null) return "null";
        if (obj instanceof Boolean || obj instanceof Number) return obj.toString();
        if (obj instanceof Character) return "\\"" + escapeJson(obj.toString()) + "\\"";
        if (obj instanceof String) return "\\"" + escapeJson((String) obj) + "\\"";
        if (obj.getClass().isArray()) {
            int len = java.lang.reflect.Array.getLength(obj);
            StringBuilder sb = new StringBuilder("[");
            for (int i = 0; i < len; i++) {
                if (i > 0) sb.append(",");
                sb.append(toJson(java.lang.reflect.Array.get(obj, i)));
            }
            return sb.append("]").toString();
        }
        if (obj instanceof Collection<?>) {
            StringBuilder sb = new StringBuilder("[");
            boolean first = true;
            for (Object item : (Collection<?>) obj) {
                if (!first) sb.append(",");
                first = false;
                sb.append(toJson(item));
            }
            return sb.append("]").toString();
        }
        return obj.toString();
    }

    private static String escapeJson(String s) {
        return s.replace("\\\\", "\\\\\\\\").replace("\\"", "\\\\\\"").replace("\\n", "\\\\n").replace("\\r", "\\\\r").replace("\\t", "\\\\t");
    }
}
"""


CPP_HELPERS = """static string _ar_trim(const string& s) {
    size_t l = 0, r = s.size();
    while (l < r && isspace((unsigned char)s[l])) l++;
    while (r > l && isspace((unsigned char)s[r - 1])) r--;
    return s.substr(l, r - l);
}

static vector<string> _ar_splitInputArgs(const string& raw) {
    string s = _ar_trim(raw);
    vector<string> parts;
    int depth = 0;
    bool inStr = false;
    char strCh = 0;
    size_t start = 0;
    bool hasAssign = false;
    for (size_t i = 0; i < s.size(); i++) {
        char c = s[i];
        if (inStr) {
            if (c == '\\\\') { i++; continue; }
            if (c == strCh) inStr = false;
            continue;
        }
        if (c == '"' || c == '\\'') { inStr = true; strCh = c; }
        else if (c == '[' || c == '{' || c == '(') depth++;
        else if (c == ']' || c == '}' || c == ')') depth--;
        else if (c == '=' && depth == 0) hasAssign = true;
        else if (c == ',' && depth == 0 && hasAssign) {
            size_t j = i + 1;
            while (j < s.size() && isspace((unsigned char)s[j])) j++;
            size_t k = j;
            while (k < s.size() && (isalnum((unsigned char)s[k]) || s[k] == '_')) k++;
            while (k < s.size() && isspace((unsigned char)s[k])) k++;
            if (k < s.size() && s[k] == '=') {
                parts.push_back(_ar_trim(s.substr(start, i - start)));
                start = i + 1;
            }
        }
    }
    if (hasAssign) {
        parts.push_back(_ar_trim(s.substr(start)));
        for (auto& p : parts) {
            size_t eq = p.find('=');
            if (eq != string::npos) p = _ar_trim(p.substr(eq + 1));
        }
        return parts;
    }
    stringstream ss(s);
    string line;
    while (getline(ss, line)) {
        line = _ar_trim(line);
        if (!line.empty()) parts.push_back(line);
    }
    return parts;
}

static int _ar_parse_int(const string& s) { return stoi(_ar_trim(s)); }
static long long _ar_parse_ll(const string& s) { return stoll(_ar_trim(s)); }
static double _ar_parse_double(const string& s) { return stod(_ar_trim(s)); }
static bool _ar_parse_bool(const string& s) { return _ar_trim(s) == "true"; }
static char _ar_parse_char(const string& s) {
    string t = _ar_trim(s);
    if (t.size() >= 2 && (t.front() == '"' || t.front() == '\\'')) return t[1];
    return t.empty() ? '\\0' : t[0];
}
static string _ar_parse_string(const string& s) {
    string t = _ar_trim(s);
    if (t.size() >= 2 && t.front() == '"' && t.back() == '"') return t.substr(1, t.size() - 2);
    return t;
}
static vector<int> _ar_parse_vec_int(const string& s) {
    vector<int> res;
    string t = _ar_trim(s);
    if (t.size() >= 2 && t.front() == '[' && t.back() == ']') t = t.substr(1, t.size() - 2);
    stringstream ss(t);
    string item;
    while (getline(ss, item, ',')) {
        item = _ar_trim(item);
        if (!item.empty()) res.push_back(stoi(item));
    }
    return res;
}
static vector<string> _ar_parse_vec_string(const string& s) {
    vector<string> res;
    string t = _ar_trim(s);
    if (t.size() >= 2 && t.front() == '[' && t.back() == ']') t = t.substr(1, t.size() - 2);
    bool inStr = false;
    string cur;
    for (size_t i = 0; i < t.size(); i++) {
        char c = t[i];
        if (c == '"' && (i == 0 || t[i - 1] != '\\\\')) { inStr = !inStr; cur += c; }
        else if (c == ',' && !inStr) { res.push_back(_ar_parse_string(cur)); cur.clear(); }
        else cur += c;
    }
    if (!_ar_trim(cur).empty()) res.push_back(_ar_parse_string(cur));
    return res;
}
static vector<vector<int>> _ar_parse_vec_vec_int(const string& s) {
    vector<vector<int>> res;
    string t = _ar_trim(s);
    if (t.size() >= 2 && t.front() == '[' && t.back() == ']') t = t.substr(1, t.size() - 2);
    int depth = 0;
    size_t start = 0;
    for (size_t i = 0; i < t.size(); i++) {
        if (t[i] == '[') depth++;
        else if (t[i] == ']') depth--;
        else if (t[i] == ',' && depth == 0) {
            string chunk = _ar_trim(t.substr(start, i - start));
            if (!chunk.empty()) res.push_back(_ar_parse_vec_int(chunk));
            start = i + 1;
        }
    }
    string last = _ar_trim(t.substr(start));
    if (!last.empty()) res.push_back(_ar_parse_vec_int(last));
    return res;
}

static void _ar_print_val(int v) { cout << v; }
static void _ar_print_val(long long v) { cout << v; }
static void _ar_print_val(double v) { cout << v; }
static void _ar_print_val(bool v) { cout << (v ? "true" : "false"); }
static void _ar_print_val(char v) { cout << '"' << v << '"'; }
static void _ar_print_val(const string& v) { cout << '"' << v << '"'; }
template <typename T>
static void _ar_print_val(const vector<T>& vec) {
    cout << '[';
    for (size_t i = 0; i < vec.size(); i++) {
        if (i > 0) cout << ',';
        _ar_print_val(vec[i]);
    }
    cout << ']';
}"""


def _cpp_type_helper(cpp_type: str) -> str:
    norm = re.sub(r"\s+", "", cpp_type)
    mapping = {
        "int": "int",
        "longlong": "ll",
        "double": "double",
        "bool": "bool",
        "char": "char",
        "string": "string",
        "std::string": "string",
        "vector<int>": "vec_int",
        "std::vector<int>": "vec_int",
        "vector<string>": "vec_string",
        "std::vector<string>": "vec_string",
        "vector<vector<int>>": "vec_vec_int",
        "std::vector<vector<int>>": "vec_vec_int",
    }
    return mapping.get(norm, "string")


def generate_java_driver(java_code: str) -> str | None:
    if not java_code or "class Solution" not in java_code:
        return None
    return JAVA_DRIVER_TEMPLATE


def generate_cpp_driver(cpp_code: str) -> str | None:
    if not cpp_code or "class Solution" not in cpp_code:
        return None
    public_idx = cpp_code.find("public:")
    search_body = cpp_code[public_idx + 7:] if public_idx >= 0 else cpp_code
    sig_match = re.search(
        r"^\s*([a-zA-Z0-9_:<>\s\*&]+?)\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)",
        search_body,
        re.MULTILINE,
    )
    if not sig_match:
        return None

    return_type = sig_match.group(1).strip()
    method_name = sig_match.group(2).strip()
    raw_params = sig_match.group(3).strip()

    params = []
    if raw_params:
        for p in raw_params.split(","):
            clean = p.strip().replace("&", "").strip()
            last_space = clean.rfind(" ")
            p_type = clean[:last_space].strip() if last_space >= 0 else clean
            params.append(p_type)

    arg_decls = "\n".join(
        f"    {p_type} arg{idx} = _ar_parse_{_cpp_type_helper(p_type)}(rawArgs[{idx}]);"
        for idx, p_type in enumerate(params)
    )
    call_args = ", ".join(f"arg{idx}" for idx in range(len(params)))
    if return_type == "void":
        print_stmt = "_ar_print_val(arg0);" if params else 'cout << "null";'
        call_line = f"    sol.{method_name}({call_args});\n    {print_stmt}"
    else:
        call_line = f"    auto res = sol.{method_name}({call_args});\n    _ar_print_val(res);"

    return f"""#include <bits/stdc++.h>
using namespace std;

// __USER_CODE__

{CPP_HELPERS}

int main() {{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string raw((istreambuf_iterator<char>(cin)), istreambuf_iterator<char>());
    auto rawArgs = _ar_splitInputArgs(raw);
    Solution sol;
{arg_decls}
{call_line}
    cout << "\\n";
    return 0;
}}
"""


def extract_js_function_name(js_code: str) -> str | None:
    if not js_code:
        return None
    match = re.search(
        r"(?:var|let|const)\s+([a-zA-Z0-9_$]+)\s*=\s*(?:function|\([^)]*\)\s*=>)|function\s+([a-zA-Z0-9_$]+)\s*\(",
        js_code,
    )
    if not match:
        return None
    return match.group(1) or match.group(2)


def generate_javascript_driver(js_code: str) -> str | None:
    fn_name = extract_js_function_name(js_code)
    if not fn_name:
        return None
    return f"""// __USER_CODE__

;(function() {{
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf8').trim();
  if (!raw) return;

  function parseArgs(input) {{
    const parts = [];
    let depth = 0, inStr = false, strCh = '', start = 0, hasAssign = false;
    for (let i = 0; i < input.length; i++) {{
      const c = input[i];
      if (inStr) {{
        if (c === '\\\\') {{ i++; continue; }}
        if (c === strCh) inStr = false;
        continue;
      }}
      if (c === '"' || c === "'") {{ inStr = true; strCh = c; }}
      else if (c === '[' || c === '{{' || c === '(') depth++;
      else if (c === ']' || c === '}}' || c === ')') depth--;
      else if (c === '=' && depth === 0) hasAssign = true;
      else if (c === ',' && depth === 0 && hasAssign) {{
        if (/^[a-zA-Z_][a-zA-Z0-9_]*\\s*=/.test(input.slice(i + 1).trim())) {{
          parts.push(input.slice(start, i).trim());
          start = i + 1;
        }}
      }}
    }}
    if (hasAssign) {{
      parts.push(input.slice(start).trim());
      return parts.map(p => {{
        const eq = p.indexOf('=');
        const val = eq >= 0 ? p.slice(eq + 1).trim() : p;
        try {{ return JSON.parse(val); }} catch {{ return val; }}
      }});
    }}
    return input.split(/\\r?\\n/).map(s => s.trim()).filter(Boolean).map(v => {{
      try {{ return JSON.parse(v); }} catch {{ return v; }}
    }});
  }}

  const args = parseArgs(raw);
  const res = {fn_name}(...args);
  const out = res === undefined ? (args.length > 0 ? args[0] : null) : res;
  console.log(JSON.stringify(out));
}})();
"""


def get_db_connection_string():
    db_url = os.getenv("DATABASE_URL")
    if db_url:
        return db_url
    user = os.getenv("DB_USER", "postgres")
    password = os.getenv("DB_PASSWORD", "postgres")
    host = os.getenv("DB_HOST", "localhost")
    port = os.getenv("DB_DBPORT") or os.getenv("DB_PORT", "5432")
    database = os.getenv("DB_DATABASE", "algoroom")
    return f"postgresql://{user}:{password}@{host}:{port}/{database}"


def main():
    parser = argparse.ArgumentParser(description="Seed coding problems and upload test cases to Cloudflare R2 & PostgreSQL.")
    parser.add_argument("--limit", type=int, default=50, help="Number of problems to seed (default: 50)")
    parser.add_argument("--all", action="store_true", help="Seed all available problems in the dataset")
    args = parser.parse_args()

    if not CACHE_FILE.exists():
        download_dataset(NEENZA_URL, CACHE_FILE)
    else:
        print(f"Using cached dataset: {CACHE_FILE}")

    print("Loading dataset JSON...")
    with open(CACHE_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    questions = data.get("questions", [])
    print(f"Total problems available: {len(questions)}")

    to_process = questions if args.all else questions[: args.limit]
    print(f"Seeding {len(to_process)} problems...")

    s3_client, r2_bucket = init_r2_client()

    conn_str = get_db_connection_string()
    inserted_count = 0
    r2_upload_count = 0

    with psycopg.connect(conn_str) as conn:
        with conn.cursor() as cur:
            for q in to_process:
                title = q.get("title", "").strip()
                description = q.get("description", "").strip()
                problem_slug = q.get("problem_slug", "").strip() or re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')

                if not title or not description:
                    continue

                examples = q.get("examples") or []
                sample_test_cases = []
                for idx, ex in enumerate(examples):
                    parsed = parse_example_text(ex.get("example_text", ""), idx)
                    if parsed and parsed.get("input"):
                        sample_test_cases.append(parsed)

                full_test_cases = [
                    {
                        "id": stc["id"],
                        "input": stc["input"],
                        "expectedOutput": stc["expectedOutput"],
                        "isHidden": False,
                        "explanation": stc.get("explanation"),
                    }
                    for stc in sample_test_cases
                ]

                test_cases_r2_key = None
                if s3_client and r2_bucket and full_test_cases:
                    r2_key = f"problems/{problem_slug}/testcases.json"
                    uploaded = upload_test_cases_to_r2(s3_client, r2_bucket, r2_key, full_test_cases)
                    if uploaded:
                        test_cases_r2_key = r2_key
                        r2_upload_count += 1

                code_snippets = q.get("code_snippets") or {}
                cpp_snippet = code_snippets.get("cpp") or ""
                java_snippet = code_snippets.get("java") or ""
                js_snippet = code_snippets.get("javascript") or ""

                starter_templates = {}
                if cpp_snippet: starter_templates["cpp"] = cpp_snippet
                if java_snippet: starter_templates["java"] = java_snippet
                if js_snippet: starter_templates["javascript"] = js_snippet

                code_templates = {}
                if cpp_snippet:
                    code_templates["cpp"] = {
                        "starterCode": cpp_snippet,
                        "driverCode": generate_cpp_driver(cpp_snippet),
                    }
                if java_snippet:
                    code_templates["java"] = {
                        "starterCode": java_snippet,
                        "driverCode": generate_java_driver(java_snippet),
                    }
                if js_snippet:
                    code_templates["javascript"] = {
                        "starterCode": js_snippet,
                        "driverCode": generate_javascript_driver(js_snippet),
                    }

                raw_diff = (q.get("difficulty") or "Easy").upper()
                difficulty = "HARD" if raw_diff == "HARD" else ("MEDIUM" if raw_diff == "MEDIUM" else "EASY")
                constraints = q.get("constraints") or []
                hints = q.get("hints") or []

                query = """
                INSERT INTO problems (
                    title, description, difficulty, constraints, hints,
                    sample_test_cases, starter_templates, code_templates,
                    test_cases_r2_key, time_limit_ms, memory_limit_mb, updated_at
                ) VALUES (
                    %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, CURRENT_TIMESTAMP
                )
                ON CONFLICT (title) DO UPDATE SET
                    description = EXCLUDED.description,
                    difficulty = EXCLUDED.difficulty,
                    constraints = EXCLUDED.constraints,
                    hints = EXCLUDED.hints,
                    sample_test_cases = EXCLUDED.sample_test_cases,
                    starter_templates = EXCLUDED.starter_templates,
                    code_templates = EXCLUDED.code_templates,
                    test_cases_r2_key = EXCLUDED.test_cases_r2_key,
                    updated_at = CURRENT_TIMESTAMP
                """

                cur.execute(
                    query,
                    (
                        title,
                        description,
                        difficulty,
                        Jsonb(constraints),
                        Jsonb(hints),
                        Jsonb(sample_test_cases),
                        Jsonb(starter_templates),
                        Jsonb(code_templates),
                        test_cases_r2_key,
                        2000,
                        256,
                    ),
                )
                inserted_count += 1
                if inserted_count % 25 == 0 or inserted_count == len(to_process):
                    print(f"Progress: {inserted_count} / {len(to_process)} problems processed (R2 uploaded: {r2_upload_count})...")

        conn.commit()

    print(f"Done! Successfully seeded {inserted_count} problems into PostgreSQL ({r2_upload_count} uploaded to R2).")


if __name__ == "__main__":
    main()
