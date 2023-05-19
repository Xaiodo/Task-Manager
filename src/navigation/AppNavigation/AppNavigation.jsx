import { NavigationContainer } from "@react-navigation/native";

import AppStack from "../AppStack/AppStackNavigation";
import AuthStack from "../AuthStack/AuthStack";

const AppNavigation = () => {
  return (
    <NavigationContainer>
      {1 === 1 ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigation;
