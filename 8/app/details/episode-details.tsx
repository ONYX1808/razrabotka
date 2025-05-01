import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Episode } from '@/entities/entities';
import { fetchEpisodes } from '../../api/api';

export default function EpisodeDetailsScreen() {
    const [data, setData] = useState<Episode[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { id } = useLocalSearchParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetchEpisodes();
                setData(response);
            } catch (error) {
                setError('Failed to load episodes');
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
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.text}>Episode: {item.episode}</Text>
            <Text style={styles.text}>Air date: {item.air_date}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: { flex: 1, padding: 16 },
    image: { width: '100%', height: 400, borderRadius: 8, },
    name: { fontWeight: 600, fontSize: 26, margin: 16, alignSelf: 'center' },
    text: { fontSize: 20 },
    loading: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});