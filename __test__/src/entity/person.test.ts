import * as crypto from "crypto";
import Person from "../../../src/entity/person";

const dataForTesting = {
  id: crypto.randomUUID(),
  name: "John Sknow",
  birthdate: new Date(Date.now() - 1000),
};

describe("Person", () => {
  it("Should create a person.", () => {
    const person = new Person(
      dataForTesting.name,
      dataForTesting.birthdate,
      dataForTesting.id
    );

    expect(person).toBeInstanceOf(Person);
    expect(person.id).toStrictEqual(dataForTesting.id);
    expect(person.name).toStrictEqual(dataForTesting.name);
    expect(person.birthDate).toStrictEqual(dataForTesting.birthdate);
  });

  it("Should catch an empty.", () => {
    expect(() => {
      new Person("", dataForTesting.birthdate);
    }).toThrow();
  });

  it("Should catch an empty last name.", () => {
    expect(() => {
      new Person("Mary", dataForTesting.birthdate);
    }).toThrow();
  });

  it("Should catch an empty birthdate.", () => {
    expect(() => {
      new Person(dataForTesting.name, null as unknown as Date);
    }).toThrow();
  });

  it("Should catch a birthdate in the future.", () => {
    expect(() => {
      new Person(dataForTesting.name, new Date(Date.now() + 10000));
    }).toThrow();
  });
});
