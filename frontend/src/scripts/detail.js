/* global ChessBoard */
import { SiftView, registerSiftView } from '@redsift/sift-sdk-web';
import Chess from 'chess.js';

export default class DetailView extends SiftView {

  constructor() {
    super();
    [
      'recalc','onDrop','onDragStart','onSnapEnd', 'resetPosition'
    ].forEach(method => this[method] = this[method].bind(this));
    this.controller.subscribe('recalc', this.recalc);
    this.game = new Chess();
    this.plannedMove = document.getElementsByClassName('detail--planned')[0];
    this.resetButton = document.getElementsByClassName('detail--reset')[0];
    this.board = new ChessBoard('detail--board', {
      draggable: true,
      dropOffBoard: 'trash',
      onDragStart: this.onDragStart,
      onDrop: this.onDrop,
      onSnapEnd: this.onSnapEnd
    });
    this.resetButton.onclick = this.resetPosition;
  }

  presentView (got) {
    this.updateView(got.data);
  }

  recalc (got) {
    this.updateView(got);
  }

  updateView (position){
    if (position) {
      this.startPosition = position;
      this.resetPosition();
    }
  }

  resetPosition () {
    this.game.load(this.startPosition);
    this.board.position(this.startPosition);
    this.plannedMove.innerText = '';
  }

  onDragStart (_, piece) {
    return !this.game.game_over() && piece.indexOf(this.game.turn()) > -1;
  }

  onDrop (from, to) {
    const move = this.game.move({from, to, promotion: 'q'});
    if (move === null) return 'snapback';
    this.plannedMove.innerText = this.plannedMove.innerText === ''
      ? `[ ${move.san} ]`
      : this.plannedMove.innerText
    ;
    return;
  }

  onSnapEnd () {
    this.board.position(this.game.fen());
  }
}

registerSiftView(new DetailView(window));
