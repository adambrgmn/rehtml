import test from 'tape';

import parseHtml from '../parseHtml';

test('Module: parseHtml()', (t) => {
  {
    const should = 'Should turn an html string into an object tree representing the markup';
    const actual = parseHtml('<div>Hello world!</div>');
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
    const actual = parseHtml('<p>First <em>paragraph</em></p><p class="text">Second paragraph</p>');
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

  {
    const should = 'Should work independent of html structure';
    const actual = parseHtml('<p>Paragraph <img src="cat.jpg"></p>');
    const expected = [
      {
        type: 'tag',
        name: 'p',
        attribs: {},
        children: [
          { type: 'text', data: 'Paragraph ' },
          {
            type: 'tag',
            name: 'img',
            attribs: { src: 'cat.jpg' },
          },
        ],
      },
    ];

    t.deepEqual(actual, expected, should);
  }

  t.end();
});
