import test from 'tape';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import convertToReact from '../convertToReact';

test('Module: convertToReact()', (t) => {
  {
    const mock = [
      {
        type: 'tag',
        name: 'p',
        attribs: {},
        children: [
          { type: 'text', data: 'First p' },
        ],
      },
      {
        type: 'tag',
        name: 'p',
        attribs: {},
        children: [
          { type: 'text', data: 'Second p' },
        ],
      },
    ];

    const should = 'Should return an array React elements';
    const actual = renderToStaticMarkup(<div>{convertToReact(undefined)(mock)}</div>);
    const expected = '<div><p>First p</p><p>Second p</p></div>';

    t.equal(actual, expected, should);
  }

  {
    const mock = [
      {
        type: 'tag',
        name: 'p',
        attribs: { class: 'paragraph' },
        children: [
          { type: 'text', data: 'First p' },
        ],
      },
    ];

    const should = 'Should return an array React elements';
    const actual = renderToStaticMarkup(<div>{convertToReact(undefined)(mock)}</div>);
    const expected = '<div><p class="paragraph">First p</p></div>';

    t.equal(actual, expected, should);
  }

  {
    const mock = [
      {
        type: 'tag',
        name: 'img',
        attribs: { src: 'image.jpg' },
        children: [],
      },
    ];

    const mappings = {
      p: ({ children }) => <p className="mapped-p">{children}</p>, // eslint-disable-line
    };

    const should = 'Should return an array React elements';
    const actual = renderToStaticMarkup(<div>{convertToReact(mappings)(mock)}</div>);
    const expected = '<div><img src="image.jpg"/></div>';

    t.equal(actual, expected, should);
  }

  {
    const mock = [
      {
        type: 'tag',
        name: 'p',
        attribs: {},
        children: [
          { type: 'text', data: 'First p' },
        ],
      },
    ];

    const mappings = {
      p: ({ children }) => <p className="mapped-p">{children}</p>, // eslint-disable-line
    };

    const should = 'Should return an array React elements and map the to corresponding mappings';
    const actual = renderToStaticMarkup(<div>{convertToReact(mappings)(mock)}</div>);
    const expected = '<div><p class="mapped-p">First p</p></div>';

    t.equal(actual, expected, should);
  }

  {
    const mock = [
      {
        type: 'tag',
        name: 'p',
        attribs: {},
        children: [
          {
            type: 'tag',
            name: 'a',
            attribs: { href: '/' },
            children: [
              {
                type: 'tag',
                name: 'em',
                attribs: {},
                children: [
                  { type: 'text', data: 'Hello' },
                ],
              },
            ],
          },
        ],
      },
    ];

    const should = 'Should return an array React elements and work on deeply nested objects';
    const actual = renderToStaticMarkup(<div>{convertToReact(undefined)(mock)}</div>);
    const expected = '<div><p><a href="/"><em>Hello</em></a></p></div>';

    t.equal(actual, expected, should);
  }

  t.end();
});
