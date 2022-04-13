import Result from "../lib/result";
import Person from "../entity/person";

interface PersonRepository {
  save(person: Person): Promise<Person>;
  getAll(): Promise<Person[]>;
  getById(id: string): Promise<Result<Person>>;
}

export default PersonRepository;
