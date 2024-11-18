import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Dashboard = () => {
  let {user,setUser}=useContext(UserContext)
  return<div>Dashboard {user?.username}</div>
}

export default Dashboard;
