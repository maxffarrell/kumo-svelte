declare module '*.css';
declare module '@fontsource-variable/inter';
declare module '@fontsource-variable/inter/index.css';
declare module '*?raw' {
  const content: string;
  export default content;
}

declare const __KUMO_VERSION__: string;
declare const __DOCS_VERSION__: string;
declare const __BUILD_DATE__: string;
