const mdxFeed = require('gatsby-mdx/feed')

module.exports = {
  siteMetadata: {
    title: 'Donnie West',
    description: 'My Personal Blog',
    siteUrl: 'https://donniewest.com',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
        omitGoogleFont: false,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: `${__dirname}/src/assets/`,
        },
      },
    },
    {
      resolve: 'gatsby-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 600,
              sizeByPixelDensity: true,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: { sh: 'bash' },
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
        ],
        defaultLayouts: {
          posts: require.resolve('./src/components/layout.js'),
          default: require.resolve('./src/components/layout.js'),
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Donnie West',
        short_name: 'DW',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#2f4f4f',
        display: 'minimal-ui',
        icon: 'src/images/logo.png',
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-feed',
      options: mdxFeed,
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-netlify', // make sure to put last in the array
  ],
}
