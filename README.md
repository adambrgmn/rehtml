# [![Rehtml](media/header.png)](https://github.com/adambrgmn/rehtml)

> 🕴 Magically transform HTML to React components without danger

[![Build Status](https://travis-ci.org/adambrgmn/rehtml.svg?branch=master)](https://travis-ci.org/adambrgmn/rehtml) [![npm version](https://badge.fury.io/js/rehtml.svg)](https://badge.fury.io/js/rehtml) [![Dependency Status](https://dependencyci.com/github/adambrgmn/rehtml/badge)](https://dependencyci.com/github/adambrgmn/rehtml)

Have you found yourself using Reacts `dangerouslySetInnerHTML` and feeling a bit ashamed? Despair not – Rehtml can convert your HTML string into React components.

## Installation

```console
$ yarn add rehtml
# or npm install rehtml --save
```

or via a script tag:

```html
<script src="https://unpkg.com/rehtml"></script>
<!-- This file exposes the variable Rehtml (note that it also requires React) -->
```

## Usage

### Basic
```javascript
import Rehtml from 'rehtml';

export default function Article({ html }) {
  return <Rehtml html={html} />;
}
```

That's basically all you have to do make it work. It will parse your HTML string and create corresponding React components.


### Custom Wrapper

By default Rehtml will wrap all your HTML inside a div without any styles at all. But you can easily customize the wrapping object using prop `Wrapper`. The most important thing to remember is to make the component render `children`:

```javascript
import Rehtml from 'rehtml';

function Wrapper({ children }) {
  return (
    <article className="post">
      {children}
    </article>
  );
}

export default function Article({ html }) {
  return <Rehtml html={html} Wrapper={Wrapper} />;
}
```

### Custom Elements

By default Rehtml will transform your HTML into corresponing React elements. That means that `<p class="foo">Bar</p>` will be a React element like `<p className="foo">Bar</p>`. But you can choose to map the HTML elements to any React component you wish:

```javascript
import Rehtml from 'rehtml';

function P({ children }) {
  return (
    <p style={{ color: 'red' }}>
      {children}
    </p>
  );
}

export default function Article({ html }) {
  const mappings = {
    p: Paragraph, // the key must correspond to a HTML element, e.g. a, p, em, strong, div etc.
  };

  return <Rehtml html={html} mappings={mappings} />;
}
```

Just like the Wrapper it's important to note that your custom elements must render the `children` prop.

This type of mapping works very will with "css-in-js"-modules like [`styled-components`](https://github.com/styled-components/styled-components):

```javascript
import Rehtml from 'rehtml';
import styled from 'styled-components';

const A = styled.a`
  text-decoration: none;
  color: #bada55;
`;

export default function Article({ html }) {
  const mappings = {
    a: A,
  };

  return <Rehtml html={html} mappings={mappings} />;
}
```


## Props

| Prop | Required | Default | Examples
| --- | --- | --- | ---
| html | `true` | (Not applicable) | `<p>Foo <em>bar</em></p>`
| Wrapper | `false` | `<div>{children}</div>` | `<article>{children}</article>`
| mappings | `false` | `{}` | `{ a: Link, em: Italic, strong: Bold }`


## License

Licensed under the MIT License, Copyright © 2016 Adam Bergman

See [LICENSE](./LICENSE) for more information.
