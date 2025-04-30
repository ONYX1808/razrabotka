export default class Company {
    name: string;
    ticker: string;
    country: string;
    capitalization: number;
    imageURL: string;

    constructor(
        name: string,
        ticker: string,
        country: string,
        capitalization: number,
    ) {
        this.name = name;
        this.ticker = ticker;
        this.country = country;
        this.capitalization = capitalization;
        this.imageURL = `https://companiesmarketcap.com/img/company-logos/256/${ticker}.webp`;
    }
}