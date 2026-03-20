import { app, initServer } from "../server/index";

export default async (req: any, res: any) => {
  await initServer();
  return app(req, res);
};
