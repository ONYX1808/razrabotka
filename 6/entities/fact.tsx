export default class Fact {
    day: number;
    title: string;
    imageURL: string;
    description: string;

    constructor(
        day: number,
        title: string,
        imageURL: string,
        description: string,
    ) {
        this.day = day;
        this.title = title;
        this.imageURL = imageURL;
        this.description = description;
    }
}
