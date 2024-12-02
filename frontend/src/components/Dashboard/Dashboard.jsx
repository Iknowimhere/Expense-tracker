import DashboardHome from "./DashBoardHome";
import NavBar from "../NavBar/NavBar";
import React, { useContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Dashboard = () => {
  let { user, setUser } = useContext(UserContext);
 
  const location = useLocation();
  


  useEffect(() => {
    if (user) {
      
    }
  }, [user]);

  
  return (
    <div>
      <NavBar user={user} setUser={setUser} />

      {location.pathname === '/dashboard' ? (
        <DashboardHome user={user} />
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Dashboard;
