import { createContext, useContext, useEffect, useState } from 'react';

export let UserContext = createContext();

export let UserProvider = ({ children }) => {
  let [user, setUser] = useState(() => {
    let user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  });


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
