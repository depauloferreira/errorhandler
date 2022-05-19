import Result from "./src/lib/result";

class Person {
  constructor(public name: string) {}
}

const doIt = (): Result<Person> => {
  const chance = Math.floor((Math.random() % 2) * 100);
  const isError = chance % 2 === 1;

  if (isError) {
    return new Result<Person>(new Error(`The error is ${chance}`));
  }

  return new Result<Person>(new Person(`My name is: ${chance}`));
};

const results = Array(10)
  .fill({})
  .map((t) => doIt());

for (let r of results) {
  if (r.isException(r.result)) {
    console.log(`Exception ${r.result.message}`);
  } else {
    console.log(`Person name: ${r.result.name}`);
  }
}
