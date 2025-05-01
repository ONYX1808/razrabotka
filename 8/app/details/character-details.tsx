import React, { useState, useEffect } from 'react';
import { View, Text,  Image, ActivityIndicator, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Character } from '@/entities/entities';
import { fetchCharacters } from '../../api/api';

export default function CharacterDetailsScreen() {
    const [data, setData] = useState<Character[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { id } = useLocalSearchParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetchCharacters();
                setData(response);
            } catch (error) {
                setError('Failed to load characters');
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);


    if (loading) {
        return <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    const item = data.find((e) => e.id.toString() === id)

    if (item === undefined) {
        return <Text>Item undefined</Text>;
    }

    return (
        <View style={styles.card}>
            <Stack.Screen options={{ title: item.name }} />
            <Image
                source={{ uri: item.image }}
                style={styles.image}
                resizeMethod='scale'
            />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.text}>Status: {item.status}</Text>
            <Text style={styles.text}>Species: {item.species}</Text>
            <Text style={styles.text}>Gender: {item.gender}</Text>
            <Text style={styles.text}>Location: {item.location.name}</Text>
            <Text style={styles.text}>Origin: {item.origin.name}</Text>
            {item.type === '' ? null: <Text style={styles.text}>Type: {item.type}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    card: { flex: 1, padding: 16 },
    image: { width: '100%', height:400, borderRadius: 8, },
    name: { fontWeight: 600, fontSize: 26, margin:16, alignSelf:'center' },
    text: { fontSize: 20 },
    loading: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});