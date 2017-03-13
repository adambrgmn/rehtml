import test from 'tape';

import transformAttribs from './transformAttribs';

test('Utils: transformAttribs()', (t) => {
  const ATTR = {
    'accept-charset': 'test',
    class: 'test',
    for: 'test',
    'http-equiv': 'test',
    checked: 'test',
  };

  const should = 'Should transform attribute keys to match React conventions';
  const actual = transformAttribs(ATTR);
  const expected = {
    acceptCharset: 'test',
    className: 'test',
    htmlFor: 'test',
    httpEquiv: 'test',
    checked: 'test',
  };

  t.deepEqual(actual, expected, should);
  t.end();
});
