import { usePlaces } from "@/context/PlacesContext";
import { Stack, useLocalSearchParams } from "expo-router";
import { View, Image, Text, ScrollView } from "react-native";

export default function IddScreen() {
    const { id } = useLocalSearchParams();
    const { state } = usePlaces();

    const place = state.places.find((e) => e.id.toString() === id);

    if (!place) {
        return (
            <View>
                <Text>Place not found.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
            <Stack.Screen
                options={{
                    title: place.name,
                }}
            />
            <Image
                source={place.imageUrl}
                style={{
                    width: "100%",
                    height: 200,
                    borderRadius: 8,
                    marginBottom: 16,
                }}
            />
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>
                {place.name}
            </Text>
            <Text style={{ fontSize: 18, color: "gray", marginBottom: 8 }}>
                {place.category}
            </Text>
            <Text style={{ fontSize: 18, marginBottom: 8 }}>
                ⭐ {place.rating}
            </Text>
            <Text style={{ fontSize: 16 }}>
                {place.description}
            </Text>
        </ScrollView>
    );
}
