import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: [true, 'amount field is required'],
    },
    description: {
      type: String,
      required: [true, 'description field is required'],
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    category: {
      type: String,
      enum: [
        'Housing',
        'Utilities',
        'Groceries',
        'Transportation',
        'Health',
        'Entertainment',
        'Miscellaneous',
      ],
    },
  },
  {
    timestamps: true,
  }
);


let Transaction=mongoose.model("Transaction",transactionSchema)


export default Transaction;