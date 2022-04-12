import BusinessException from "../business-exception";
class UserNameNotInformedException extends BusinessException {
  constructor(public readonly message: string) {
    super(message);
  }
}

export default UserNameNotInformedException;
