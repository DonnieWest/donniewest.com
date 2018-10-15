const path = require('path');
const componentWithMDXScope = require('gatsby-mdx/component-with-mdx-scope');


function getSlug(node) {
  const parts = node.fileAbsolutePath.split('/')
  return parts[parts.length - 1].split('.')[0]
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent);

    createNodeField({
      name: 'id',
      node,
      value: node.id,
    });

    createNodeField({
      name: 'title',
      node,
      value: node.frontmatter.title,
    });

    createNodeField({
      name: 'description',
      node,
      value: node.frontmatter.description || '',
    });

    createNodeField({
      name: 'slug',
      node,
      value: node.frontmatter.slug || getSlug(node),
    });

    createNodeField({
      name: 'date',
      node,
      value: node.frontmatter.date || '',
    });

    createNodeField({
      name: 'banner',
      node,
      banner: node.frontmatter.banner,
    });

    createNodeField({
      name: 'categories',
      node,
      value: node.frontmatter.categories || ['none'],
    });

    createNodeField({
      name: 'keywords',
      node,
      value: node.frontmatter.keywords || [],
    });
  }
};
