import * as crypto from "crypto";
import BusinessException from "../error/business-exception";
import UserNameNotInformedException from "../error/user/user-name-not-informed-exception";

class Person {
  validateNameInforme(): void {
    if (!this.name) {
      throw new BusinessException("The name is empty");
    }
  }

  validateNameAndLastName(): void {
    if (this.name.trim().split(" ").length < 2) {
      throw new BusinessException(
        "You must to inform first name and last name"
      );
    }
  }

  validateBirthdateInformed() {
    if (!this.birthdate) {
      throw new BusinessException("You must to inform the birthdate");
    }
  }

  validateBirthdateInPast() {
    if (this.birthdate > new Date(Date.now())) {
      throw new BusinessException("The birthdate must to be in past");
    }
  }

  validate(): void {
    this.validateNameInforme();
    this.validateNameAndLastName();
    this.validateBirthdateInformed();
    this.validateBirthdateInPast();
  }

  constructor(
    public readonly name: string,
    public readonly birthdate: Date,
    public readonly id: string = crypto.randomUUID()
  ) {
    this.validate();
  }
}

export default Person;
