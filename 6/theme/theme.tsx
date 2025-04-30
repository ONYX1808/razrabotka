import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { useColorScheme } from "react-native";
import { MD3LightTheme as LightTheme, MD3DarkTheme as DarkTheme } from "react-native-paper";

export default function useTheme() {
    const colorScheme = useColorScheme();
    const { theme } = useMaterial3Theme({fallbackSourceColor: "#FFFF00",  sourceColor: "#FFFF00" });

    const lightPaperTheme = {
        ...LightTheme,
        colors: theme.light
    };
    const darkPaperTheme = {
        ...DarkTheme,
        colors: theme.dark
    };
    const paperTheme = colorScheme === 'light'
        ? lightPaperTheme
        : darkPaperTheme;

    return paperTheme;
}
