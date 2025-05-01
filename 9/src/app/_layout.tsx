import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { databaseName } from "../data/database/database";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName={databaseName} >
      <Stack initialRouteName="screens/companies_list">
        <Stack.Screen name='index' redirect />
        <Stack.Screen name='screens/companies_list' options={{ title: 'Companies List' }} />
        <Stack.Screen name='screens/add_company' options={{ title: 'Add Company' }} />
        <Stack.Screen name='screens/details' options={{ title: 'Details' }} />
        <Stack.Screen name='screens/edit_company' options={{ title: 'Edit Company' }} />
      </Stack>
    </SQLiteProvider>
  );
}
