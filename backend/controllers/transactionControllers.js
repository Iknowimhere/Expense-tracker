import Transaction from "../models/Transaction.js";

const getTransactions=async (req,res,next)=>{
    try {
        const transactions=await Transaction.find({user:req.user}).sort({date:-1}).populate("user")
        res.status(200).json(transactions)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const postTransaction=async (req,res,next)=>{
    let {amount,category,type}=req.body
    try {
        let newTransaction=new Transaction({
            user:req.user,
            amount,
            category,
            type
        })
        await newTransaction.save()
        res.status(201).json(newTransaction)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const updateTransaction=async (req,res,next)=>{
    let {id}=req.params;
    let {amount,type,category}=req.body;
    try {
        const existingTransaction=await Transaction.findById(id)
        if(!existingTransaction){
            return res.status(400).json("Transaction not found")
        }
        //checking for the owner of the transaction
        if(existingTransaction.user!==req.user){
            return res.status(400).json("This transaction doesn't exist for you!")
        }
        const updatedTransaction=await Transaction.findByIdAndUpdate(id,{amount,type,category},{new:true})
        res.status(200).json(updatedTransaction)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const deleteTransaction=async (req,res,next)=>{
    let {id}=req.params;
    try {
        const existingTransaction=await Transaction.findById(id)
        if(!existingTransaction){
            return res.status(400).json("Transaction not found")
        }
        //checking for the owner of the transaction
        if(existingTransaction.user!==req.user){
            return res.status(400).json("This transaction doesnt exist for you!")
        }
        await Transaction.findByIdAndDelete(id)
        res.status(200).json("Deleted transaction successfully")
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export {
    getTransactions,updateTransaction,postTransaction,deleteTransaction
}