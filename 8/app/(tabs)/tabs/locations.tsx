import React, { useState, useEffect } from 'react';
import { Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Location } from '@/entities/entities';
import { fetchLocations } from '../../../api/api';
import { Link } from 'expo-router';

export default function LocationsTab() {
    const [data, setData] = useState<Location[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetchLocations();
                setData(response);
            } catch (error) {
                setError('Failed to load locations');
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const renderItem = ({ item }: { item: Location }) => (
        <Link
            key={item.id}
            href={{
                pathname: '/details/location-details',
                params: { id: item.id }
            }}
            asChild
        >
            <TouchableOpacity style={styles.card}  >
                <Text style={styles.name}>{item.name}</Text>
                <Text>Dimension: {item.dimension}</Text>
                <Text>Type: {item.type}</Text>
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