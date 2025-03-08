import { Router } from "express";
import { getAdmin } from "../controller/admin.controller.js"; // put .js in the end

const router = Router();

// can be router.get or .post  or .put or .patch
router.get("/", getAdmin);

export default router;
