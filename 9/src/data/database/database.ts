import * as SQLite from "expo-sqlite";
import { Company, Industry } from "../types/types";

export const databaseName: string = 'companies.db';

export class CompanyDatabase {
    private database: SQLite.SQLiteDatabase;

    constructor(database: SQLite.SQLiteDatabase) {
        this.database = database
    }

    async open() {
        return this.database;
    }

    async close() {
        this.database.closeAsync();
    }

    async initializeDatabase() {
        // await this.dropTables()
        await this.createTables();
        if ((await this.getIndustries()).length === 0) {
            await this.insertIndustryData();
        }
        if ((await this.getCompanies()).length === 0) {
            await this.insertCompaniesData();
        }
    }

    async createTables() {
        await this.database.execAsync(`
    CREATE TABLE IF NOT EXISTS industries(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS companies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        founded_year INTEGER,
        headquarters TEXT,
        market_cap REAL,
        industry_id INTEGER,
        created_at TEXT,
        FOREIGN KEY (industry_id) REFERENCES industries(id)
    );`
        );
    }

    async dropTables() {
        await this.database.execAsync(`
        DROP TABLE IF EXISTS industries;
        DROP TABLE IF EXISTS companies;
        `);
    }

    async insertIndustryData() {
        const industryData: Industry[] = [
            { id: 1, name: 'Technology' },
            { id: 2, name: 'E-commerce' },
            { id: 3, name: 'Oil & Gas' },
            { id: 4, name: 'Social Media' },
            { id: 5, name: 'Conglomerate' },
            { id: 6, name: 'Automotive' },
            { id: 7, name: 'Semiconductors' },
            { id: 8, name: 'Pharmaceuticals' },
            { id: 9, name: 'Retail' },
            { id: 10, name: 'Financial Services' }
        ];
        industryData.forEach(async (e) => this.insertIndustry(e));
    }


    async insertCompaniesData() {
        const companiesData: Company[] = [
            {
                id: 1,
                name: 'Apple Inc.',
                description: 'Производитель потребительской электроники и программного обеспечения.',
                founded_year: 1976,
                headquarters: 'Купертино, США',
                market_cap: 3172000000000,
                industry_id: 1,
                created_at: new Date(Date.now()).toISOString()
            },
            {
                id: 2,
                name: 'Microsoft Corporation',
                description: 'Разработчик программного обеспечения и облачных решений.',
                founded_year: 1975,
                headquarters: 'Редмонд, США',
                market_cap: 2929000000000,
                industry_id: 1,
                created_at: new Date(Date.now()).toISOString()
            },
            {
                id: 3,
                name: 'NVIDIA Corporation',
                description: 'Лидер в области графических процессоров и ИИ.',
                founded_year: 1993,
                headquarters: 'Санта-Клара, США',
                market_cap: 2660000000000,
                industry_id: 7,
                created_at: new Date(Date.now()).toISOString()
            },
            {
                id: 4,
                name: 'Amazon.com, Inc.',
                description: 'Крупнейшая в мире компания электронной коммерции и облачных сервисов.',
                founded_year: 1994,
                headquarters: 'Сиэтл, США',
                market_cap: 1988000000000,
                industry_id: 4,
                created_at: new Date(Date.now()).toISOString()
            },
            {
                id: 5,
                name: 'Alphabet Inc. (Google)',
                description: 'Холдинг, владеющий Google и другими цифровыми сервисами.',
                founded_year: 1998,
                headquarters: 'Маунтин-Вью, США',
                market_cap: 1953000000000,
                industry_id: 1,
                created_at: new Date(Date.now()).toISOString()
            },
            {
                id: 6,
                name: 'Saudi Aramco',
                description: 'Национальная нефтяная компания Саудовской Аравии.',
                founded_year: 1933,
                headquarters: 'Дахран, Саудовская Аравия',
                market_cap: 1660000000000,
                industry_id: 2,
                created_at: new Date(Date.now()).toISOString()
            },
            {
                id: 7,
                name: 'Meta Platforms, Inc. (Facebook)',
                description: 'Социальные сети и технологии виртуальной реальности.',
                founded_year: 2004,
                headquarters: 'Менло-Парк, США',
                market_cap: 1399000000000,
                industry_id: 1,
                created_at: new Date(Date.now()).toISOString()
            },
            {
                id: 8,
                name: 'Berkshire Hathaway Inc.',
                description: 'Многоотраслевая холдинговая компания.',
                founded_year: 1839,
                headquarters: 'Омаха, США',
                market_cap: 1152000000000,
                industry_id: 3,
                created_at: new Date(Date.now()).toISOString()
            },
            {
                id: 9,
                name: 'Tesla, Inc.',
                description: 'Производитель электромобилей и решений для хранения энергии.',
                founded_year: 2003,
                headquarters: 'Пало-Альто, США',
                market_cap: 940610000000,
                industry_id: 6,
                created_at: new Date(Date.now()).toISOString()
            },
            {
                id: 10,
                name: 'Taiwan Semiconductor Manufacturing Company (TSMC)',
                description: 'Крупнейший контрактный производитель полупроводников.',
                founded_year: 1987,
                headquarters: 'Синьчжу, Тайвань',
                market_cap: 853080000000,
                industry_id: 7,
                created_at: new Date(Date.now()).toISOString()
            }
        ];
        companiesData.forEach(async (e) => await this.insertCompany(e));
    }

    async getNewId() {
        const companies = await this.getCompanies();
        let id: number;

        if (companies.length === 0) {
            id = 1;
        } else {
            id = companies[companies.length - 1].id + 1;
            let company: Company | undefined;
            do {
                company = companies.find(e => e.id === id);
                if (company !== undefined) {
                    id = company.id + 1;
                }
            }
            while (company !== undefined);
        }
        return id;
    }

    async getIndustry(id: number) {
        const query = `SELECT * FROM industries WHERE id=${id};`;
        const result = await this.database.getFirstAsync<Industry>(query)
        return result;
    }

    async getCompany(id: number) {
        const query = `
            SELECT companies.*, industries.name as industry_name 
            FROM companies 
            LEFT JOIN industries 
            ON companies.industry_id = industries.id
            WHERE companies.id=${id};`;
        const result = await this.database.getFirstAsync<Company>(query)
        return result;
    }

    async getIndustries() {
        const query = 'SELECT * FROM industries;';
        const array = await this.database.getAllAsync<Industry>(query)
        return array;
    }

    async getCompanies() {
        const query = `
            SELECT companies.*, industries.name as industry_name 
            FROM companies 
            LEFT JOIN industries 
            ON companies.industry_id = industries.id;`;
        const array = await this.database.getAllAsync<Company>(query)
        return array;
    }

    async insertIndustry(indusry: Industry) {
        const industryStatement = await this.database.prepareAsync(`
            INSERT INTO industries (id, name) VALUES ($id ,$name)`);
        await industryStatement.executeAsync<Industry>({
            $id: indusry.id,
            $name: indusry.name
        });
    }

    async insertCompany(company: Company) {
        const companyStatement = await this.database.prepareAsync(`
            INSERT INTO companies(name, description, founded_year, headquarters, market_cap, industry_id, created_at) 
            VALUES ($name, $description, $founded_year, $headquarters, $market_cap, $industry_id, $created_at);`);
        await companyStatement.executeAsync<Company>({
            $id: company.id,
            $name: company.name,
            $description: company.description,
            $founded_year: company.founded_year,
            $headquarters: company.headquarters,
            $market_cap: company.market_cap,
            $industry_id: company.industry_id,
            $created_at: company.created_at
        });

    }

    async updateCompany(company: Company) {
        const statement = await this.database.prepareAsync(`
            UPDATE companies
            SET name = $name,
                description = $description,
                founded_year = $founded_year,
                headquarters = $headquarters,
                market_cap = $market_cap,
                industry_id = $industry_id
            WHERE id = $id;
        `);

        await statement.executeAsync({
            $id: company.id,
            $name: company.name,
            $description: company.description,
            $founded_year: company.founded_year,
            $headquarters: company.headquarters,
            $market_cap: company.market_cap,
            $industry_id: company.industry_id
        });
    }

    async deleteCompany(id: number) {
        const statement = await this.database.prepareAsync(`
            DELETE FROM companies WHERE id = $id;
        `);

        await statement.executeAsync({ $id: id });
    }

    async findCompaniesByName(name: string) {
        const query = `
            SELECT companies.*, industries.name as industry_name 
            FROM companies 
            LEFT JOIN industries 
            ON companies.industry_id = industries.id
            WHERE companies.name LIKE '%${name}%';`;
        const result = await this.database.getAllAsync<Company>(query)
        return result;
    }
}
