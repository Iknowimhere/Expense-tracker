import NavBar from "../NavBar/NavBar";
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Dashboard = () => {
  let {user,setUser}=useContext(UserContext)
  
  return<div>
  <NavBar user={user} setUser={setUser}/>
  </div>
}

export default Dashboard;
