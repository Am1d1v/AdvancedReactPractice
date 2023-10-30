import React, { useEffect, useState } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {

    const storedLoggedInInfo = localStorage.getItem('isLoggedIn');

    // If User Logged In before, user dont have to log in again
    if(storedLoggedInInfo === 'true'){
      setIsLoggedIn(true);
    }

  }, [isLoggedIn]);

  const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedIn', 'true')
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
