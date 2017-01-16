const { Chess } = require('chess.js');
const { extractValue } = require('./utils.js');

module.exports = function (got) {
  let check, gameOver, fen;
  const [ threadId ] = got.query;
  const chess = new Chess();
  const turns = got.in.data
    .map(extractValue)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
  ;
  turns.forEach(turn => chess.move(turn.move));
  gameOver = chess.game_over();
  check = chess.in_check();
  fen = chess.fen();

  return [
    { name: 'games', key: threadId, value: chess.ascii() },
    {
      name: 'threads',
      key: threadId,
      value: { list: { gameOver, check, fen }, detail: fen }
    }
  ];
};
