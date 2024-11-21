import AddIcon from "@mui/icons-material/Add";
import React, { useContext, useEffect, useState } from "react";
import axios from "../../axios";
import { UserContext } from "../../context/UserContext";

import { 
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider
} from "@mui/material";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user,setUser}=useContext(UserContext)

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/transaction", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(response);
      
      setTransactions(response.data);
    } catch (error) {
      console.log("Error fetching transactions:", error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" component="h2">
          Recent Transactions
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          color="primary"
        >
          Add Transaction
        </Button>
      </Box>

      <Paper elevation={3}>
        <List>
          {transactions?.map((transaction,index) => (
            <React.Fragment key={transaction._id}>
              <ListItem>
                <ListItemText
                  primary={transaction.description}
                  secondary={new Date(transaction.date).toLocaleDateString()}
                />
                <Typography
                  variant="body1"
                  color={transaction.type === "Expense" ? "error" : "success"}
                >
                  {transaction.type === "Expense" ? "- " : "+ "} ₹{transaction.amount}
                </Typography>
              </ListItem>
              {index < transactions.length - 1 && <Divider />}
            </React.Fragment>
          ))}
          {transactions.length === 0 && (
            <ListItem>
              <ListItemText
                primary="No transactions found"
                secondary="Add a new transaction to get started"
              />
            </ListItem>
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default Transaction;
