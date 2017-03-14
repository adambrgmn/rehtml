// @flow
import React from 'react';

import transformAttributes from '../utils/transformAttribs';
import hashString from '../utils/hashString';


export default function convertToReact(mappings: Mappings = {}) {
  return function mapToReact(domTree: DomTree): Array<React$Element<any> | string> {
    return domTree.map((node: DomTreeNode) => {
      if (node.type === 'text') return node.data;

      const Element = mappings[node.name] || node.name;
      const attributes = Object.assign({}, transformAttributes(node.attribs), {
        key: hashString(JSON.stringify(node)),
      });
      let children = null;

      if (node.children && node.children.length > 0) {
        children = mapToReact(node.children);
      }

      return React.createElement(
        Element,
        attributes,
        children,
      );
    });
  };
}
