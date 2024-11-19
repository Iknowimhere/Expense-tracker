import NavBar from "../NavBar/NavBar";
import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Dashboard = () => {
  let {user,setUser}=useContext(UserContext)
  
  return<div>
  <NavBar user={user} setUser={setUser}/>

  <Outlet/>
  </div>
}

export default Dashboard;
