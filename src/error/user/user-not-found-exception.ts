import BusinessException from "../business-exception";

class UserNotFoundException extends BusinessException {
  constructor(public readonly userId: string) {
    super(`We couldn't find a user for the id: '${userId}'`);
  }
}

export default UserNotFoundException;
