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
    this.synced = false;

    const syncTimeOut = setTimeout(() => {
      if (!this.synced) {
        this.synced = true;
        this.emit("synced", [true]);
      }
    },250);

    this.ydoc.on("update", (update, origin) => {
      if (origin !== this) {
        this.socket.emit("update", this.roomName, Array.from(update));
      }
    });
    this.socket.on("update", (update) => {
      const u8 = new Uint8Array(update);
      Y.applyUpdate(this.ydoc, u8, this);
    });
    this.awareness.on("update", ({ added, updated, removed }) => {
      const update = encodeAwarenessUpdate(
        this.awareness,
        added.concat(updated).concat(removed)
      );
      this.socket.emit("awareness", this.roomName, Array.from(update));
    });
    this.socket.on("awareness", (update) => {
      const u8 = new Uint8Array(update);
      applyAwarenessUpdate(this.awareness, u8, this);
    });

    this.socket.on("request-awareness", () => {
      const update = encodeAwarenessUpdate(this.awareness, [
        this.awareness.clientID,
      ]);
      this.socket.emit("awareness", this.roomName, Array.from(update));
    });
    this.socket.on("sync-step-1", (stateVector) => {
      const diff = Y.encodeStateAsUpdate(
        this.ydoc,
        new Uint8Array(stateVector)
      );
      this.socket.emit("sync-step-2", this.roomName, Array.from(diff));
    });
    this.socket.on("sync-step-2", (update) => {
      clearTimeout(syncTimeOut);
      Y.applyUpdate(this.ydoc, new Uint8Array(update));
      if (!this.synced) {
        this.synced = true;
        this.emit("synced", [true]);
      }
    });

    this.socket.on("connect", () => {
      const stateVector = Y.encodeStateAsUpdate(this.ydoc);
      this.socket.emit("sync-step-1", this.roomName, Array.from(stateVector));
      const awarenessUpdate = encodeAwarenessUpdate(this.awareness, [
        this.awareness.clientID,
      ]);
      this.socket.emit("awareness");
      this.socket.emit("request-awareness", roomName);
    });
    if (this.socket.connected) {
      const stateVector = Y.encodeStateAsUpdate(this.ydoc);
      this.socket.emit("sync-step-1", this.roomName, Array.from(stateVector));
    }
  }
}
