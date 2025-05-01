import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Company, Industry } from '@/src/data/types/types';
import { CompanyDatabase, databaseName } from '@/src/data/database/database';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { Link, router, Stack, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

export default function DetailsScreen() {
    const [company, setCompany] = useState<Company | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const { id } = useLocalSearchParams();

    const database = useSQLiteContext();
    const companyDatabase = new CompanyDatabase(database);

    async function loadCompany() {
        const company = await companyDatabase.getCompany(parseInt(id.toString()));
        setCompany(company);
        setLoading(false);
    }

    useFocusEffect(
        useCallback(() => {
            loadCompany();
        }, [])
    );

    return (
        <View style={styles.containerMain}>
            <Header company={company} />
            <Content loading={loading} company={company} database={companyDatabase} />
        </View>
    );
};


type HeaderProps = {
    company: Company | null;
}

function Header(props: HeaderProps) {
    const company = props.company;

    return (
        <Stack.Screen
            name='category'
            options={{
                title: company?.name.toString() ?? 'Details',
            }}
        />
    );
}

type ContentProps = {
    loading: boolean,
    company: Company | null;
    database: CompanyDatabase;
}

function Content(props: ContentProps) {
    const loading = props.loading;
    const company = props.company;
    const database = props.database;


    if (loading) {
        return <ActivityIndicator style={styles.loading} />;
    }

    if (company === null) {
        return <Text>Company is null</Text>
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{company.name}</Text>
            <Text>Founded: {company.founded_year}</Text>
            <Text>HQ: {company.headquarters}</Text>
            <Text>Industry: {company.industry_name}</Text>
            <Text>Market Cap: ${company.market_cap}</Text>
            <Text>Created At: {new Date(Date.parse(company.created_at)).toDateString()} {new Date(Date.parse(company.created_at)).toTimeString()}</Text>
            <View style={{ marginVertical: 8 }}>
                <Button title='Delete' onPress={() => {
                    database.deleteCompany(company.id);
                    router.back();
                }} />
            </View>
            <Link
                href={{
                    pathname: '/screens/edit_company',
                    params: { id: company.id }
                }}
                asChild
                style={{ marginTop: 8 }}
            >
                <Button title='Edit' />
            </Link>
        </View>
    );
}


const styles = StyleSheet.create({
    loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    containerMain: { flex: 1 },
    container: { flex: 1, padding: 20 },
    containerbtn: { flex: 1, flexDirection: 'row', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold' },
});