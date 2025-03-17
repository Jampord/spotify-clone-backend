import { Router } from "express";
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from "../controller/admin.controller.js"; // put .js in the end
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute, requireAdmin); //protects all routes and requires admin to routes below it

//-------------- can be router.get or .post  or .put or .patch

//checks if user is admin
// router.get("/check", protectRoute, requireAdmin, checkAdmin);
router.get("/check", checkAdmin);

//for songs
router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);

//for albums
router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);

export default router;
