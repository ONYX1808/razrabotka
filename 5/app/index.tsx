import CompanyComponent from "@/components/company-component";
import { View } from "react-native";
import { PaperProvider, MD3LightTheme as DefaultTheme } from "react-native-paper";

export default function Index() {
  return (
    <PaperProvider theme={DefaultTheme}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CompanyComponent />
      </View>
    </PaperProvider>
  );
}
