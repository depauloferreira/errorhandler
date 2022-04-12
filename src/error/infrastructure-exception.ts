import Exception from "./exception";

class InfrastructureException extends Exception {
  constructor(message: string, error?: Error) {
    super(message, "INFRASTRUCTURE", error);
  }
}

export default InfrastructureException;
