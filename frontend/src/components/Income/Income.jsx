import { Box, Button, Grid2 as Grid, Paper, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import IncomeDialog from './IncomeDialog';
import AddIcon from '@mui/icons-material/Add';
import { UserContext } from '../../context/UserContext';
import axios from '../../axios';

const Income = () => {
  const [open, setOpen] = useState(false);
  const [monthlyIncomes, setMonthlyIncomes] = useState([]);
  let { user } = useContext(UserContext);

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    try {
      const response = await axios.get('/income/monthly', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setMonthlyIncomes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMonthName = (month) => {
    return new Date(2000, month - 1).toLocaleString('default', {
      month: 'long',
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant='h5'>Monthly Income</Typography>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add Income
        </Button>
      </Box>

      <Grid container spacing={3}>
        {monthlyIncomes.map((income) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={`${income?._id.year}-${income?._id.month}`}
          >
            <Paper
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 2,
                boxShadow: 3,
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 5,
                },
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                <Typography variant='h6' color='primary'>
                  {getMonthName(income?._id.month)} {income?._id.year}
                </Typography>
                <Typography
                  variant='h6'
                  sx={{ color: 'success.main', fontWeight: 'bold' }}
                >
                  ₹{income.total.toFixed(2)}
                </Typography>
              </Box>

              {income.descriptions.length > 0 && (
                <Box>
                  <Typography
                    variant='subtitle1'
                    sx={{ fontWeight: 'medium', mb: 1 }}
                  >
                    Descriptions:
                  </Typography>
                  <Box sx={{ maxHeight: '150px', overflowY: 'auto' }}>
                    {income.descriptions.map((desc, index) => (
                      <Typography
                        key={index}
                        variant='body2'
                        color='text.secondary'
                        sx={{ py: 0.5 }}
                      >
                        {desc}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>

      <IncomeDialog
        open={open}
        handleClose={() => setOpen(false)}
        fetchIncomes={fetchIncomes}
        user={user}
      />
    </Box>
  );
};

export default Income;
