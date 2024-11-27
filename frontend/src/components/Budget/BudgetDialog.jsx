import React, { useState } from "react";
import axios from "../../axios";
import { useSnackbar } from "notistack";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";

const BudgetDialog = ({ open, handleClose, fetchBudgets, user }) => {
  const initialFormData = {
    amount: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    category: "",
  };

  const [formData, setFormData] = useState(initialFormData);
const {enqueueSnackbar}=useSnackbar();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response=await axios.post("/budget", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      handleClose();
      fetchBudgets();
      setFormData(initialFormData);
      if(response.status===201){
      enqueueSnackbar("Budget created successfully",{variant:"success"})
      }
    } catch (error) {
      if(error.response && error.response.status === 400){
        enqueueSnackbar(error.response.data.message,{variant:"error"})
    }else{
      enqueueSnackbar("An error occurred while creating the budget",{variant:"error"})
    }
  };
}

  const categories = [
    "Housing",
    "Utilities",
    "Groceries",
    "Transportation",
    "Health",
    "Entertainment",
    "Clothing",
    "Savings",
    "Debt Repayment",
    "Miscellaneous",
  ];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Budget</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            name="amount"
            label="Budget Amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            fullWidth
            required
          />

          <FormControl fullWidth required>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              label="Category"
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            name="startDate"
            label="Start Date"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            name="endDate"
            label="End Date"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            fullWidth
            required
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add Budget
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BudgetDialog;
