import Income from "../models/Income.js";

export const postIncome=async(req,res)=>{
    let {amount,description,date}=req.body
    let currentDate=new Date()
    let startDate=new Date(currentDate.getFullYear(),currentDate.getMonth(),1)    
    let endDate=new Date(currentDate.getFullYear(),currentDate.getMonth()+1,0)    
    try {
        let existingIncome=await Income.findOne({user:req.user,date:{$gte:startDate,$lte:endDate}})
        if(existingIncome){
            existingIncome.amount = existingIncome.amount + amount;
            await existingIncome.save()
            return res.status(200).json({message:"Income Updated"})
        }
            let newIncome=await Income.create({
                user:req.user,
                amount,
                description,
                date
            })
     res.status(201).json(newIncome)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


export const getMonthlyIncome = async (req, res) => {
    try {
        const monthlyIncome = await Income.aggregate([
            {
                $match: { 
                    user: req.user,
                }
            },
            {
                $project: {
                    amount: 1,
                    description: 1,
                    month: { $month: "$date" },
                    year: { $year: "$date" }
                }
            },
            {
                $group: {
                    _id: { month: "$month", year: "$year" },
                    total: { $sum: "$amount" },
                    descriptions: { $push: "$description" }
                }
            },
            {
                $sort: { "_id.year": -1, "_id.month": -1 }
            }
        ]);

        res.status(200).json(monthlyIncome);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
