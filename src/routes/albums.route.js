import { Router } from "express";
import { getalbumById, getAllAlbums } from "../controller/albums.controller.js";

const router = Router();

router.get("/", getAllAlbums);
router.get("/:id", getalbumById);

export default router;
