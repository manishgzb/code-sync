import * as Y from "yjs";
import { ObservableV2 } from "lib0/observable.js";
import {
  encodeAwarenessUpdate,
  applyAwarenessUpdate,
} from "y-protocols/awareness";

export class SocketIoProvider extends ObservableV2 {
  constructor(roomName, awareness, ydoc, socket) {
    super();
    this.roomName = roomName;
    this.awareness = awareness;
    this.ydoc = ydoc;
    this.socket = socket;

    this.ydoc.on("update", (update, origin) => {
      if (origin !== this) {
        this.socket.emit("update", this.roomName, Array.from(update));
      }
    });
    this.socket.on("update", (update) => {
      const u8 = new Uint8Array(update)
      console.log("Received update length:", u8.length);
      Y.applyUpdate(this.ydoc, u8, this);
    });
    this.awareness.on("update", ({ added, updated, removed }) => {
      const update = encodeAwarenessUpdate(
        this.awareness,
        added.concat(updated).concat(removed)
      );
      this.socket.emit("awareness", this.roomName, update);
    });
    this.socket.on("awareness", (update) => {
      applyAwarenessUpdate(this.awareness, update, this);
    });
  }
}
