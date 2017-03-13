// @flow
import cheerio from 'cheerio';
import { propEq, pick, lensProp, compose, ifElse, has, over, identity, map } from 'ramda';
import Either from 'data.either';

type Text = {
  type: 'text',
  data: string,
};

type Tag = {
  type: 'tag',
  name: string,
  attribs: { [key: string]: string },
  children: Array<Tag | Text>,
};

const isText = propEq('type', 'text');
const pickText = pick(['type', 'data']);
const pickTag = pick(['type', 'name', 'attribs', 'children']);

const lensChildren = lensProp('children');

// extractData :: { k: v } -> { k: v }
function extractData(node) {
  return compose(
    ifElse(
      has('children'),
      over(lensChildren, map(extractData)),
      identity,
    ),
    ifElse(
      isText,
      pickText,
      pickTag,
    ),
  )(node);
}

// getDomTree :: String -> Either(Error, Array<Tag | Text>)
const getDomTree = (html) => {
  const $ = cheerio.load(`<div id="rehtml-temp-root">${html}</div>`);
  const children = $('#rehtml-temp-root').children().toArray();

  return Either.fromNullable(children);
};

export default function toObjectTree(html: string): Array<Tag | Text> {
  return compose(
    map(map(extractData)),
    getDomTree,
  )(html);
}
