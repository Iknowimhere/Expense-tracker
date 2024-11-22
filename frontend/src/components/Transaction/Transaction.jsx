import AddIcon from "@mui/icons-material/Add";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DescriptionIcon from "@mui/icons-material/Description";
import React, { useContext, useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import TransactionDialog from "./TransactionDialog";
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
  Divider,
  ListItemIcon,
  Stack
} from "@mui/material";

const Transaction = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user, setUser} = useContext(UserContext);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/transaction", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setTransactions(response.data);
    } catch (error) {
      console.log("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 3 }}>
      <TransactionDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        fetchTransactions={fetchTransactions}
        user={user}
      />
      <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: '#f5f5f5' }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <AttachMoneyIcon sx={{ fontSize: 35, color: 'primary.main' }} />
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
              Recent Transactions
            </Typography>
          </Stack>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            color="primary"
            onClick={handleOpenDialog}
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              px: 3
            }}
          >
            Add Transaction
          </Button>
        </Box>

        <Paper elevation={2}>
          {loading ? (
            <Box fullwidth padding={2}>
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} animation="wave" height={60} sx={{ my: 1 }} />
              ))}
            </Box>
          ) : (
            <List>
              {transactions?.map((transaction, index) => (
                <React.Fragment key={transaction._id}>
                  <ListItem sx={{ py: 2 }}>
                    <ListItemIcon>
                      {transaction.type === "Expense" ? (
                        <ArrowDownwardIcon color="error" />
                      ) : (
                        <ArrowUpwardIcon color="success" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Stack direction="row" spacing={1} alignItems="center">
                          <DescriptionIcon sx={{ fontSize: 'small', color: 'text.secondary' }} />
                          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                            {transaction.description}
                          </Typography>
                        </Stack>
                      }
                      secondary={
                        <Stack direction="row" spacing={1} alignItems="center">
                          <CalendarTodayIcon sx={{ fontSize: 'small', color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {new Date(transaction.date).toLocaleDateString()}
                          </Typography>
                        </Stack>
                      }
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 'bold',
                        color: transaction.type === "Expense" ? 'error.main' : 'success.main'
                      }}
                    >
                      {transaction.type === "Expense" ? "- " : "+ "} ₹{transaction.amount}
                    </Typography>
                  </ListItem>
                  {index < transactions.length - 1 && <Divider />}
                </React.Fragment>
              ))}
              {transactions.length === 0 && (
                <ListItem sx={{ py: 4 }}>
                  <ListItemText
                    primary={
                      <Typography variant="h6" align="center" color="text.secondary">
                        No transactions found
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" align="center" color="text.secondary">
                        Click the 'Add Transaction' button to get started
                      </Typography>
                    }
                  />
                </ListItem>
              )}
            </List>
          )}
        </Paper>
      </Paper>
    </Box>
  );
};

export default Transaction;
