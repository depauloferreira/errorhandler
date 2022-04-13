import { Client, Query, QueryResult } from "pg";

import Result from "../../lib/result";
import Person from "../../entity/person";
import PersonRepository from "../person-repository";
import DatabaseException from "../../error/database-exception";
import InfrastructureException from "../../error/infrastructure-exception";
import UserNotFoundException from "../../error/user/user-not-found-exception";
import Exception from "../../error/exception";

class PersonRepositoryPostgres implements PersonRepository {
  constructor() {}

  async save(person: Person): Promise<Person> {
    const res = await this.queryExecutor(
      "insert into public.person(id, name, birthdate) values($1, $2, $3) RETURNING *",
      [person.id, person.name, person.birthdate]
    );

    return new Person(res.rows[0].name, res.rows[0].birthdate, res.rows[0].id);
  }

  async getAll(): Promise<Person[]> {
    const res = await this.queryExecutor(
      "select p.id, p.name, p.birthdate from public.person p"
    );

    return res.rows.map((r) => new Person(r.name, r.birthdate, r.id));
  }

  async getById(id: string): Promise<Result<Person>> {
    try {
      const res = await this.queryExecutor(
        "select p.id, p.name, p.birthdate from public.person p where p.id=$1",
        [id]
      );

      if (res.rowCount < 1) {
        return new Result<Person>(new UserNotFoundException(id));
      }

      return new Result<Person>(
        new Person(res.rows[0].name, res.rows[0].birthdate, res.rows[0].id)
      );
    } catch (error: any) {
      const res = new Result<Person>(
        new InfrastructureException(error.message, error)
      );

      console.log(res.result);

      return res;
    }
  }

  private getCliente(): Client {
    try {
      return new Client();
    } catch (error: any) {
      throw new InfrastructureException(error.message, error);
    }
  }

  private async queryExecutor(
    query: string,
    params?: any[]
  ): Promise<QueryResult<any>> {
    const client = this.getCliente();

    try {
      await client.connect();
    } catch (error: any) {
      throw new InfrastructureException(error.message, error);
    }

    let result: QueryResult<any>;

    try {
      result = await client.query(query, params);
    } catch (error: any) {
      throw new DatabaseException(error.message, error);
    }

    await client.end();
    return result;
  }
}

export default PersonRepositoryPostgres;
