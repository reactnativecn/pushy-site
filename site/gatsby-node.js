// eslint-disable-next-line import/no-extraneous-dependencies
// const fsExtra = require('fs-extra');

exports.createPages = require('./gatsby/createPages');
exports.onCreateNode = require('./gatsby/onCreateNode');

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  if (page.path !== '/' && page.path.endsWith('/')) {
    deletePage(page);
    // eslint-disable-next-line no-param-reassign
    page.path = page.path.replace(/\/$/, '.html');
    // console.log(page.path);
    createPage(page);
  }
};
