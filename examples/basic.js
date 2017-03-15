import React from 'react';
import { render } from 'react-dom';
import Rehtml from 'rehtml';

function ArticleContent(props) {
  return <Rehtml html={props.html} />;
}

ArticleContent.propTypes = { html: React.PropTypes.string.isRequired };

/**
 * Ideally this string of HTML should come from
 * some form of API call – probably in another
 * container component wrapping the pure
 * component ArticleContent.
 */
const html = `
  <h1 class="article-title">Foo bar</h1>
  <p class="article-paragraph">Lorem <em>ipsum</em>...</p>
  <a href="#">Get in touch</a>
`;

const rootEl = document.getElementById('root');
render(<ArticleContent html={html} />, rootEl);
