import test from 'tape';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import Rehtml from './rehtml';

test('Core: <Rehtml>', (t) => {
  {
    const html = '<div>Hello world</div>';

    const should = 'Should render a string of html into React markup';
    const actual = renderToStaticMarkup(<Rehtml html={html} />);
    const expected = html;

    t.equal(actual, expected, should);
  }

  {
    const html = '<p>First paragraph</p><p>Second paragraph</p>';

    const should = 'Should wrap siblings in a div';
    const actual = renderToStaticMarkup(<Rehtml html={html} />);
    const expected = `<div>${html}</div>`;

    t.equal(actual, expected, should);
  }

  {
    const html = '<div>Hello world!</div>';
    const mappings = {
      div: ({ children }) => <div className="test">{children}</div>, // eslint-disable-line react/prop-types
    };

    const should = 'Should accept mappings to map tags to React components';
    const actual = renderToStaticMarkup(<Rehtml html={html} mappings={mappings} />);
    const expected = '<div class="test">Hello world!</div>';

    t.equal(actual, expected, should);
  }

  t.end();
});
