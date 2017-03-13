import test from 'tape';

import toObjectTree from './toObjectTree';

test('Module: toObjectTree()', (t) => {
  {
    const should = 'Should turn an html string into an object tree representing the markup';
    const actual = toObjectTree('<div>Hello world!</div>').get();
    const expected = [
      {
        type: 'tag',
        name: 'div',
        attribs: {},
        children: [
          {
            type: 'text',
            data: 'Hello world!',
          },
        ],
      },
    ];

    t.deepEqual(actual, expected, should);
  }

  {
    const should = 'Should work independent of html structure';
    const actual = toObjectTree('<p>First <em>paragraph</em></p><p class="text">Second paragraph</p>').get();
    const expected = [
      {
        type: 'tag',
        name: 'p',
        attribs: {},
        children: [
          { type: 'text', data: 'First ' },
          {
            type: 'tag',
            name: 'em',
            attribs: {},
            children: [{ type: 'text', data: 'paragraph' }],
          },
        ],
      },
      {
        type: 'tag',
        name: 'p',
        attribs: { class: 'text' },
        children: [{ type: 'text', data: 'Second paragraph' }],
      },
    ];

    t.deepEqual(actual, expected, should);
  }

  t.end();
});
