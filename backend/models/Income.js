import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

let Income = mongoose.model('Income', incomeSchema);

export default Income;
