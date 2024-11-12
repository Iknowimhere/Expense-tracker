import { Router } from "express";
import { deleteTransaction, getTransactions, postTransaction, updateTransaction } from "../controllers/transactionControllers";
import { auth } from "../middlewares/auth";

let router=Router();

router.get("/",auth,getTransactions)
router.post("/",auth,postTransaction)
router.put("/:id",auth,updateTransaction)
router.delete("/:id",auth,deleteTransaction)


export default router;