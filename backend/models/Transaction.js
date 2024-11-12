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
    date:{
        type:Date,
        default:Date.now()
    },
    category:{
        type:String,
        enum:[
            'Salary',
            'Freelance',
            'Gifts',
            'Other Income',
            'Groceries',
            'Rent',
            'Utilities',
            'Transportation',
            'Entertainment',
            'Healthcare',
            'Personal Care',
            'Miscellaneous'
          ]
    }
},{
    timestamps:true
})


let Transaction=mongoose.model("Transaction",transactionSchema)


export default Transaction;