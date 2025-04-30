import StackAppbar from "@/components/stack-appbar";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import useTheme from "../theme/theme";

export default function RootLayout() {
  return (
    <PaperProvider theme={useTheme()}>
      <Stack
        screenOptions={{
          title: "30 Days of Corp facts",
          header: (props) => <StackAppbar {...props} />
        }}
      />
    </PaperProvider>
  );
}
