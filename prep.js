const posts = require('./src/posts.json')

const routes = posts.map(post => `/${post.slug}`);
routes.push('/archive');
routes.push('/');

exports.default = () => ({
  routes,
  timeout: 1000,
  dimensions: {
    width: 1440,
    height: 900,
  },
  https: true,
  hostname: 'https://donniewest.com',
  minify: true,
})
