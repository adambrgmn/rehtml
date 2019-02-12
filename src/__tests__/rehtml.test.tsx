import 'jest-dom/extend-expect';
import * as React from 'react';
import { render } from 'react-testing-library';
import { Rehtml } from '../rehtml';

it('should parse an html string and convert it to react elements', () => {
  const html = '<p>Hello world</p>';
  const { getByText } = render(<Rehtml html={html} />);

  expect(getByText(/hello world/i)).toBeInTheDocument();
});

it('should handle html props correctly and map them to the React equivalent', () => {
  const html =
    '<label for="input" data-testid="label" class="label" accept-charset="utf-8">Name: <input type="text"></label>';
  const { getByText } = render(<Rehtml html={html} />);

  const paragraph = getByText(/name/i);
  expect(paragraph).toHaveAttribute('data-testid', 'paragraph');
  expect(paragraph).toHaveAttribute('class', 'text');
  expect(paragraph).toHaveAttribute('accept-charset', 'utf-8');
});

it('should should accept a wrapper', () => {
  const Wrapper = ({
    children,
  }: {
    children: React.ReactNode;
  }): JSX.Element => {
    return <div data-testid="container">{children}</div>;
  };
  const html = '<p>Hello world</p>';
  const { getByTestId } = render(<Rehtml html={html} wrapper={Wrapper} />);

  expect(getByTestId('container')).toBeInTheDocument();
});

it('should accept a mappings object to map html elements to react equivalents', () => {
  const mappings = {
    p: ({ children }: { children: React.ReactNode }) => (
      <p data-testid="paragraph">{children}</p>
    ),
  };
  const html = '<p>Hello world</p>';
  const { getByTestId } = render(<Rehtml html={html} mappings={mappings} />);

  expect(getByTestId('paragraph')).toHaveTextContent(/hello world/i);
});
