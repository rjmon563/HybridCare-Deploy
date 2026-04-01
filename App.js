import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { HybridCareProvider } from './src/context/HybridCareContext';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const DashboardNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: true, tabBarActiveTintColor: '#007AFF', tabBarInactiveTintColor: '#8E8E93', }} >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Dashboard', tabBarIcon: ({ color }) => <Text style={{ color }}>📊</Text>, }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile', tabBarIcon: ({ color }) => <Text style={{ color }}>👤</Text>, }} />
    </Tab.Navigator>
  );
};
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <HybridCareProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, }} >
          {!isLoggedIn ? (
            <Stack.Screen name="LoginStack" options={{ animationEnabled: false }} >
              {(props) => (
                <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />
              )}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="DashboardStack" component={DashboardNavigator} options={{ animationEnabled: false }} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </HybridCareProvider>
  );
};
export default App;