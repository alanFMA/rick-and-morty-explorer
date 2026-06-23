import type { CharacterDetail } from '@/domain/models/Character';
import type { CharacterList } from '@/domain/models/CharacterList';
import {
  GetCharacterByIdDocument,
  type GetCharacterByIdQueryVariables,
  GetCharactersDocument,
  type GetCharactersQueryVariables,
} from '@/infrastructure/graphql/generated/types';
import { fetchGraphQL } from '@/infrastructure/http/graphqlClient';
import { mapCharacterDetail, mapCharacterList } from '@/infrastructure/mappers/characterMapper';

export async function fetchCharacters(
  variables: GetCharactersQueryVariables = {},
): Promise<CharacterList> {
  const data = await fetchGraphQL(GetCharactersDocument, variables);
  return mapCharacterList(data);
}

export async function fetchCharacterById(
  variables: GetCharacterByIdQueryVariables,
): Promise<CharacterDetail | null> {
  const data = await fetchGraphQL(GetCharacterByIdDocument, variables);
  return mapCharacterDetail(data.character);
}
