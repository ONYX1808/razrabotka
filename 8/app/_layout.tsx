import { Stack } from 'expo-router/stack';

export default function RootLayout() {
  return (
    <Stack initialRouteName='(tabs)'>
      <Stack.Screen
        redirect
        name="index"
      />
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="details/character-details"
        options={{ title: 'Character Details', }}
      />
      <Stack.Screen
        name="details/episode-details"
        options={{ title: 'Episode Details', }}
      />
    </Stack>
  );
}