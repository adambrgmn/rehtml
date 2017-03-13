import test from 'tape';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import Rehtml from './rehtml';

test('Core: <Rehtml>', (t) => {
  {
    const html = '<p>Hello world</p>';

    const should = 'Should render a string of html into React markup';
    const actual = renderToStaticMarkup(<Rehtml html={html} />);
    const expected = `<div>${html}</div>`;

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
    const html = '<p>Hello world!</p>';
    const mappings = {
      p: ({ children }) => <p className="test">{children}</p>, // eslint-disable-line
    };

    const should = 'Should accept mappings to map tags to React components';
    const actual = renderToStaticMarkup(<Rehtml html={html} mappings={mappings} />);
    const expected = '<div><p class="test">Hello world!</p></div>';

    t.equal(actual, expected, should);
  }

  {
    const html = '<p>Hello world!</p>';
    const Wrapper = ({ children }) => <article>{children}</article>; // eslint-disable-line

    const should = 'Should accept a Wrapper component for wrapping';
    const actual = renderToStaticMarkup(<Rehtml html={html} Wrapper={Wrapper} />);
    const expected = '<article><p>Hello world!</p></article>';

    t.equal(actual, expected, should);
  }

  t.end();
});
