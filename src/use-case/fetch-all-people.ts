import Person from "../entity/person";
import PersonRepository from "../repository/person-repository";

class FetchAllPeople {
  constructor(public readonly repository: PersonRepository) {}

  async execute(): Promise<Person[]> {
    return await this.repository.getAll();
  }
}

export default FetchAllPeople;
