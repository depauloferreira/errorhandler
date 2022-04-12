import BusinessException from "../business-exception";

class UserFirstNameAndLastNameNotInformedException extends BusinessException {
  constructor(public readonly message: string) {
    super(message);
  }
}

export default UserFirstNameAndLastNameNotInformedException;
