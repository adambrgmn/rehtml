// @flow
import React from 'react';

import parseHtml from './parseHtml';
import convertToReact from './convertToReact';
import DefaultWrapper from './defaultWrapper';

type Props = {
  html: string,
  mappings?: Mappings,
  Wrapper?: ReactClass<*>,
};

const defaultProps = { Wrapper: DefaultWrapper, mappings: {}, html: '' };
export default function Rehtml({ html, mappings, Wrapper }: Props = defaultProps) {
  if (!Wrapper) return null;

  const parsedHtml = parseHtml(html);
  const children = convertToReact(mappings)(parsedHtml);

  return (
    <Wrapper>{children}</Wrapper>
  );
}

Rehtml.defaultProps = {
  Wrapper: DefaultWrapper,
};
