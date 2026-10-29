import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../../server/routers.ts";
import { createContext } from "../../server/_core/context.ts";

const app = express();
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ limit: "2mb", extended: true }));
app.use(createExpressMiddleware({ router: appRouter, createContext }));

export default function handler(req: any, res: any) {
  return app(req, res);
}
