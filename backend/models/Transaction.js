import mongoose from "mongoose";

const transactionSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    amount:{
        type:Number,
        required:[true,"amount field is required"]
    },
    type:{
        type:String,
        enum:["Income","Expense"]
    },
    description:{
        type:String,
        required:[true,"description field is required"]
    },
    date:{
        type:Date,
        default:Date.now()
    },
    category:{
        type:String,
        enum:[
            'Salary',
            'Freelance',
            'Other Income',
            'Groceries',
            'Housing',
            'Utilities',
            'Transportation',
            'Entertainment',
            'Health',
            'Miscellaneous'
          ]
        //   'Housing',
            // 'Utilities',
            // 'Groceries',
            // 'Transportation',
            // 'Health',
            // 'Entertainment',
            // 'Debt Repayment',
            // 'Miscellaneous'
    }
},{
    timestamps:true
})


let Transaction=mongoose.model("Transaction",transactionSchema)


export default Transaction;