// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '备忘录',
  tagline: '',
  favicon: 'img/favicon.ico',
  url: 'https://ydoc.netlify.app',
  baseUrl: '/',
  organizationName: 'yhoaua', 
  projectName: 'doc', 

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  stylesheets: [
    'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css',
  ],
  scripts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js',
      defer: true,
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/meting@2.0.1/dist/Meting.min.js',
      defer: true,
    },
  ],

  clientModules: [require.resolve('./src/theme/Root')],

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ['en', 'zh'],
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
      },
    ],
    // 推荐添加图片缩放插件（需运行 npm install docusaurus-plugin-image-zoom）
    'docusaurus-plugin-image-zoom', 
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/YHOAUA/doc/tree/master/',
          // --- 新增：显示最后修改时间和作者 ---
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: {
          showReadingTime: true,
          // --- 新增：博客也显示修改时间 ---
          showLastUpdateTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/YHOAUA/doc/tree/master/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      // --- 新增：图片缩放配置 ---
      zoom: {
        selector: '.markdown :not(em) > img',
        background: {
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(50, 50, 50)'
        },
        config: {}
      },
      navbar: {
        title: '',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '备忘录',
          },
          {to: 'https://yhoaua.github.io', label: '博客', position: 'left'},
          {to: 'https://ymemo.netlify.app', label: '说说', position: 'left'},
          {to: 'https://navsphere-5ao.pages.dev', label: '导航', position: 'left'},
          {to: 'https://elqnnoft.ap-southeast-1.clawcloudrun.com/', label: '云盘', position: 'left'},
          {
            href: 'https://github.com/YHOAUA/doc',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        // 更新 Copyright 时间
        copyright: `Copyright © ${new Date().getFullYear()} yhoaua. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;