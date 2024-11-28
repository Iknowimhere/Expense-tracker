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
  let { amount, category, description } = req.body;
  let currentDate = new Date();
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
    // Find budget for this category
    const categoryBudget = await Budget.findOne({
      user: req.user,
      category,
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
    });

    if (!categoryBudget) {
      return res
        .status(400)
        .json({ message: 'No budget set for this category' });
    }

    // Get existing transactions for this category in current period
    const categoryTransactions = await Transaction.find({
      user: req.user,
      category,
      date: { $gte: startDate, $lte: endDate },
    });

    const categoryTotal = categoryTransactions.reduce(
      (sum, trans) => sum + trans.amount,
      0
    );

    // Check if new transaction would exceed category budget
    if (categoryTotal + amount > categoryBudget.amount) {
      return res
        .status(400)
        .json({ message: `Transaction exceeds budget for ${category}` });
    }

    let newTransaction = new Transaction({
      user: req.user,
      amount,
      category,
      description,
    });
    await newTransaction.save();

    // Update currentSpent in budget
    categoryBudget.currentSpent = categoryTotal + amount;
    await categoryBudget.save();

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
