import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Company, Industry } from '@/src/data/types/types';
import { CompanyDatabase, databaseName } from '@/src/data/database/database';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

function AddCompanyScreen() {
    return (
        <Content />
    );
};

function Content() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [foundedYear, setFoundedYear] = useState('');
    const [headquarters, setHeadquarters] = useState('');
    const [marketCap, setMarketCap] = useState('');
    const [industries, setIndustries] = useState<Industry[]>([]);
    const [selectedIndustry, setSelectedIndustry] = useState<number | undefined>(undefined);

    const database = useSQLiteContext();
    const companyDatabase = new CompanyDatabase(database);

    useEffect(() => {
        async function loadInustries() {
            const industries = await companyDatabase.getIndustries();
            setIndustries(industries);
            setSelectedIndustry(industries[0].id);
        }

        loadInustries();
    }, []);

    const addCompany = async () => {
        if (!selectedIndustry) {
            alert('Please select an industry');
            return;
        }

        const id = await companyDatabase.getNewId();
        const company: Company = {
            id: id,
            name: name,
            description: description,
            founded_year: parseInt(foundedYear),
            headquarters: headquarters,
            market_cap: parseFloat(marketCap),
            industry_id: selectedIndustry,
            created_at: new Date(Date.now()).toISOString()
        }
        await companyDatabase.insertCompany(company);
        router.back();

    };

    return (
        <View style={styles.container}>
            <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
            <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={styles.input} />
            <TextInput placeholder="Founded Year" value={foundedYear} onChangeText={setFoundedYear} keyboardType="numeric" style={styles.input} />
            <TextInput placeholder="Headquarters" value={headquarters} onChangeText={setHeadquarters} style={styles.input} />
            <TextInput placeholder="Market Cap (B$)" value={marketCap} onChangeText={setMarketCap} keyboardType="numeric" style={styles.input} />
            <Text>Industry:</Text>
            <Picker selectedValue={selectedIndustry} onValueChange={(itemValue) => setSelectedIndustry(itemValue as number)} style={styles.input}>
                {industries.map((industry) => (
                    <Picker.Item key={industry.id} label={industry.name} value={industry.id} />
                ))}
            </Picker>

            <Button title="Save Company" onPress={addCompany} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    input: { borderBottomWidth: 1, marginBottom: 12, padding: 8 },
});

export default AddCompanyScreen;
