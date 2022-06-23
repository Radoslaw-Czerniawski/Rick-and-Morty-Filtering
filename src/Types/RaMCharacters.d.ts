import { Dispatch } from 'react';

interface RaMResponse {
    info: RaMInfo;
    results: RaMCharacter[];
}

interface RaMInfo {
    count: number;
    next: string | null;
    pages: number;
    prev: string | null;
}

interface RaMCharacter {
    id: number;
    name: string;
    status: RaMStatus;
    species: RaMSpecies;
    type: string;
}

type RaMStatus = 'Alive' | 'Dead' | 'unknown';
type RaMSpecies = 'Alien' | 'Human';
