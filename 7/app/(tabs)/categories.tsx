import { Pressable, ScrollView, Text, View } from 'react-native';
import { Link, Stack } from 'expo-router';
import { usePlaces } from '../../context/PlacesContext';
import CategoryCard from '../../components/CategoryCard';

export default function CategoriesScreen() {
    const { state } = usePlaces();

    return (
        <View>
            <Stack.Screen
                name='categories'
                options={{
                    title: 'Categories',
                }}
            />
            <ScrollView >
                {state.categories.map(category => (
                    <Link
                        key={category}
                        href={{
                            pathname: "/places/[category]",
                            params: { category }
                        }}
                        asChild
                    >
                        <Pressable>
                            <CategoryCard title={category} />
                        </Pressable>
                    </Link>
                ))}
            </ScrollView>
        </View >
    );
}
