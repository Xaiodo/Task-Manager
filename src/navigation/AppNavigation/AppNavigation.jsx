import React, { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";

import jwtService from "../../services/jwt";
import AppStack from "../AppStack/AppStackNavigation";
import AuthStack from "../AuthStack/AuthStack";

export const AuthContext = React.createContext();

const AppNavigation = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    jwtService
      .isLogged()
      .then((res) => {
        setIsLogged(res);
      })
      .catch(() => {});
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged }}>
      <NavigationContainer>
        {isLogged ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default AppNavigation;
