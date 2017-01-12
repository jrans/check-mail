/**
 * Check Mail. Frontend controller entry point.
 */
import { SiftController, registerSiftController } from '@redsift/sift-sdk-web';

export default class MyController extends SiftController {
  constructor() {
    // You have to call the super() method to initialize the base class.
    super();
    // this._suHandler = this.onStorageUpdate.bind(this);
  }

  // for more info: http://docs.redsift.com/docs/client-code-siftcontroller
  loadView(state) {
    console.log('check-mail: loadView', state);
    // Register for storage update events on the "x" bucket so we can update the UI
    // this.storage.subscribe(['x'], this._suHandler);
    switch (state.type) {
      case 'email-thread':
        return {
          html: 'email-thread.html',
          data: {}
        };
      case 'summary':
        return {
          html: 'summary.html',
          data: {} //this.getX()
        };
      default:
        console.error('check-mail: unknown Sift type: ', state.type);
    }
  }

  // Event: storage update
  // onStorageUpdate(value) {
  //   console.log('check-mail: onStorageUpdate: ', value);
  //   return this.getX().then(xe => {
  //     // Publish events from 'x' to view
  //     this.publish('counts', xe);
  //   });
  // }

  //  getX() {
  //   return this.storage.getAll({
  //     bucket: 'x'
  //   }).then((values) => {
  //     console.log('check-mail: getX returned:', values);
  //     return {};
  //   });
  // }

}

// Do not remove. The Sift is responsible for registering its views and controllers
registerSiftController(new MyController());
