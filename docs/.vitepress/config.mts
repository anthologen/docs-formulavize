import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Formulavize",
  description: "Visual workflow editor for the fiz DSL",
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/formulavize_logo.svg' }],
    ['link', { rel: 'alternate icon', type: 'image/x-icon', href: '/favicon.ico' }],
  ],
  themeConfig: {
    search: {
      provider: 'local',
    },

    logo: '/formulavize_logo.svg',
    nav: [
      { text: 'Guide', link: '/guide/calls-and-variables' },
      { text: 'Reference', link: '/reference/language-syntax' },
      { text: 'App', link: '/app/editor' },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/getting-started' },
        ],
      },
      {
        text: 'Guide',
        items: [
          { text: 'Calls & Variables', link: '/guide/calls-and-variables' },
          { text: 'Namespaces', link: '/guide/namespaces' },
          { text: 'Imports', link: '/guide/imports' },
          { text: 'Styling', link: '/guide/styling' },
          { text: 'Renderers', link: '/guide/renderers' },
          { text: 'About Notes', link: '/guide/about-notes' },
        ],
      },
      {
        text: 'Reference',
        items: [
          { text: 'Language Syntax', link: '/reference/language-syntax' },
          { text: 'Style Properties', link: '/reference/style-properties' },
          { text: 'Renderer Directives', link: '/reference/renderer-directives' },
          { text: 'Compilation Errors', link: '/reference/errors' },
        ],
      },
      {
        text: 'App',
        items: [
          { text: 'Editor', link: '/app/editor' },
          { text: 'Export & Options', link: '/app/export-and-options' },
          { text: 'Command Line', link: '/app/cli' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/formulavize/docs-formulavize' },
    ],
  },
})
