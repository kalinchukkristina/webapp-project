import { Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";

import Welcome from './components/Welcome';
import Delays from './components/Delays';
import Map from './components/Map';
import SavedStations from './components/SavedStations';
import Auth from './components/auth/Auth';
import authModel from './models/auth';

const Tab = createBottomTabNavigator();

const routeIcons = {
  "Hem": "home",
  "Förseningar": "train",
  "Karta": "map",
  "Logga in": "ios-person",
  "Favoritstationer": "save"
};

import { Base, Typography } from './styles';

export default function App() {
  const [ isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    async() => {
      setIsLoggedIn(await authModel.loggedIn());
  }
  }, []);

  return (
    <SafeAreaView style={Base.container}>
      <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = routeIcons[route.name] || "alert";

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'green',
            tabBarInactiveTintColor: 'gray',
            headerShown: false
            })}
            >
          <Tab.Screen name="Hem" component={Welcome} />
          <Tab.Screen name="Förseningar" component={Delays} />
          <Tab.Screen name="Karta" component={Map} />
          {isLoggedIn ?
            <Tab.Screen name="Favoritstationer">
              {() => <SavedStations setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen> :
            <Tab.Screen name="Logga in">
              {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
          }
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}


