import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import DrawerNavigator from "./src/navigation/DrawerNavigator"; // Import the main navigator

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
