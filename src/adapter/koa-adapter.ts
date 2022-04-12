import { Context } from "koa";
import { StatusCodes } from "http-status-codes";

import PersonController from "../controller/person-controller";

class KoaAdapter {
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

  static fetchById() {
    const executor = async (ctx: Context) => {
      try {
        const controller = new PersonController();
        const people = await controller.getById(ctx.params.id);
        ctx.status = StatusCodes.OK;
        ctx.body = people;
      } catch (error: any) {
        ctx.status = StatusCodes.INTERNAL_SERVER_ERROR;
        ctx.body = error.message;
      }
    };

    return executor;
  }

  static create() {
    const executor = async (ctx: Context) => {
      try {
        const { name, birthdate } = ctx.request.body;
        const controller = new PersonController();

        const people = await controller.create(name, birthdate);
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
