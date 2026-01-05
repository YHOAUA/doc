// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '备忘录',
  tagline: '每个平凡的日常或许就是连续发生的奇迹',
  favicon: 'img/favicon.ico',

  // 站点元数据
  url: 'https://ydoc.netlify.app',
  baseUrl: '/',
  organizationName: 'yhoaua', 
  projectName: 'doc', 

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // 外部资源
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

  // 客户端模块
  clientModules: [require.resolve('./src/theme/Root')],

  // 语言配置
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  plugins: [
    // 本地搜索优化：增加路径显示和关键词高亮
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ['en', 'zh'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
    // 图片缩放插件 (请确保已运行 npm install docusaurus-plugin-image-zoom)
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
          // 开启最后更新时间和作者
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: {
          showReadingTime: true,
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
      // 社交分享图片
      image: 'img/docusaurus-social-card.jpg',
      
      // 侧边栏交互优化
      docs: {
        sidebar: {
          hideable: true,            // 支持手动收起侧边栏
          autoCollapseCategories: true, // 展开一个时自动收起其他，保持整洁
        },
      },

      // 图片缩放配置
      zoom: {
        selector: '.markdown :not(em) > img',
        background: {
          light: 'rgba(255, 255, 255, 0.9)',
          dark: 'rgba(50, 50, 50, 0.9)'
        },
        config: {}
      },

      // 目录层级优化：支持到 4 级标题
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
      backToTopButton: true,
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
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} yhoaua. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        // 代码块魔术注释：支持 highlight-next-line 等
        magicComments: [
          {
            className: 'theme-code-block-highlighted-line',
            line: 'highlight-next-line',
            block: {start: 'highlight-start', end: 'highlight-end'},
          },
        ],
      },
    }),
};

export default config;