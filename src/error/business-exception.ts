import Exception from "./exception";

class BusinessException extends Exception {
  constructor(public readonly message: string) {
    super(message, "BUSINESS");
  }
}

export default BusinessException;
