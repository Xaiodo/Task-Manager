import { createStackNavigator } from "@react-navigation/stack";

import Login from "../../screens/Auth/Login";
import Register from "../../screens/Auth/Register";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Login}
        name="Login"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={Register}
        name="Register"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
