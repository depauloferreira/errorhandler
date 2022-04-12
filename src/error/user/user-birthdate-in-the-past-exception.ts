import BusinessException from "../business-exception";

class UserBirthdateInThePastException extends BusinessException {
  constructor(public readonly message: string) {
    super(message);
  }
}

export default UserBirthdateInThePastException;
