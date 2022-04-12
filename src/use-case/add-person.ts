import Person from "../entity/person";
import PersonRepository from "../repository/person-repository";

class AddPersonUseCase {
  constructor(public readonly repository: PersonRepository) {}

  async execute(person: Person): Promise<Person> {
    return await this.repository.save(person);
  }
}

export default AddPersonUseCase;
