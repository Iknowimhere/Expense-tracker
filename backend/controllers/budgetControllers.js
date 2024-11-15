import Budget from "../models/Budget.js";

const getBudget = async (req, res) => {
  try {
    const budget = await Budget.find({ user: req.user });
    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const postBudget = async (req, res) => {
    const { amount, category,endDate } = req.body;
  try {
    const budget = await Budget.create({
      user: req.user,
      amount,
      category,
      endDate
    });
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBudget = async (req, res) => {
  const { id } = req.params;
  const { amount, category, endDate,startDate,currentSpent } = req.body;
  
  try {
    const budget = await Budget.findById(id);
    if(budget===null){
        return res.status(404).json({ message: "Budget not found" });
    }
    if(budget.user.toString()!==req.user.toString()){
        return res.status(401).json({ message: "Unauthorized" });
    }
    if(req.body.amount){
        budget.amount=amount;
    }
    if(req.body.category){
        budget.category=category;
    }
    if(req.body.endDate){
        budget.endDate=endDate;
    }
    if(req.body.startDate){
        budget.startDate=startDate;
    }
    if(req.body.currentSpent){
        budget.currentSpent=currentSpent;
    }
    await budget.save();
    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBudget = async (req, res) => {
  const { id } = req.params;
  try {
    const budget = await Budget.findByIdAndDelete(id);
    if(budget===null){
        return res.status(404).json({ message: "Budget not found" });
    }
    res.status(200).json("Buget deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getBudget, postBudget, updateBudget, deleteBudget };