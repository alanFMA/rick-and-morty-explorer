import { print } from 'graphql';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';

const GRAPHQL_ENDPOINT = 'https://rickandmortyapi.com/graphql';

interface GraphQLResponse<TData> {
  data?: TData;
  errors?: Array<{ message: string }>;
}

interface FetchGraphQLOptions {
  /** Seconds the Next.js fetch cache should keep this response for. */
  revalidate?: number;
}

export async function fetchGraphQL<TData, TVariables extends Record<string, unknown>>(
  document: TypedDocumentNode<TData, TVariables>,
  variables: TVariables,
  { revalidate = 86400 }: FetchGraphQLOptions = {},
): Promise<TData> {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: print(document), variables }),
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error('Falha ao buscar dados na API Rick & Morty');
  }

  const { data, errors }: GraphQLResponse<TData> = await res.json();

  if (errors && errors.length > 0) {
    throw new Error(errors.map((error) => error.message).join('; '));
  }

  if (!data) {
    throw new Error('Resposta da API Rick & Morty não contém dados');
  }

  return data;
}
