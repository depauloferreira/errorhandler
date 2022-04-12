import * as crypto from "crypto";
import Person from "../../../src/entity/person";
import AddPersonUseCase from "../../../src/use-case/add-person";
import PersonRepositoryPostgres from "../../../src/repository/postgres/person-postgres-repository";

const dataForTesting = {
  name: "John Sknow",
  birthdate: new Date(Date.now() - 1000),
  id: crypto.randomUUID(),
};

describe("AddPersonUseCase", () => {
  it("Should create a person", async () => {
    const person = new Person(
      dataForTesting.name,
      dataForTesting.birthdate,
      dataForTesting.id
    );
    const repository = new PersonRepositoryPostgres();
    const useCase = new AddPersonUseCase(repository);
    const createdPerson = await useCase.execute(person);

    expect(createdPerson).toMatchObject<Person>(person);
  });
});
