import Exception from "./exception";

class DatabaseException extends Exception {
  constructor(message: string, error: Error) {
    super(message, "DATABASE", error);
  }
}

export default DatabaseException;
