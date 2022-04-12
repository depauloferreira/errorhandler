import Person from "../entity/person";
import PersonRepository from "../repository/person-repository";

class FetchPersonById {
  constructor(public readonly repository: PersonRepository) {}

  async execute(id: string): Promise<Person> {
    return await this.repository.getById(id);
  }
}

export default FetchPersonById;
