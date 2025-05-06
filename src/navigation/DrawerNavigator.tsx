import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import BottomTabNavigator from "./BottomTabNavigator";

// You can import other screens here if you want them ONLY in the drawer
// import HelpScreen from '../screens/HelpScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerLeft: () => null, // Remove the App navigation drawer for now
        swipeEnabled: false, // Disable swipe to open the drawer
      }}
    >
      {/* The Bottom Tabs are nested inside the Drawer */}
      <Drawer.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{ title: "Finance Tracker" }} // Title is set here, drawerLabel is handled by CustomDrawerContent
      />
      {/* Add other screens specific to the Drawer here if needed */}
      {/* <Drawer.Screen name="Help" component={HelpScreen} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;