// @flow
import cheerio from 'cheerio';

const getDomTree = (html: string): DomTree => {
  const $ = cheerio.load(`<div id="rehtml-temp-root">${html}</div>`);
  const children = $('#rehtml-temp-root').children().toArray();

  return children;
};

const extractData = (node: DomTreeNode): DomTreeNode => {
  if (node.type === 'text') {
    return Object.assign({}, { type: node.type, data: node.data });
  }

  let tree = Object.assign({}, {
    type: node.type,
    name: node.name,
    attribs: node.attribs,
  });

  if (node.children && node.children.length > 0) {
    tree = Object.assign({}, tree, { children: node.children.map(extractData) });
  }

  return tree;
};

export default function parseHtml(html: string): DomTree {
  const domTree = getDomTree(html);
  return domTree.map(extractData);
}
