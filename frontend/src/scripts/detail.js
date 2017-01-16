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
  }

  recalc(got) {
    this.updateView(got);
  }

  updateView(position){
    if (position) {
      ChessBoard('detail-board', {
        position,
        draggable: true,
        dropOffBoard: 'trash'
      });
    }
  }
}

registerSiftView(new DetailView(window));
