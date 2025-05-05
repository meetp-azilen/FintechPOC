import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import BottomTabNavigator from "./BottomTabNavigator";
import CustomDrawerContent from "./CustomDrawerContent";

// You can import other screens here if you want them ONLY in the drawer
// import HelpScreen from '../screens/HelpScreen';

const Drawer = createDrawerNavigator();

// Define ParamList matching the one in CustomDrawerContent
type RootDrawerParamList = {
  AppTabs: { screen?: string };
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="AppTabs" drawerContent={(props) => <CustomDrawerContent {...props} />}>
      {/* The Bottom Tabs are nested inside the Drawer */}
      <Drawer.Screen
        name="AppTabs"
        component={BottomTabNavigator}
        options={{ title: "Finance Tracker" }} // Title is set here, drawerLabel is handled by CustomDrawerContent
      />
      {/* Add other screens specific to the Drawer here if needed */}
      {/* <Drawer.Screen name="Help" component={HelpScreen} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;