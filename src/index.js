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

export default function Rehtml({
  html,
  mappings = {},
  Wrapper = DefaultWrapper,
}: Props) {
  if (!Wrapper) return null;

  const parsedHtml = parseHtml(html);
  const children = convertToReact(mappings)(parsedHtml);

  return (
    <Wrapper>{children}</Wrapper>
  );
}

Rehtml.defaultProps = {
  Wrapper: DefaultWrapper,
  mappings: {},
};
