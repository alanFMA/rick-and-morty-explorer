import type {
  CharacterDetail,
  CharacterEpisode,
  CharacterGender,
  CharacterStatus,
  CharacterSummary,
} from '@/domain/models/Character';
import type { CharacterList } from '@/domain/models/CharacterList';
import type { Location } from '@/domain/models/Location';
import type { PageInfo } from '@/domain/models/PageInfo';
import type {
  GetCharacterByIdQuery,
  GetCharactersQuery,
} from '@/infrastructure/graphql/generated/types';

const CHARACTER_STATUSES: readonly CharacterStatus[] = ['Alive', 'Dead', 'unknown'];
const CHARACTER_GENDERS: readonly CharacterGender[] = ['Female', 'Male', 'Genderless', 'unknown'];

function toCharacterStatus(value: string | null | undefined): CharacterStatus {
  return CHARACTER_STATUSES.includes(value as CharacterStatus)
    ? (value as CharacterStatus)
    : 'unknown';
}

function toCharacterGender(value: string | null | undefined): CharacterGender {
  return CHARACTER_GENDERS.includes(value as CharacterGender)
    ? (value as CharacterGender)
    : 'unknown';
}

function toLocation(
  dto: { name: string | null; dimension: string | null } | null | undefined,
): Location {
  return {
    name: dto?.name ?? 'unknown',
    dimension: dto?.dimension ?? 'unknown',
  };
}

type CharacterSummaryDto = NonNullable<
  NonNullable<GetCharactersQuery['characters']>['results']
>[number];
type CharacterDetailDto = GetCharacterByIdQuery['character'];
type CharacterEpisodeDto = NonNullable<CharacterDetailDto>['episode'][number];

export function mapCharacterSummary(
  dto: CharacterSummaryDto | null | undefined,
): CharacterSummary | null {
  if (!dto || !dto.id) {
    return null;
  }

  return {
    id: dto.id,
    name: dto.name ?? 'unknown',
    status: toCharacterStatus(dto.status),
    species: dto.species ?? 'unknown',
    image: dto.image ?? '',
  };
}

export function mapCharacterList(data: GetCharactersQuery | null | undefined): CharacterList {
  const info: PageInfo = {
    count: data?.characters?.info?.count ?? 0,
    pages: data?.characters?.info?.pages ?? 0,
    next: data?.characters?.info?.next ?? null,
    prev: data?.characters?.info?.prev ?? null,
  };

  const results = (data?.characters?.results ?? [])
    .map(mapCharacterSummary)
    .filter((character): character is CharacterSummary => character !== null);

  return { info, results };
}

function mapCharacterEpisode(dto: CharacterEpisodeDto | null | undefined): CharacterEpisode | null {
  if (!dto || !dto.id) {
    return null;
  }

  return {
    id: dto.id,
    name: dto.name ?? 'unknown',
    episode: dto.episode ?? 'unknown',
  };
}

export function mapCharacterDetail(
  dto: CharacterDetailDto | null | undefined,
): CharacterDetail | null {
  if (!dto || !dto.id) {
    return null;
  }

  return {
    id: dto.id,
    name: dto.name ?? 'unknown',
    status: toCharacterStatus(dto.status),
    species: dto.species ?? 'unknown',
    type: dto.type ?? '',
    gender: toCharacterGender(dto.gender),
    image: dto.image ?? '',
    origin: toLocation(dto.origin),
    location: toLocation(dto.location),
    episodes: (dto.episode ?? [])
      .map(mapCharacterEpisode)
      .filter((episode): episode is CharacterEpisode => episode !== null),
  };
}
