import { parseHtml } from '../parse-html';

it('should parse an html string into a DOMTree', () => {
  const html = '<p class="foo">Hello world</p>';
  const result = parseHtml(html);

  expect(result).toMatchSnapshot();
});

it('should handle advanced html trees', () => {
  const html =
    '<div id="foo"><ul class="list"><li class="list-item"><a href="/about">About</a></li><li class="list-item"><a href="/contact">Contact</a></li></ul><input type="text" required></div>';
  const result = parseHtml(html);

  expect(result).toEqual([
    {
      type: 'tag',
      name: 'div',
      props: { id: 'foo' },
      children: [
        {
          type: 'tag',
          name: 'ul',
          props: { class: 'list' },
          children: ['About', 'Contact'].map(title => ({
            type: 'tag',
            name: 'li',
            props: { class: 'list-item' },
            children: [
              {
                type: 'tag',
                name: 'a',
                props: { href: `/${title.toLowerCase()}` },
                children: [{ type: 'text', data: title }],
              },
            ],
          })),
        },
        {
          type: 'tag',
          name: 'input',
          props: { type: 'text', required: true },
          children: [],
        },
      ],
    },
  ]);
});
