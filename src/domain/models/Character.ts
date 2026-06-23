import type { Location } from './Location';

export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';
export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';

export interface CharacterEpisode {
  id: string;
  name: string;
  episode: string;
}

/** Lightweight projection used by the character listing/grid (GetCharacters query). */
export interface CharacterSummary {
  id: string;
  name: string;
  status: CharacterStatus;
  species: string;
  image: string;
}

/** Full projection used by the character detail view (GetCharacterById query). */
export interface CharacterDetail {
  id: string;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  image: string;
  origin: Location;
  location: Location;
  episodes: CharacterEpisode[];
}
