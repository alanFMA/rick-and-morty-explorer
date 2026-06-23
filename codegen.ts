import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://rickandmortyapi.com/graphql',
  documents: ['src/infrastructure/graphql/queries/**/*.graphql'],
  generates: {
    'src/infrastructure/graphql/generated/types.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      config: {
        skipTypename: true,
      },
    },
  },
};

export default config;
