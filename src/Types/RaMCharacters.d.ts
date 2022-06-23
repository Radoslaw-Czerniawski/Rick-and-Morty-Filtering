import { Dispatch } from 'react';

interface RaMResponse {
    info: RaMInfo;
    results: RaMCharacterFromApi[];
}

interface RaMInfo {
    count: number;
    next: string | null;
    pages: number;
    prev: string | null;
}

interface RaMCharacterFromApi {
    id: number;
    name: string;
    status: RaMStatus;
    species: RaMSpecies;
    image: string;
    origin: Origin;
    episode: string[];
}

type RaMCharacter = Omit<RaMCharacterFromApi, 'episode'> & {
    episodes: string[];
};

interface Origin {
    name: string;
    url: string;
}

type RaMStatus = 'Alive' | 'Dead' | 'unknown';
type RaMSpecies = 'Alien' | 'Human';
