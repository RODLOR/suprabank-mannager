import { Router } from "express";
import loansControllers from "../controllers/loansControllers.controllers.js"

const router = Router()

router.get("/loans", loansControllers.loans);
router.post("/loans", loansControllers.addLoan);

export default router;