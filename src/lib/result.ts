import Exception from "../error/exception";

class Result<T> {
  constructor(public readonly result: T | Exception) {}

  getException(): Exception | null {
    return (this.result instanceof Exception && this.result) || null;
  }

  getValue(): T | null {
    return (!(this.result instanceof Exception) && this.result) || null;
  }
}

export default Result;
