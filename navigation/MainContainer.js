import { StyleSheet, Text, View } from 'react-native'
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Settinges from "./screens/Settinges";

//Screen names
const homePage = "Home";
const postsPage = "Posts";
const profile = "Profile";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();

const MainContainer = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homePage}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homePage) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === profile) {
              iconName = focused ? 'list' : 'list-outline';

            } else if (rn === settingsName) {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'grey',
          tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
          tabBarStyle: { padding: 10, height: 70 }
        })}>

        <Tab.Screen name={homePage} component={Home} />
        <Tab.Screen name={profile} component={Profile} />
        <Tab.Screen name={settingsName} component={Settinges} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;

const styles = StyleSheet.create({});
