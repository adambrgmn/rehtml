/* eslint-disable */
declare type Text = {
  type: 'text',
  data: string,
};

declare type Tag = {
  type: 'tag',
  name: string,
  attribs: { [key: string]: string },
  children?: Array<Tag | Text>,
};

declare type DomTreeNode = Tag | Text;
declare type DomTree = Array<DomTreeNode>;

declare type Mappings = {
  [key: string]: ReactClass<any>,
};
