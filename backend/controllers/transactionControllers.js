import Budget from "../models/Budget.js";
import Transaction from "../models/Transaction.js";

const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ user: req.user })
      .sort({ date: -1 })
      .populate("user");
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postTransaction = async (req, res, next) => {
  let { amount, category, type, description } = req.body;
  let currentDate = new Date();
  //calculate start date and end date of the month
  let startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  let endDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  try {
    //finding budget of the user
    let budget = await Budget.findOne({
      user: req.user,
      startDate,
      endDate,
    });

    //check if amount is greater than budget for the type of transaction if it is expense
    if (type === "expense") {
      if (amount > budget?.amount) {
        return res.status(400).json("Amount is greater than budget");
      }
    }
    //if amount is less then the budget then update the budget by checking the category
    if (type === "expense" && category === budget?.category) {
      budget.amount -= amount;
    } 

    await budget?.save();

    let newTransaction = new Transaction({
      user: req.user,
      amount,
      category,
      description,
      type,
    });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTransaction = async (req, res, next) => {
  let { id } = req.params;
  let { amount, type, category } = req.body;
  try {
    const existingTransaction = await Transaction.findById(id);
    if (!existingTransaction) {
      return res.status(400).json("Transaction not found");
    }
    //checking for the owner of the transaction
    if (existingTransaction.user !== req.user) {
      return res.status(400).json("This transaction doesn't exist for you!");
    }
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { amount, type, category },
      { new: true }
    );
    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTransaction = async (req, res, next) => {
  let { id } = req.params;
  try {
    const existingTransaction = await Transaction.findById(id);
    if (!existingTransaction) {
      return res.status(400).json("Transaction not found");
    }
    //checking for the owner of the transaction
    if (existingTransaction.user !== req.user) {
      return res.status(400).json("This transaction doesnt exist for you!");
    }
    await Transaction.findByIdAndDelete(id);
    res.status(200).json("Deleted transaction successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export {
  getTransactions,
  updateTransaction,
  postTransaction,
  deleteTransaction,
};
