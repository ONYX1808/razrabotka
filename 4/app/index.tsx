import { Text, View, Image } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <Image
        source={require('../assets/images/image.jpg')}
        style={{ width: 200, height: 200, borderRadius: 180, marginBottom: 8 }}
      />
      <Text style={{ fontSize: 24 }}>Batyrkhan Shambaev</Text>
      <Text style={{ fontSize: 20, marginBottom: 64, }}>CS-202(c)</Text>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
        <MaterialIcons name="phone" size={20} style={{ marginRight: 8 }} />
        <Text>+7 (777) 777 7777</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
        <MaterialIcons name="alternate-email" size={20} style={{ marginRight: 8 }} />
        <Text>@batyrkhan_shambaev</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 64 }}>
        <MaterialIcons name="email" size={20} style={{ marginRight: 8 }} />
        <Text>shambaev18@mail.ru</Text>
      </View>
      <Text style={{ width: 250, textAlign: "center" }}>Работа не волк. Никто не волк. Только волк — волк.</Text>
      <Text style={{ textAlign: "center" }}>©Джейсон Стетхем</Text>
    </View>
  );
}
