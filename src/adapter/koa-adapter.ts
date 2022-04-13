import { Context } from "koa";
import { StatusCodes } from "http-status-codes";

import PersonController from "../controller/person-controller";
import HTTPErrorAdapter from "./http-error-adapter";

class KoaAdapter {
  static create() {
    const handler = async (ctx: Context) => {
      try {
        const { name, birthdate } = ctx.request.body;
        const controller = new PersonController();

        const person = await controller.create(name, new Date(birthdate));
        ctx.status = StatusCodes.OK;
        ctx.body = person;
      } catch (error: any) {
        ctx.status = StatusCodes.INTERNAL_SERVER_ERROR;
        ctx.body = error.toString();
      }
    };

    return handler;
  }

  static fetchById() {
    const executor = async (ctx: Context) => {
      const controller = new PersonController();
      const result = await controller.getById(ctx.params.id);

      if (result.isException(result.result)) {
        const [body, code] = HTTPErrorAdapter.getError(result.result);
        ctx.status = code;
        ctx.body = body;
      } else {
        ctx.status = StatusCodes.OK;
        ctx.body = result.result;
      }
    };

    return executor;
  }

  static fetchAll() {
    const executor = async (ctx: Context) => {
      try {
        const controller = new PersonController();
        const people = await controller.fetchAll();
        ctx.status = StatusCodes.OK;
        ctx.body = people;
      } catch (error: any) {
        ctx.status = StatusCodes.INTERNAL_SERVER_ERROR;
        ctx.body = error.message;
      }
    };

    return executor;
  }
}

export default KoaAdapter;
