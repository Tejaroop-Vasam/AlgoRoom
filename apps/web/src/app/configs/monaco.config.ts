import { EnvironmentProviders } from '@angular/core';
import { NgxMonacoEditorConfig, provideMonacoEditor } from 'ngx-monaco-editor-v2';
import type * as Monaco from 'monaco-editor';

export const stitchDarkTheme: Monaco.editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'keyword', foreground: '4edea3', fontStyle: 'bold' },
    { token: 'keyword.python', foreground: '4edea3', fontStyle: 'bold' },
    { token: 'type', foreground: 'ffb95f' },
    { token: 'class', foreground: 'ffb95f' },
    { token: 'string', foreground: 'ffb95f' },
    { token: 'number', foreground: '818cf8' },
    { token: 'comment', foreground: '908fa0', fontStyle: 'italic' },
    { token: 'delimiter', foreground: '908fa0' },
    { token: 'operator', foreground: '4edea3' },
  ],
  colors: {
    'editor.background': '#171f33',
    'editor.foreground': '#dae2fd',
    'editorCursor.foreground': '#dae2fd',
    'editor.lineHighlightBackground': '#222a3d40',
    'editorLineNumber.foreground': '#464554',
    'editorLineNumber.activeForeground': '#6366f1',
    'editor.selectionBackground': '#6366f140',
    'editor.inactiveSelectionBackground': '#6366f120',
    'editorGutter.background': '#060e2050',
    'editorIndentGuide.background1': '#2d344950',
    'editorIndentGuide.activeBackground1': '#6366f180',
    'scrollbarSlider.background': '#2d344980',
    'scrollbarSlider.hoverBackground': '#464554',
    'scrollbarSlider.activeBackground': '#6366f1',
  },
};

export const stitchLightTheme: Monaco.editor.IStandaloneThemeData = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'keyword', foreground: '006c4a', fontStyle: 'bold' },
    { token: 'keyword.python', foreground: '006c4a', fontStyle: 'bold' },
    { token: 'type', foreground: '703a00' },
    { token: 'class', foreground: '703a00' },
    { token: 'string', foreground: '934e00' },
    { token: 'number', foreground: '3525cd' },
    { token: 'comment', foreground: '777587', fontStyle: 'italic' },
    { token: 'delimiter', foreground: '777587' },
    { token: 'operator', foreground: '006c4a' },
  ],
  colors: {
    'editor.background': '#eaedff',
    'editor.foreground': '#131b2e',
    'editorCursor.foreground': '#131b2e',
    'editor.lineHighlightBackground': '#dae2fd50',
    'editorLineNumber.foreground': '#777587',
    'editorLineNumber.activeForeground': '#3525cd',
    'editor.selectionBackground': '#3525cd30',
    'editor.inactiveSelectionBackground': '#3525cd15',
    'editorGutter.background': '#f2f3ff60',
    'editorIndentGuide.background1': '#c7c4d860',
    'editorIndentGuide.activeBackground1': '#3525cd80',
    'scrollbarSlider.background': '#c7c4d880',
    'scrollbarSlider.hoverBackground': '#777587',
    'scrollbarSlider.activeBackground': '#3525cd',
  },
};

export function createLineFormatter() {
  return {
    provideDocumentFormattingEdits(model: any) {
      const lines = model.getLinesContent();
      const cleaned: string[] = [];
      let blankCount = 0;
      for (const line of lines) {
        const trimmed = line.replace(/\s+$/, '');
        if (!trimmed) {
          blankCount++;
          if (blankCount <= 2) cleaned.push('');
        } else {
          blankCount = 0;
          cleaned.push(trimmed);
        }
      }
      return [
        {
          range: model.getFullModelRange(),
          text: cleaned.join('\n') + (cleaned.length ? '\n' : ''),
        },
      ];
    },
  };
}

export const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'assets/monaco/vs',
  onMonacoLoad: () => {
    const monaco = (window as any).monaco;
    if (!monaco) return;

    monaco.editor.defineTheme('stitch-dark', stitchDarkTheme);
    monaco.editor.defineTheme('stitch-light', stitchLightTheme);

    const lineFormatter = createLineFormatter();
    monaco.languages.registerDocumentFormattingEditProvider('python', lineFormatter);
    monaco.languages.registerDocumentFormattingEditProvider('java', lineFormatter);
  },
};

export function provideMonaco(): EnvironmentProviders {
  return provideMonacoEditor(monacoConfig);
}
