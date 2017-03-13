import React from 'react';
import { curry, propOr, map, ifElse, isEmpty, always, identity, prop, propEq, compose, apply, assoc } from 'ramda';

import transformAttributes from './utils/transformAttribs';
import hashString from './utils/hashString';

const DefaultElement = curry((node, attributes, { children }) => React.createElement(
  node.name,
  attributes,
  children,
));

const ifEmptyReturnNull = ifElse(
  isEmpty,
  always(null),
  identity,
);

const propChildren = prop('children');
const propAttribs = prop('attribs');
const propName = prop('name');
const propData = prop('data');
const propTypeEqText = propEq('type', 'text');


const mapToReact = curry((mappings, objectTree) => {
  const mapWithMappings = mapToReact(mappings);

  const buildReactElArgs = (node) => {
    const hashNode = compose(hashString, JSON.stringify);
    const addKeyToAttributes = assoc('key', hashNode(node));

    const attributes = compose(addKeyToAttributes, transformAttributes, propAttribs)(node);
    const children = compose(ifEmptyReturnNull, mapWithMappings, propChildren)(node);
    const Element = propOr(
      DefaultElement(node, attributes),
      propName(node),
      mappings,
    );

    return [Element, attributes, children];
  };

  const mapper = ifElse(
    propTypeEqText,
    propData,
    compose(
      apply(React.createElement),
      buildReactElArgs,
    ),
  );

  return map(mapper, objectTree);
});

export default mapToReact;
