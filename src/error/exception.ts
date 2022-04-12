import * as crypto from "crypto";

abstract class Exception extends Error {
  public readonly id: string;
  public readonly error: Error;

  constructor(message: string, public readonly type: string, error?: Error) {
    super(message);
    this.id = crypto.randomUUID();
    this.error = error || new Error(this.message);
  }
}

export default Exception;
