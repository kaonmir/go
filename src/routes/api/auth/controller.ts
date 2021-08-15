import express from "express";
/*
    POST /api/auth/register
    {
        username,
        password
    }
*/

export async function register(req: express.Request, res: express.Response) {
  res.send("routes/auth/controller register router is running!");
}
