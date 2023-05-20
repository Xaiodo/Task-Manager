import { createStackNavigator } from "@react-navigation/stack";

import CreateGroup from "../../screens/Home/AddGroup/CreateGroup";
import FindGroup from "../../screens/Home/AddGroup/FindGroup";
import GroupDetails from "../../screens/Home/GroupDetails/GroupDetails";
import AddTask from "../../screens/Home/GroupDetails/Task/AddTask";
import GroupList from "../../screens/Home/ListGroups/GroupList";

const Stack = createStackNavigator();

const AppStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={GroupList} name="GroupList" />
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
      <Stack.Screen
        component={GroupDetails}
        name="GroupDetails"
        options={({ route }) => ({
          title: route.params.groupName,
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen
        component={AddTask}
        name="AddTask"
        options={{
          title: "Adding the task",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStackNavigation;
