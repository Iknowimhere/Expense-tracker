import React, { useState } from "react";
import axios from "../../axios";

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
  Stack
} from '@mui/material';

const TransactionDialog = ({ open, handleClose, fetchTransactions, user }) => {
  const initialFormData = {
    amount: '',
    type: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/transaction', formData, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      handleClose();
      fetchTransactions();
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  const categories = {
    Income: ['Salary', 'Freelance', 'Gifts', 'Other Income'],
    Expense: ['Groceries', 'Rent', 'Utilities', 'Transportation', 'Entertainment', 'Healthcare', 'Personal Care', 'Miscellaneous']
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Transaction</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            name="amount"
            label="Amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            fullWidth
            required
          />

          <FormControl fullWidth required>
            <InputLabel>Type</InputLabel>
            <Select
              name="type"
              value={formData.type}
              onChange={handleChange}
              label="Type"
              helperText={!formData.type && 'Please select a type'}
            >
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expense">Expense</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              label="Category"
              disabled={!formData.type}
            >
              {formData.type && categories[formData.type].map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            name="date"
            label="Date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add Transaction
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionDialog;
