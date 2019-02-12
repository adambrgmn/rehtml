import React, { ReactNode, ComponentType } from 'react';

interface RehtmlProps {
  html: string;
  wrapper?: ComponentType<{ children: ReactNode }>;
  mappings?: {
    [key: string]: ComponentType<
      { children: ReactNode } & { [key: string]: any }
    >;
  };
}

function Rehtml({
  html,
  wrapper = React.Fragment,
  mappings,
}: RehtmlProps): JSX.Element {
  const Wrapper = wrapper;
  return (
    <Wrapper>
      <div />
    </Wrapper>
  );
}

export { Rehtml };
