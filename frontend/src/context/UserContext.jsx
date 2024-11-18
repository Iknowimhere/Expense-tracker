import { createContext, useContext, useEffect, useState } from "react";

export let UserContext = createContext();

export let UserProvider = ({ children }) => {
  let [user, setUser] = useState(null);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// let UserState = () => {
//   return useContext(UserContext);
// };
// export default UserState;
