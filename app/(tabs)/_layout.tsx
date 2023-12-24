import { Tabs } from 'expo-router';
import { View } from 'react-native';
import Index from '.';
import Colors from '../../constants/Colors';
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarLabelStyle: {
          fontFamily: 'mon-sb',
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name='search' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='wishlists'
        options={{
          tabBarLabel: 'Whishlists',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='heart-outline' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='trips'
        options={{
          tabBarLabel: 'trips',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name='airbnb' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='inbox'
        options={{
          tabBarLabel: 'Inbox',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='message-outline'
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='person-outline' color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default Layout;
