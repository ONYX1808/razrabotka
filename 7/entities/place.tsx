import { ImageSourcePropType } from "react-native";

export default class Place {
    id: number;
    name: string;
    category: string;
    description: string;
    imageUrl: ImageSourcePropType ;
    rating: number;

    constructor(
        id: number,
        name: string,
        category: string,
        description: string,
        imageUrl: ImageSourcePropType,
        rating: number
    ) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.description = description;
        this.imageUrl = imageUrl;
        this.rating = rating;
    }
}