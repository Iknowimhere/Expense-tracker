import { Router } from "express";
import { deleteBudget, getBudget, postBudget, updateBudget } from "../controllers/budgetControllers.js";
import { auth } from "../middlewares/auth.js";

let router=Router();


router.get("/",auth,getBudget)
router.post("/",auth,postBudget)
router.put("/:id",auth,updateBudget)
router.delete("/:id",auth,deleteBudget)

export default router;