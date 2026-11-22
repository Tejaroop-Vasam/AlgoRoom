import re

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
