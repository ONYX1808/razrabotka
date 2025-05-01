import { View, Text } from "react-native";

export default function CategoryCard(props: { title: string, onPress?: () => {} }) {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 2,
                borderColor: 'rgba(0,0,0,0.5)',
                borderRadius: 8,
                padding: 16,
                marginHorizontal: 16,
                marginVertical: 4
            }}
        >
            <Text>{props.title}</Text>
        </View>
    );

}