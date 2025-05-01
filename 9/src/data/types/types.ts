export interface Company {
    id: number;
    name: string;
    description: string;
    founded_year: number;
    headquarters: string;
    market_cap: number;
    industry_id: number;
    industry_name?: string;
    created_at: string;

}

export interface Industry {
    id: number;
    name: string;
}
