import Income from "../models/Income";
import Transaction from "../models/Transaction";
import User from "../models/User";

const postIncome=async(req,res)=>{
    let {amount,category,description,date}=req.body
    let currentDate=new Date()
    let startDate=new Date(currentDate.getFullYear(),currentDate.getMonth(),1)    
    let endDate=new Date(currentDate.getFullYear(),currentDate.getMonth()+1,0)    
    try {
        let existingIncome=await Income.findOne({user:req.user,date:{$gte:startDate,$lte:endDate}})
        if(existingIncome){
            existingIncome.amount=existingIncome.amount+amount;
            await existingIncome.save()
            return res.status(200).json({message:"Income Updated"})
        }
            let newIncome=await Income.create({
                user:req.user,
                amount,
                category,
                description,
                date
            })
     res.status(201).json(newIncome)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}