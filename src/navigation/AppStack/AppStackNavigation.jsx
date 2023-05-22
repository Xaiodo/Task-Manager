import { createContext, useState } from "react";

import { createStackNavigator } from "@react-navigation/stack";

import CreateGroup from "../../screens/Home/AddGroup/CreateGroup";
import FindGroup from "../../screens/Home/AddGroup/FindGroup";
import GroupDetails from "../../screens/Home/GroupDetails/GroupDetails";
import AddTask from "../../screens/Home/GroupDetails/Task/AddTask";
import EditTask from "../../screens/Home/GroupDetails/Task/EditTask";
import GroupList from "../../screens/Home/ListGroups/GroupList";

const Stack = createStackNavigator();

export const HomeContext = createContext();

const AppStackNavigation = () => {
  const [tasks, setTasks] = useState([]);
  const [groups, setGroups] = useState([]);

  return (
    <HomeContext.Provider
      value={{ tasks: { tasks, setTasks }, groups: { groups, setGroups } }}
    >
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#363a55",
            elevation: 0,
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          component={GroupList}
          name="GroupList"
          options={{
            title: "Your groups",
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
        <Stack.Screen
          component={EditTask}
          name="EditTask"
          options={{
            title: "Editing the task",
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </HomeContext.Provider>
  );
};

export default AppStackNavigation;
