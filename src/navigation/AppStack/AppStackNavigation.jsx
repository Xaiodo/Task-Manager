import { createStackNavigator } from "@react-navigation/stack";

import AddGroup from "../../screens/Home/AddGroup/AddModalGroup";
import GroupList from "../../screens/Home/Groups/GroupList";

const Stack = createStackNavigator();

const AppStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={GroupList} name="GroupList" />
      <Stack.Screen
        component={AddGroup}
        name="AddGroup"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStackNavigation;
