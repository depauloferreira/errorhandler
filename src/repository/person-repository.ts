import Person from "../entity/person";

interface PersonRepository {
  save(person: Person): Promise<Person>;
  getAll(): Promise<Person[]>;
  getById(id: string): Promise<Person>;
}

export default PersonRepository;
