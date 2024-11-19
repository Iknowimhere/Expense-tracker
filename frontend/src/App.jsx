import Budget from "./components/Budget/Budget";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Transaction from "./components/Transaction/Transaction";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='dashboard' element={<Dashboard />} >
          <Route path="transaction" element={<Transaction/>}/>
          <Route path="budget" element={<Budget/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
