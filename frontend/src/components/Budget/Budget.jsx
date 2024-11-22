import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BudgetDialog from "./BudgetDialog";
import DateRangeIcon from "@mui/icons-material/DateRange";
import React, { useContext, useEffect, useState } from "react";
import SavingsIcon from "@mui/icons-material/Savings";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import axios from "../../axios";
import { Box, Button, Container, Grid2 as Grid, LinearProgress, Paper, Stack, Typography } from "@mui/material";
import { UserContext } from "../../context/UserContext";

const Budget = () => {
  const [budgets, setBudgets] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  let { user, setUser } = useContext(UserContext);

  const fetchBudgets = async () => {
    try {
      const response = await axios.get("/budget", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setBudgets(response.data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const getProgressColor = (spent, total) => {
    const percentage = (spent / total) * 100;
    if (percentage < 50) return 'success';
    if (percentage < 75) return 'warning';
    return 'error';
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4,backgroundColor: '#f5f5f5',padding: '20px',borderRadius: '10px',boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
          <AccountBalanceWalletIcon sx={{ mr: 1, verticalAlign: 'bottom', fontSize: 35 }} />
          Budgets
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => setOpenDialog(true)}
          startIcon={<AddCircleOutlineIcon />}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 3,
          }}
        >
          Add Budget
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {budgets.map((budget) => {
          const progress = (budget.currentSpent / budget.amount) * 100;
          return (
            <Grid item xs={12} sm={6} md={4} key={budget._id}>
              <Paper 
                elevation={3}
                sx={{ 
                  p: 2,
                  borderRadius: 2,
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  }
                }}
              >
                <Stack spacing={1.5}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#34495e' }}>
                    {budget.category}
                  </Typography>
                  
                  <Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={Math.min(progress, 100)}
                      color={getProgressColor(budget.currentSpent, budget.amount)}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>

                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <DateRangeIcon sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {new Date(budget.startDate).toLocaleDateString()} -{" "}
                        {new Date(budget.endDate).toLocaleDateString()}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <TrendingUpIcon sx={{ fontSize: '1rem' }} />
                          Spent
                        </Typography>
                        <Typography variant="body1">₹{budget.currentSpent}</Typography>
                      </Box>

                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <SavingsIcon sx={{ fontSize: '1rem' }} />
                          Left
                        </Typography>
                        <Typography variant="body1">₹{budget.amount - budget.currentSpent}</Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      <BudgetDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        fetchBudgets={fetchBudgets}
        user={user}
      />
    </Container>
  );
};

export default Budget;
