import Result from "../lib/result";
import Person from "../entity/person";
import AddPersonUseCase from "../use-case/add-person";
import FetchAllPeople from "../use-case/fetch-all-people";
import FetchPersonById from "../use-case/fetch-person-by-id";
import PersonRepositoryPostgres from "../repository/postgres/person-postgres-repository";

type PersonDataType = { id: string; name: string; birthdate: Date };

class PersonController {
  repository: PersonRepositoryPostgres;
  addUseCase: AddPersonUseCase;
  fetchAllUseCase: FetchAllPeople;
  getByIdUseCase: FetchPersonById;

  constructor() {
    this.repository = new PersonRepositoryPostgres();
    this.addUseCase = new AddPersonUseCase(this.repository);
    this.fetchAllUseCase = new FetchAllPeople(this.repository);
    this.getByIdUseCase = new FetchPersonById(this.repository);
  }

  public async create(
    name: string,
    birthdate: Date,
    id?: string
  ): Promise<PersonDataType> {
    const person = new Person(name, birthdate, id);
    const createdPerson = await this.addUseCase.execute(person);

    return {
      id: createdPerson.id,
      name: createdPerson.name,
      birthdate: new Date(createdPerson.birthdate),
    };
  }

  public async getById(id: string): Promise<Result<PersonDataType>> {
    const result = await this.getByIdUseCase.execute(id);

    if (result.isException(result.result)) {
      return new Result<PersonDataType>(result.result);
    } else {
      return new Result<PersonDataType>({
        id: result.result.id,
        name: result.result.name,
        birthdate: result.result.birthdate,
      });
    }
  }

  public async fetchAll(): Promise<PersonDataType[]> {
    return (await this.fetchAllUseCase.execute()).map((p) => ({
      id: p.id,
      name: p.name,
      birthdate: p.birthdate,
    }));
  }
}

export default PersonController;
export { PersonDataType };
