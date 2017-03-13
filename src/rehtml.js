// @flow
import React, { Component } from 'react';
import R from 'ramda';

import DefaultWrapper from './defaultWrapper';
import toObjectTree from './toObjectTree';
import toReact from './toReact';

type Mappings = { [key: string]: ReactClass<any> };

type Props = {
  html: string,
  mappings?: Mappings,
  Wrapper: ReactClass<any>,
}

export default class Rehtml extends Component {
  props: Props
  static defaultProps: { Wrapper: ReactClass<any> }

  toReact = (
    html: string,
    mappings?: Mappings,
  ): Array<ReactClass<any>> => {
    const transformHtml = R.compose(
      R.map(toReact(mappings)),
      toObjectTree,
    );

    return transformHtml(html).get();
  }

  render() {
    const Container = this.props.Wrapper;
    return (
      <Container>
        {this.toReact(this.props.html, this.props.mappings)}
      </Container>
    );
  }
}

Rehtml.defaultProps = {
  mappings: {},
  Wrapper: DefaultWrapper,
};
