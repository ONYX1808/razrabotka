import FactCard from "@/components/fact-card";
import { facts } from "@/data/facts";
import Fact from "@/entities/fact";
import { View, FlatList } from "react-native";
import useTheme from "../theme/theme";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: useTheme().colors.background
      }}
    >
      <FlatList
        data={facts}
        renderItem={({ item }: { item: Fact }) => <FactCard fact={item} />}
      />
    </View>
  );
}
