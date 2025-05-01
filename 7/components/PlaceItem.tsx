import styled from 'styled-components/native';
import { useWindowDimensions, Text, Image, ImageSourcePropType, View } from 'react-native';
import Place from '@/entities/place';

function Container(props: { children: React.ReactNode | undefined }) {
    return (
        <View
            style={{
                flexDirection: 'row',
                margin: 8,
                padding: 16,
                backgroundColor: 'white',
                borderColor: 'black',
                borderWidth: 2,
                borderRadius: 8,
                shadowOpacity: 0.1,
                shadowRadius: 3,
            }}
        >
            {props.children}
        </View >
    );
}

function ResponsiveImage(props: { source?: ImageSourcePropType | undefined, isTablet: boolean }) {
    return (
        <Image
            source={props.source}
            style={{
                width: props.isTablet ? 150 : 100,
                height: props.isTablet ? 150 : 100,
                borderRadius: 8,
            }}
        />
    );
}

export default function PlaceItem(props: { place: Place }) {
    const { width } = useWindowDimensions();
    const isTablet = width >= 768;

    return (
        <Container>
            <ResponsiveImage
                source={props.place.imageUrl}
                isTablet={isTablet}
            />
            <View style={{ flex: 1, marginLeft: 16, }}>
                <Text >{props.place.name}</Text>
                <Text>{props.place.description}</Text>
                <Text>{props.place.rating}</Text>
            </View>
        </Container>
    );
}
