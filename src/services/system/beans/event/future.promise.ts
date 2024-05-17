export class FuturePromise<T> {
  protected state: 'new' | 'resolved' | 'rejected' = 'new';
  protected resolvedCallback: (data: any) => void;
  protected rejectCallback: (error: any) => void;
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolvedCallback = resolve;
      this.rejectCallback = reject;
    });
  }
  protected promise: Promise<T>;
  public getState(): 'new' | 'resolved' | 'rejected' {
    return this.state;
  }
  public async wait() {
    return await this.promise;
  }
  public resolve(data: any) {
    this.resolvedCallback(data);
    this.state = 'resolved';
  }
  public reject(error: any) {
    this.rejectCallback(error);
    this.state = 'rejected';
  }
}
