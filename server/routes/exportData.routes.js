import { Router } from "express";
import exportDataController from "../controllers/exportData.controllers.js"

const router = Router()

router.get("/export", exportDataController.export);

export default router;