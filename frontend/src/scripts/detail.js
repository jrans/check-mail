/* global ChessBoard */
import { SiftView, registerSiftView } from '@redsift/sift-sdk-web';

export default class DetailView extends SiftView {
  constructor() {
    // You have to call the super() method to initialize the base class.
    super();
    this.controller.subscribe('recalc', this.recalc.bind(this));
  }

  presentView(got) {
    this.updateView(got.data);
    document.getElementById('detail-reset').onclick = this.resetPosition.bind(this);
  }

  recalc(got) {
    this.updateView(got);
  }

  updateView(position){
    if (position) {
      this.chessBoard = ChessBoard('detail-board', {
        position,
        draggable: true,
        dropOffBoard: 'trash',
        onDrop: console.log
      });
      this.startPosition = position;
    }
  }

  resetPosition() {
    this.chessBoard.position(this.startPosition);
  }
}

registerSiftView(new DetailView(window));
