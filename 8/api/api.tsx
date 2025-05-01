import { Character, Episode, Location } from "@/entities/entities";

export async function fetchCharacters() {
    const response = await fetch('https://rickandmortyapi.com/api/character')
    if (!response.ok) {
        throw new Error('Failed to fetch characters');
    }
    const json = await response.json();
    return json.results as Character[];
}

export async function fetchLocations() {
    const response = await fetch('https://rickandmortyapi.com/api/location')
    if (!response.ok) {
        throw new Error('Failed to fetch locations');
    }
    const json = await response.json();
    return json.results as Location[];
}

export async function fetchEpisodes() {
    const response = await fetch('https://rickandmortyapi.com/api/episode')
    if (!response.ok) {
        throw new Error('Failed to fetch episodes');
    }
    const json = await response.json();
    const results = json.results as Episode[];
    return results;
}