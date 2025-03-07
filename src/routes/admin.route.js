import { Router } from "express";

const router = Router();

// can be router.get or .post  or .put or .patch
router.get("/", (req, res) => {
  res.send("Hello from admin route");
});

export default router;
