import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator, TouchableOpacity, Pressable, TextInput } from 'react-native';
import { CompanyDatabase, databaseName } from '@/src/data/database/database';
import { Company } from '@/src/data/types/types';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { Link, useFocusEffect } from 'expo-router';

export default function CompaniesListScreen() {
    return (
        <Content />
    );
};


function Content() {
    const [name, setName] = useState<string>('');
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const database = useSQLiteContext();
    const companyDatabase = new CompanyDatabase(database);

    async function loadCompanies() {
        try {
            await companyDatabase.initializeDatabase();
            const companies = await companyDatabase.getCompanies();
            setCompanies(companies);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };

    async function findCompanies() {
        try {
            await companyDatabase.initializeDatabase();
            const companies = await companyDatabase.findCompaniesByName(name);
            setCompanies(companies);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };


    useFocusEffect(
        useCallback(() => {
            loadCompanies();
        }, [])
    );

    if (loading) {
        return <ActivityIndicator style={styles.loading} />;
    }

    return <View style={styles.container}>
        <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
        <FlatList
            data={companies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <Link
                    href={{
                        pathname: '/screens/details',
                        params: { id: item.id }
                    }}
                    asChild
                >
                    <TouchableOpacity>
                        <View style={styles.card}>
                            <Text style={styles.title}>{item.name}</Text>
                            <Text>Founded: {item.founded_year}</Text>
                            <Text>HQ: {item.headquarters}</Text>
                            <Text>Industry: {item.industry_name}</Text>
                            <Text>Market Cap: ${item.market_cap}</Text>
                            <Text>Created At: {new Date(Date.parse(item.created_at)).toDateString()} {new Date(Date.parse(item.created_at)).toTimeString()}</Text>
                        </View>
                    </TouchableOpacity>
                </Link>
            )
            } />
        <View style={{ marginBottom: 8 }}>
            <Button title="Find Company" onPress={findCompanies} />
        </View>
        < Link href='/screens/add_company' asChild  >
            <Button title="Add New Company" />
        </Link >
    </View >;
}


const styles = StyleSheet.create({
    input: { borderBottomWidth: 1, marginBottom: 12, padding: 8 },
    loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    container: { flex: 1, padding: 20 },
    card: { backgroundColor: '#f0f0f0', padding: 15, marginVertical: 8, borderRadius: 10, borderWidth: 1 },
    title: { fontSize: 18, fontWeight: 'bold' },
});