import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        redirect
        name="index"
      />
      <Tabs.Screen
        name="tabs/characters"
        options={{
          title: 'Characters',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person-sharp' : 'person-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="tabs/locations"
        options={{
          title: 'Locations',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'map-sharp' : 'map-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="tabs/episodes"
        options={{
          title: 'Episodes',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'film-sharp' : 'film-outline'} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
