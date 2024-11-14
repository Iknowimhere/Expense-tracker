import mongoose from "mongoose";

const budgetSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    amount:{
        type:Number,
        default:0
    },
    startDate:{
        type:Date,
        default:Date.now()
    },
    endDate:{
        type:Date,
        required:[true,"Please mention the end date for budget"]
    },
    category:{
        type:String,
        enum:[
            'Housing',
            'Utilities',
            'Groceries',
            'Transportation',
            'Health',
            'Entertainment',
            'Clothing',
            'Savings',
            'Debt Repayment',
            'Miscellaneous'
          ]
    },
    currentSpent:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})


let Budget=mongoose.model("Budget",budgetSchema)


export default Budget;