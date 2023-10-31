import React, { useEffect, useState } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./context/auth-context";

function App() {

  // Check is user logged in, default value is false
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // If user logged in key isLoggedIn now is true
  useEffect(() => {

    const storedLoggedInInfo = localStorage.getItem('isLoggedIn');

    // If User Logged In before, user dont have to log in again
    if(storedLoggedInInfo === 'true'){
      setIsLoggedIn(true);
    }

  }, [isLoggedIn]);

  // Log in, add data in localStorage
  const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedIn', 'true')
    setIsLoggedIn(true);
  };

  // Log out, remove data from localStorage
  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
      <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler
      }}>
        <MainHeader />
        <main>
          {!isLoggedIn && <Login onLogin={loginHandler} />}
          {isLoggedIn && <Home onLogout={logoutHandler} />}
        </main>
      </AuthContext.Provider>
  );
}

export default App;
