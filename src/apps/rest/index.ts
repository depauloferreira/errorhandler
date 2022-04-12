import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-body";

import KoaAdapter from "../../adapter/koa-adapter";

const app = new Koa();
const router = new Router();

router.post("/person", KoaAdapter.create());
router.get("/person", KoaAdapter.fetchAll());
router.get("/person/:id", KoaAdapter.fetchById());

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
