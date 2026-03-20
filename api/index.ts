import { app, initServer } from "../server/index";

export default async (req: any, res: any) => {
  try {
    await initServer();
    return app(req, res);
  } catch (error) {
    console.error("Vercel Serverless Function Error:", error);
    res.status(500).json({ 
      message: "Internal Server Error during initialization",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};
