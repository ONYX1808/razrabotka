import { useLocalSearchParams, Link, Stack } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { usePlaces } from '../../../context/PlacesContext';
import PlaceItem from '../../../components/PlaceItem';
import { TouchableOpacity } from 'react-native';

export default function PlacesScreen() {
    const { category } = useLocalSearchParams();
    const { state } = usePlaces();

    const placesInCategory = state.places.filter(
        place => place.category === category
    );

    return (
        <View>
            <Stack.Screen
                name='category'
                options={{
                    title: category.toString(),
                }}
            />
            <ScrollView>
                {placesInCategory.map(place => (
                    <Link
                        key={place.id}
                        href={{
                            pathname: "/places/details/[id]",
                            params: { id: place.id }
                        }}
                        asChild
                    >
                        <Pressable>
                            <PlaceItem place={place} />
                        </Pressable>
                    </Link>
                ))}
            </ScrollView>
        </View>
    );
}
