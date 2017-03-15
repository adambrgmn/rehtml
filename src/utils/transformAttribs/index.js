// @flow

type Attributes = {
  [key: string]: any,
};

const mappings = {
  'accept-charset': 'acceptCharset',
  class: 'className',
  for: 'htmlFor',
  'http-equiv': 'httpEquiv',
};

export default function transformAttribs(ATTRS?: Attributes = {}): Attributes {
  const keys = Object.keys(ATTRS);

  return keys.reduce((acc, key) => {
    const newKey = mappings[key] || key;
    return Object.assign({}, acc, { [newKey]: ATTRS[key] });
  }, {});
}
