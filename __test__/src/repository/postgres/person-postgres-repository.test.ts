import * as crypto from "crypto";
import Person from "../../../../src/entity/person";
import PersonRepositoryPostgres from "../../../../src/repository/postgres/person-postgres-repository";

const dataForTesting = {
  name: "John Sknow",
  birthdate: new Date(Date.now() - 1000),
  id: crypto.randomUUID(),
};

describe("PersonRepositoryPostgres", () => {
  it("should create an instance of PersonRepositoryPostgres", () => {
    const repo = new PersonRepositoryPostgres();
    expect(repo).toBeInstanceOf(PersonRepositoryPostgres);
  });

  it("should save a new Person", async () => {
    const person = new Person(
      dataForTesting.name,
      dataForTesting.birthdate,
      dataForTesting.id
    );
    const repo = new PersonRepositoryPostgres();
    const saved = await repo.save(person);
    expect(saved).toMatchObject<Person>(person);
  });

  it("should get a list of people", async () => {
    const repo = new PersonRepositoryPostgres();
    const people = await repo.getAll();

    expect(people.length).toBeGreaterThan(0);

    for (const p of people) {
      expect(p).toBeInstanceOf(Person);
    }
  });

  it("should save a new Person", async () => {
    const repo = new PersonRepositoryPostgres();
    const people = await repo.getAll();

    expect(people.length).toBeGreaterThan(0);
    const person = await repo.getById(people[0].id);

    expect(person).toMatchObject<Person>(people[0]);
  });
});
