import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerNavigationProp
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";

// Define ParamList for type safety (adjust screen names if different)
type RootDrawerParamList = {
  AppTabs: { screen?: string }; // Allow specifying initial screen for tabs
  // Add other top-level drawer screens here if any
};

type CustomDrawerNavigationProp = DrawerNavigationProp<RootDrawerParamList>;

function CustomDrawerContent(props: any) {
  const navigation = useNavigation<CustomDrawerNavigationProp>();

  // Function to navigate to a specific tab within the BottomTabNavigator
  const navigateToTab = (screenName: string) => {
    navigation.navigate("AppTabs", { screen: screenName });
  };

  return (
    <DrawerContentScrollView {...props}>
      {/* You can add a header image or profile info here */}
      <DrawerItem label="Home" onPress={() => navigateToTab("Home")} />
      <DrawerItem label="Income Profile" onPress={() => {}} />
      <DrawerItem label="Transaction History" onPress={() => {}} />
      <DrawerItem label="Logout" onPress={() => {}} />
      {/* You can add more items like Logout, Help etc. here */}
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;