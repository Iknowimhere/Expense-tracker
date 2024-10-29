import { Box } from '@mui/material';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
