import { Router } from "express";
import GoModel from "../database/go/model";
const router = Router();

router.get("/", (req, res) => {
  GoModel.findAll()
    .then((gos) => {
      if (!gos.length) return res.status(404).send({ err: "Go not found" });
      res.send(`find successfully: ${gos}`);
    })
    .catch((err) => res.status(500).send(err));
});

router.get("/:userid", (req, res) => {
  const { userid } = req.params;

  GoModel.findByUserId(userid)
    .then((go) => {
      if (go === null) return res.status(404).send({ err: "Go not found" });
      else res.send(`find successfully: ${go}`);
    })
    .catch((err) => res.status(500).send(err));
});

router.post("/", (req, res) => {
  GoModel.create(req.body)
    .then((todo) => res.send(todo))
    .catch((err) => res.status(500).send(err));
});

export default router;
