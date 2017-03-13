// @flow
import React from 'react';

type Props = {
  children: any,
}

export default function Wrapper({ children }: Props) {
  return (<div>{children}</div>);
}
