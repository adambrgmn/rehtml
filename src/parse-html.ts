import { parseFragment } from 'parse5';

interface TextNode {
  type: 'text';
  data: string;
}

interface TagNode {
  type: 'tag';
  name: keyof JSX.IntrinsicElements;
  props: Record<string, string | boolean>;
  children: (TextNode | TagNode)[];
}

type DOMNode = TextNode | TagNode;
type DOMTree = DOMNode[];

const parseHtml = (html: string) => {
  const parsed = parseFragment(html);

  const reduceChildren = (nodes: any[]): DOMTree =>
    nodes.reduce((tree: DOMTree, node: any) => {
      switch (node.nodeName) {
        case '#text':
          const textNode: TextNode = {
            type: 'text',
            data: node.value as string,
          };

          return [...tree, textNode];

        default:
          const tagNode: TagNode = {
            type: 'tag',
            name: node.tagName as keyof JSX.IntrinsicElements,
            props: node.attrs.reduce(
              (
                acc: Record<string, string>,
                { name, value }: { name: string; value: string },
              ) => ({ ...acc, [name]: value }),
              {},
            ),
            children: reduceChildren(node.childNodes),
          };
          return [...tree, tagNode];
      }
    }, []);

  // @ts-ignore
  const nodes = reduceChildren(parsed.childNodes);
  return nodes;
};

export { parseHtml };
