import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import bash from 'shiki/langs/bash.mjs';
import css from 'shiki/langs/css.mjs';
import diff from 'shiki/langs/diff.mjs';
import graphql from 'shiki/langs/graphql.mjs';
import hcl from 'shiki/langs/hcl.mjs';
import html from 'shiki/langs/html.mjs';
import javascript from 'shiki/langs/javascript.mjs';
import json from 'shiki/langs/json.mjs';
import jsonc from 'shiki/langs/jsonc.mjs';
import jsx from 'shiki/langs/jsx.mjs';
import markdown from 'shiki/langs/markdown.mjs';
import python from 'shiki/langs/python.mjs';
import sql from 'shiki/langs/sql.mjs';
import svelte from 'shiki/langs/svelte.mjs';
import toml from 'shiki/langs/toml.mjs';
import tsx from 'shiki/langs/tsx.mjs';
import typescript from 'shiki/langs/typescript.mjs';
import yaml from 'shiki/langs/yaml.mjs';
import githubLight from 'shiki/themes/github-light.mjs';
import vesper from 'shiki/themes/vesper.mjs';

const languageAliases: Record<string, string> = {
  cjs: 'javascript',
  cts: 'typescript',
  gql: 'graphql',
  js: 'javascript',
  md: 'markdown',
  mjs: 'javascript',
  mts: 'typescript',
  py: 'python',
  sh: 'bash',
  shell: 'bash',
  ts: 'typescript',
  txt: 'text',
  yml: 'yaml',
  zsh: 'bash'
};

const supportedLanguages = new Set([
  'bash',
  'css',
  'diff',
  'graphql',
  'hcl',
  'html',
  'javascript',
  'jsx',
  'json',
  'jsonc',
  'markdown',
  'python',
  'sql',
  'svelte',
  'toml',
  'tsx',
  'typescript',
  'yaml'
]);

const highlighter = createHighlighterCore({
  engine: createJavaScriptRegexEngine(),
  langs: [
    ...bash,
    ...css,
    ...diff,
    ...graphql,
    ...hcl,
    ...html,
    ...javascript,
    ...json,
    ...jsonc,
    ...jsx,
    ...markdown,
    ...python,
    ...sql,
    ...svelte,
    ...toml,
    ...tsx,
    ...typescript,
    ...yaml
  ],
  themes: [githubLight, vesper]
});

export const KUMO_SHIKI_THEMES = {
  light: 'github-light',
  dark: 'vesper'
} as const;

export function normalizeCodeLanguage(lang: string) {
  const normalized = languageAliases[lang] ?? lang;
  return supportedLanguages.has(normalized) ? normalized : 'text';
}

export async function highlightCode(code: string, lang: string) {
  const normalizedLang = normalizeCodeLanguage(lang);
  if (normalizedLang === 'text') return escapePlainCode(code);

  return (await highlighter).codeToHtml(code, {
    lang: normalizedLang,
    themes: KUMO_SHIKI_THEMES,
    defaultColor: false
  });
}

function escapePlainCode(code: string) {
  const escaped = code.replace(/[&<>]/g, (character) => {
    if (character === '&') return '&amp;';
    if (character === '<') return '&lt;';
    return '&gt;';
  });

  return `<pre class="shiki shiki-themes github-light vesper"><code><span class="line">${escaped}</span></code></pre>`;
}
