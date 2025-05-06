import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type BottomTabParamList = {
  Home: undefined; // No parameters expected for this screen
  Transactions: undefined; // No parameters expected for this screen
  Settings: undefined;// No parameters expected for this screen
  Profile: undefined;// No parameters expected for this screen
};

// This is the specific navigation prop type for screens within the BottomTabNavigator
export type HomeBottomTabNavigationProp = BottomTabNavigationProp<BottomTabParamList, 'Home'>;