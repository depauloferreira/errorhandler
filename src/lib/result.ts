import Exception from "../error/exception";

class Result<T> {
  constructor(public readonly result: T | Exception) {}

  isException(value: T | Exception): value is Exception {
    return this.result instanceof Exception;
  }

  isSuccess(value: T | Exception): value is T {
    return !(this.result instanceof Exception);
  }
}

export default Result;
