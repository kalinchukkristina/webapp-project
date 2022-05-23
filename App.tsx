import { Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import Welcome from './components/Welcome';
import Delays from './components/Delays';
import Map from './components/Map';

const Tab = createBottomTabNavigator();

const routeIcons = {
  "Hem": "home",
  "Förseningar": "train",
  "Karta": "map"
};

import { Base, Typography } from './styles';

export default function App() {
  return (
    <SafeAreaView style={Base.container}>
      <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = routeIcons[route.name] || "alert";

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'salmon',
            tabBarInactiveTintColor: 'gray',
            headerShown: false
            })}
            >
          <Tab.Screen name="Hem" component={Welcome} />
          <Tab.Screen name="Förseningar" component={Delays} />
          <Tab.Screen name="Karta" component={Map} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}


