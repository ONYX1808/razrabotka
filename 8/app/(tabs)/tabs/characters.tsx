import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Character } from '@/entities/entities';
import { fetchCharacters } from '../../../api/api';

export default function CharactersTab() {
    const [data, setData] = useState<Character[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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

    const renderItem = ({ item }: { item: Character }) => (
        <Link
            key={item.id}
            href={{
                pathname: '/details/character-details',
                params: { id: item.id }
            }}
            asChild
        >
            <TouchableOpacity style={styles.card}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                />
                <View style={styles.infoCard}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text>Status: {item.status}</Text>
                    <Text>Species: {item.species}</Text>
                </View>
            </TouchableOpacity>
        </Link >
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
    card: { flexDirection: 'row', overflow: 'hidden', borderWidth: 2, borderColor: 'black', borderRadius: 8, marginHorizontal: 16, marginVertical: 4 },
    image: { width: 100, height: 100, borderStartStartRadius: 8 },
    infoCard: { padding: 8 },
    name: { fontWeight: 600, fontSize: 20 },
    loading: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});