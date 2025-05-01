import React, { useState, useEffect } from 'react';
import { Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Episode } from '@/entities/entities';
import { fetchEpisodes } from '../../../api/api';
import { Link } from 'expo-router';

export default function EpisodesTab() {
    const [data, setData] = useState<Episode[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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

    const renderItem = ({ item }: { item: Episode }) => (
        <Link
            key={item.id}
            href={{
                pathname: '/details/episode-details',
                params: { id: item.id }
            }}
            asChild
        >
            <TouchableOpacity style={styles.card} >
                <Text style={styles.name}>{item.name}</Text>
                <Text>Episode: {item.episode}</Text>
                <Text>Air date: {item.air_date}</Text>
            </TouchableOpacity>
        </Link>
    );

    if (loading) {
        return <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
        />
    );
};

const styles = StyleSheet.create({
    card: { overflow: 'hidden', borderWidth: 2, borderColor: 'black', padding: 8, borderRadius: 8, marginHorizontal: 16, marginVertical: 4 },
    name: { fontWeight: 600, fontSize: 20 },
    loading: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});