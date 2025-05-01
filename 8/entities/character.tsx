import { CharacterLocation } from "./character-location"
import { CharacterOrigin } from "./character-origin"

export interface Character {
    id: number
    name: string
    status: string
    species: string
    type: string
    gender: string
    origin: CharacterOrigin
    location: CharacterLocation
    image: string
    episode: string[]
    url: string
    created: string
}
