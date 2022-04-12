import BusinessException from "../business-exception";

class UserBirthdateNotInformedException extends BusinessException {
  constructor(public readonly message: string) {
    super(message);
  }
}

export default UserBirthdateNotInformedException;
