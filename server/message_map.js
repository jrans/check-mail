const { map, compose, path, prop, match, converge, merge } = require('ramda');
const { extractValue } = require('./utils.js');


const findKey = value => `${value.threadId}/${value.id}`;
const parseText = compose(prop('1'), match(/\[\s*(\w*?)\s*\]/));
const findText = ({ textBody, strippedHtmlBody }) => textBody
  || strippedHtmlBody
  || ''
;
const findMove = compose(parseText, findText);
const formTurn = converge(
  (key, date, move, f) => ({name: 'turns', key, value: merge({date, move}, f)}),
  [findKey, prop('date'), findMove, prop('from')]
);
const findTurns = map(compose(formTurn, extractValue));

module.exports = compose(findTurns, path(['in', 'data']));
