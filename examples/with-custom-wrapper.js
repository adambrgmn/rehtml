import React from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import Rehtml from 'rehtml';

/**
 * I'm using styled-components here for
 * convenience. You can ofcourse write your own.
 * But remember that they must render children.
 */
const Title = styled.h1`
  font-family: sans-serif;
  font-size: 4rem;
`;

const Paragraph = styled.p`
  font-family: serif;
  font-size: 1.125rem;
`;

const Italic = styled.em`
  font-style: italic;
`;

const Link = styled.a`
  text-decoration: none;
  color: currentColor;
  &:hover { text-decoration: underline; }
`;

const mappings = {
  h1: Title,
  p: Paragraph,
  em: Italic,
  a: Link,
};

const Wrapper = ({ children }) => <article>{children}</article>;
Wrapper.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.node).isRequired,
};

function ArticleContent(props) {
  return <Rehtml html={props.html} mappings={mappings} Wrapper={Wrapper} />;
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
