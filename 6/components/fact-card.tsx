import Fact from "@/entities/fact";
import { Image, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";


export default function FactCard(props: { fact: Fact }) {
    const fact = props.fact;

    const styles = StyleSheet.create({
        card: { padding: 16, margin: 12 },
        day: { marginBottom: 4 },
        title: { fontSize: 18, fontWeight: 600, marginBottom: 8 },
        image: { width: 250, height: 250, borderRadius: 8, marginBottom: 12, alignSelf: "center" },
        description: {fontFamily: "RobotoCondensed"},
    })

    return (
        <Card mode="contained" style={styles.card}>
            <Text style={styles.day}>Day {fact.day}</Text>
            <Text style={styles.title}>{fact.title}</Text>
            <Image
                source={{ uri: fact.imageURL }}
                style={styles.image}
                resizeMode="cover"
            />
            <Text style={styles.description}>{fact.description}</Text>
        </Card>
    )
}
