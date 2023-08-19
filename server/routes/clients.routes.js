import { Router } from "express";
import clientsControllers from "../controllers/clientsControllers.controllers.js"

const router = Router()

router.get("/clients", clientsControllers.clients);
router.post("/clients", clientsControllers.addClient);

export default router;