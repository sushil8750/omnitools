export class WorkerManager {
  private worker: Worker | null = null;
  private workerUrl: URL;

  constructor(workerUrl: URL) {
    this.workerUrl = workerUrl;
  }

  async run<T, R>(data: T): Promise<R> {
    return new Promise((resolve, reject) => {
      if (this.worker) {
        this.worker.terminate();
      }

      this.worker = new Worker(this.workerUrl);

      this.worker.onmessage = (event: MessageEvent) => {
        resolve(event.data);
        this.cleanup();
      };

      this.worker.onerror = (error) => {
        reject(error);
        this.cleanup();
      };

      this.worker.postMessage(data);
    });
  }

  private cleanup() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}
