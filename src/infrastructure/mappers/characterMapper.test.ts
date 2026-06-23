import { describe, expect, it } from 'vitest';

import { mapCharacterDetail, mapCharacterList, mapCharacterSummary } from './characterMapper';

describe('mapCharacterSummary', () => {
  it('maps a well-formed DTO to a CharacterSummary', () => {
    const result = mapCharacterSummary({
      id: '1',
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    });

    expect(result).toEqual({
      id: '1',
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    });
  });

  it('returns null when the DTO is null', () => {
    expect(mapCharacterSummary(null)).toBeNull();
  });

  it('returns null when the DTO has no id', () => {
    expect(
      mapCharacterSummary({ id: null, name: 'Rick', status: 'Alive', species: 'Human', image: '' }),
    ).toBeNull();
  });

  it('falls back to "unknown" for null fields', () => {
    const result = mapCharacterSummary({
      id: '1',
      name: null,
      status: null,
      species: null,
      image: null,
    });

    expect(result).toEqual({
      id: '1',
      name: 'unknown',
      status: 'unknown',
      species: 'unknown',
      image: '',
    });
  });

  it('falls back to "unknown" for an unexpected status value', () => {
    const result = mapCharacterSummary({
      id: '1',
      name: 'Rick',
      status: 'Disintegrated',
      species: 'Human',
      image: '',
    });

    expect(result?.status).toBe('unknown');
  });
});

describe('mapCharacterList', () => {
  it('maps info and filters out null results', () => {
    const result = mapCharacterList({
      characters: {
        info: { count: 2, pages: 1, next: null, prev: null },
        results: [
          { id: '1', name: 'Rick', status: 'Alive', species: 'Human', image: '' },
          null,
          { id: null, name: 'Ghost', status: 'unknown', species: 'unknown', image: '' },
        ],
      },
    });

    expect(result.info).toEqual({ count: 2, pages: 1, next: null, prev: null });
    expect(result.results).toHaveLength(1);
    expect(result.results[0]?.id).toBe('1');
  });

  it('returns empty results and zeroed info when data is null', () => {
    expect(mapCharacterList(null)).toEqual({
      info: { count: 0, pages: 0, next: null, prev: null },
      results: [],
    });
  });

  it('returns empty results when characters.results is an empty array', () => {
    const result = mapCharacterList({
      characters: { info: { count: 0, pages: 0, next: null, prev: null }, results: [] },
    });

    expect(result.results).toEqual([]);
  });
});

describe('mapCharacterDetail', () => {
  it('maps a well-formed DTO to a CharacterDetail', () => {
    const result = mapCharacterDetail({
      id: '1',
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      image: '',
      origin: { name: 'Earth', dimension: 'C-137' },
      location: { name: 'Citadel', dimension: 'unknown' },
      episode: [{ id: '1', name: 'Pilot', episode: 'S01E01' }],
    });

    expect(result).toEqual({
      id: '1',
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      image: '',
      origin: { name: 'Earth', dimension: 'C-137' },
      location: { name: 'Citadel', dimension: 'unknown' },
      episodes: [{ id: '1', name: 'Pilot', episode: 'S01E01' }],
    });
  });

  it('returns null when the character is null', () => {
    expect(mapCharacterDetail(null)).toBeNull();
  });

  it('falls back to "unknown" location when origin/location are null', () => {
    const result = mapCharacterDetail({
      id: '1',
      name: 'Rick',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      image: '',
      origin: null,
      location: null,
      episode: [],
    });

    expect(result?.origin).toEqual({ name: 'unknown', dimension: 'unknown' });
    expect(result?.location).toEqual({ name: 'unknown', dimension: 'unknown' });
  });

  it('filters out null episodes and episodes without an id', () => {
    const result = mapCharacterDetail({
      id: '1',
      name: 'Rick',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      image: '',
      origin: null,
      location: null,
      episode: [
        null,
        { id: null, name: 'Ghost', episode: 'unknown' },
        { id: '2', name: 'Lawnmower Dog', episode: 'S01E02' },
      ],
    });

    expect(result?.episodes).toEqual([{ id: '2', name: 'Lawnmower Dog', episode: 'S01E02' }]);
  });

  it('falls back to "unknown" for an unexpected gender value', () => {
    const result = mapCharacterDetail({
      id: '1',
      name: 'Rick',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Cyborg',
      image: '',
      origin: null,
      location: null,
      episode: [],
    });

    expect(result?.gender).toBe('unknown');
  });
});
