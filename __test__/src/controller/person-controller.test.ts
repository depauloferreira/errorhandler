import * as crypto from "crypto";

import PersonController, {
  PersonDataType,
} from "../../../src/controller/person-controller";

const dataForTesting: PersonDataType = {
  name: "John Sknow",
  birthdate: new Date(Date.now() - 1000),
  id: crypto.randomUUID(),
};

describe("PersonController", () => {
  it("should create an instance of PersonController", () => {
    const controller = new PersonController();
    expect(controller).toBeInstanceOf(PersonController);
  });

  it("should create new person ", async () => {
    const controller = new PersonController();

    const person = await controller.create(
      dataForTesting.name,
      dataForTesting.birthdate,
      dataForTesting.id
    );

    expect(person).toMatchObject<PersonDataType>(dataForTesting);
  });

  it("should get a list of people ", async () => {
    const controller = new PersonController();

    const people = await controller.fetchAll();
    expect(people.length).toBeGreaterThan(0);

    for (let person of people) {
      expect(person.id).toBeTruthy();
      expect(person.name).toBeTruthy();
      expect(person.birthdate).toBeTruthy();
    }
  });

  it("should get a person by its id ", async () => {
    const controller = new PersonController();

    const people = await controller.fetchAll();
    expect(people.length).toBeGreaterThan(0);

    const person = await controller.getById(people[0].id);

    expect(person.isSuccess(person.result)).toBe(true);

    if (person.isSuccess(person.result)) {
      expect(person.result.id).toBeTruthy();
      expect(person.result.name).toBeTruthy();
      expect(person.result).toBeTruthy();
    }
  });
});
