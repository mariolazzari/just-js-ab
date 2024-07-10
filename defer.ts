// JavaScript’s Deferred Promise Pattern

const init = () => null;

export class Deferred<T, E = unknown> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void = init;
  reject: (reaseon: E) => void = init;

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

export function getUserMicrophoneStream(): Promise<MediaStream> {
  return navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: false,
      autoGainControl: false,
      noiseSuppression: false,
    },
  });
}

export function recordStreamAsBlob(stream: MediaStream) {
  const mediaRecorder = new MediaRecorder(stream);

  const chunks: BlobPart[] = [];
  // let blob: Blob;
  const deferredBlob = new Deferred<Blob, Error>();

  mediaRecorder.addEventListener("dataavailable", e => {
    chunks.push(e.data);
  });

  mediaRecorder.addEventListener("stop", () => {
    // blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
    const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
    deferredBlob.resolve(blob);
  });

  mediaRecorder.start();

  return () => {
    mediaRecorder.stop();
    // return blob;
    return deferredBlob.promise;
  };
}
