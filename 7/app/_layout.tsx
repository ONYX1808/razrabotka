import { Stack, Navigator } from 'expo-router';
import { PlacesProvider } from '../context/PlacesContext';

export default function RootLayout() {
  return (
    <PlacesProvider>
      <Stack />
    </PlacesProvider>
  );
}
