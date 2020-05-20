module.exports = {
  assetPrefix: `https://cdn.jsdelivr.net/gh/reactnativecn/pushy-site@gh-pages/`,
  siteMetadata: {
    title: 'Pushy - React Native热更新',
    description: '极速热更新框架 for React Native',
    author: 'React Native中文网',
    siteUrl: 'https://pushy.reactnative.cn',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-56829695-1',
      },
    },
    {
      resolve: 'gatsby-plugin-less',
      options: {
        javascriptEnabled: true,
      },
    },
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-plugin-antd',
      options: {
        style: true,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },

    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: '/docs',
        path: `${__dirname}/docs/`,
      },
    },
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     name: '/blog',
    //     path: `${__dirname}/blog/`,
    //   },
    // },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
          'gatsby-remark-img-warpper-p',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              noInlineHighlight: true,
            },
          },
        ],
      },
    },
    'gatsby-plugin-sitemap',
    // 'gatsby-plugin-offline'
  ],
};
