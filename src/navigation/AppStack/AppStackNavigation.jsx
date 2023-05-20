import { createStackNavigator } from "@react-navigation/stack";

import AddGroup from "../../screens/Home/AddGroup/AddModalGroup";
import CreateGroup from "../../screens/Home/AddGroup/CreateGroup";
import FindGroup from "../../screens/Home/AddGroup/FindGroup";
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
        }}
      />
      <Stack.Screen
        component={FindGroup}
        name="FindGroup"
        options={{
          title: "Find your group",
        }}
      />
      <Stack.Screen
        component={CreateGroup}
        name="CreateGroup"
        options={{
          title: "Create your group",
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStackNavigation;
