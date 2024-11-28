import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import axios from '../../axios';


const IncomeDialog = ({ open, handleClose, fetchIncomes,user }) => {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('/income', formData, 
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            });
        handleClose();
        fetchIncomes();
        setFormData({
          amount: '',
          category: '',
          description: '',
          date: new Date().toISOString().split('T')[0],
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Income</DialogTitle>
      <DialogContent>
        <TextField
          margin='dense'
          label='Amount'
          type='number'
          fullWidth
          value={formData.amount}
          onChange={(e) =>
            setFormData({ ...formData, amount: parseFloat(e.target.value) })
          }
        />
        <TextField
          margin='dense'
          label='Description'
          fullWidth
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <TextField
          margin='dense'
          type='date'
          fullWidth
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant='contained'>
          Add Income
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IncomeDialog;
