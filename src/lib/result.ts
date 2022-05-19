import Exception from "../error/exception";

class Result<T> {
  constructor(public readonly result: T | Error) {}

  isException(value: T | Error): value is Exception {
    return value instanceof Error;
  }

  isSuccess(value: T | Error): value is T {
    return !(value instanceof Error);
  }
}

export default Result;
