/**
 * Check Mail. Email client controller entry point.
 */
import { EmailClientController, registerEmailClientController } from '@redsift/sift-sdk-web';

export default class MyEmailClientController extends EmailClientController {
  constructor() {
    super();
  }

  loadThreadListView (game) {
    if (game) {
      return {
        template: '003_list_common_img',
        value: {
          image: { url: game.gameOver
            ? 'assets/chess_game_over.png'
            : game.check ? 'assets/chess_check.png' : 'assets/chess_active.png'
          },
          subtitle: game.fen
        }
      };
    }
  }
}

registerEmailClientController(new MyEmailClientController());
