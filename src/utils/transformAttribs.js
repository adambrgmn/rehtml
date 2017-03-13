// @flow

type Attributes = {
  [key: string]: any,
};

export default function transformAttribs(ATTRS?: Attributes = {}): Attributes {
  const keys = Object.keys(ATTRS);

  return keys.reduce((acc, key) => {
    let newKey;

    switch (key) {
      case 'accept-charset':
        newKey = 'acceptCharset';
        break;
      case 'class':
        newKey = 'className';
        break;
      case 'for':
        newKey = 'htmlFor';
        break;
      case 'http-equiv':
        newKey = 'httpEquiv';
        break;
      default: newKey = key;
    }

    return Object.assign({}, acc, { [newKey]: ATTRS[key] });
  }, {});
}
