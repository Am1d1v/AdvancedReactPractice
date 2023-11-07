import React, { useState, useEffect } from "react";


const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

        const storedLoggedInInfo = localStorage.getItem('isLoggedIn');
    
        // If User Logged In before, user dont have to log in again
        if(storedLoggedInInfo === 'true'){
          setIsLoggedIn(true);
        }
    
      }, [isLoggedIn]);


    const logoutHandler = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
    }

    const loginHandler = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true')
    }

    return <AuthContext.Provider value={{isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler}}>
        {props.children}
    </AuthContext.Provider>
}


export default AuthContext;
