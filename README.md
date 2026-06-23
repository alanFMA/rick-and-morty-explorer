# 🌍 Explorador de Personagens Rick and Morty

Uma aplicação web pronta para produção, construída com Next.js 16, TypeScript e Framer Motion que exibe personagens do universo Rick and Morty com um design glassmorphism elegante e capacidades avançadas de filtragem.

## ✨ Funcionalidades

- **🔍 Server-Side Rendering (SSR)**: Carregamentos iniciais rápidos com LCP (Largest Contentful Paint) otimizado
- **📱 Design Responsivo**: UI glassmorphism com Tailwind CSS v4, mobile-first
- **🎬 Animações Ricas**: Parallax scroll com Framer Motion, transições de página e animações spring
- **🔎 Busca e Filtros Inteligentes**: Busca de nome (controlada por botão) + filtros de status (Vivo, Morto, Desconhecido)
- **📖 Página de Detalhes**: Visualização completa mostrando origem, localização, gênero e lista de episódios
- **♿ Acessibilidade em Primeiro Lugar**: Conforme WCAG 2.1 AA (98/100 Lighthouse A11Y)
- **🎨 Sistema de Design**: Paleta portal-green & morty-yellow com tokens de tema
- **🧪 Testes Abrangentes**: Suites de testes unitários, de componentes e E2E com cobertura 100% dos mappers
- **🚀 CI/CD Pronto**: Workflow GitHub Actions com linting automático, testes e deploy Vercel

## 🛠 Stack Tecnológico

| Camada                  | Tecnologia                                     |
| ----------------------- | ---------------------------------------------- |
| **Framework**           | Next.js 16 (App Router, Server Components)     |
| **Linguagem**           | TypeScript 5 (strict mode)                     |
| **Estilização**         | Tailwind CSS v4 + tokens de tema customizados  |
| **Animações**           | Framer Motion 12                               |
| **Busca de Dados**      | GraphQL (Rick & Morty API) com graphql-codegen |
| **Testes Unitários**    | Vitest 4 com React Testing Library             |
| **Testes E2E**          | Playwright                                     |
| **Qualidade de Código** | ESLint 9 + Prettier 3 + hooks Husky pre-commit |
| **Build**               | Turbopack (bundler Next.js)                    |

## 📊 Pontuações Lighthouse

| Categoria      | Pontuação |
| -------------- | --------- |
| Performance    | 88/100    |
| Acessibilidade | 98/100    |
| Boas Práticas  | 100/100   |
| SEO            | 100/100   |

## 🏗 Arquitetura

O projeto segue princípios de **Clean Architecture**:

```
src/
├── domain/                      # Camada de lógica de negócio
│   └── models/                 # Interfaces core (Character, PageInfo, etc.)
├── infrastructure/             # Camada de acesso a dados
│   ├── http/                  # Cliente GraphQL
│   ├── services/              # Serviço de character (fetchCharacters, fetchCharacterById)
│   ├── mappers/               # Transformações DTO → Domain
│   └── graphql/               # Definições de queries e tipos gerados
├── components/                # Camada de UI (Clean Architecture)
│   ├── layout/               # Header, Footer
│   ├── ui/                   # Sistema de design (Button, Card, SearchInput, etc.)
│   ├── features/             # Componentes de features (Grid, Filters, Hero, Parallax)
│   └── animations/           # Wrappers de animações reutilizáveis
├── app/                      # Next.js App Router
│   ├── (home)/              # Homepage com grid renderizado no servidor
│   ├── character/[id]/      # Página dinâmica de detalhes
│   └── layout.tsx           # Layout raiz
├── test/                    # Setup de testes e mocks
└── e2e/                    # Testes E2E com Playwright
```

## 🚀 Como Começar

### Pré-requisitos

- Node.js 20+
- npm 10+

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/alanfma/rick-and-morty-multiverse-explorer.git
cd rick-and-morty-multiverse-explorer

# Instalar dependências
npm install

# Gerar tipos GraphQL
npm run codegen
```

### Desenvolvimento

```bash
# Iniciar servidor dev (com hot reload)
npm run dev

# Abrir http://localhost:3000
```

### Testes

```bash
# Rodar testes unitários e de componentes
npm run test

# Modo watch
npm run test:watch

# Relatório de cobertura
npm run test:coverage

# Rodar testes E2E (requer app de produção construído)
npm run test:e2e
```

### Produção

```bash
# Construir para produção
npm run build

# Iniciar servidor de produção
npm run start
```

## 🔄 Principais Funcionalidades

### Busca e Filtros Inteligentes

- Digite o nome de um personagem no input de busca
- Clique no **botão com ícone de lupa** ou pressione **Enter** para buscar (busca controlada)
- Clique nos botões de status para filtrar instantaneamente
- **A posição do scroll é preservada** quando os resultados atualizam

### Parallax e Animações

- **Hero Section**: Logo com fade-in, Rick/Morty com animação de bounce contínua
- **ParallaxSpaceCruiser**: Movimento vinculado ao scroll usando Framer Motion
- **Character Cards**: Animações spring em hover/tap
- **Transições de Página**: Fade suave entre rotas

### Arquitetura de Dados

- Queries GraphQL transformadas via mappers defensivos
- Lida com valores nulos, undefined, arrays vazios e valores inesperados
- Modelos de domínio isolados de mudanças na API
- Renderização no servidor para FCP/LCP rápido

### Testes

- **Testes Unitários**: Cobertura 100% dos mappers (casos extremos, nulos, validação de enums)
- **Testes de Componentes**: CharacterGrid, CharacterFilters com verificações jest-axe a11y
- **Testes E2E**: Três jornadas críticas do usuário (descoberta, busca, detalhes)
- **Mock do Framer Motion**: Animações desabilitadas em testes para execução rápida

## 📐 Sistema de Design

### Paleta de Cores

```
--portal-green: #00d26a    (primária)
--morty-yellow: #ffd700   (destaque)
--background: #0a0e27     (escuro)
--foreground: #ffffff     (texto claro)
```

### Layout

- 2 colunas (mobile) → 3 colunas (tablet) → 4 colunas (desktop)
- Padding e gaps responsivos via Tailwind

## 🔗 Integração com API

A aplicação consome a **Rick and Morty GraphQL API** em `https://rickandmortyapi.com/graphql`:

- **GetCharacters**: Lista paginada com filtros de nome/status
- **GetCharacterById**: Detalhes completos incluindo episódios

Queries em [`src/infrastructure/graphql/queries/`](src/infrastructure/graphql/queries/) geram tipos TypeScript automaticamente.

## 🔐 Segurança e Boas Práticas

- ✅ Chamadas GraphQL no servidor (sem segredos expostos)
- ✅ Next.js Image optimization com domínios seguros
- ✅ Proteção XSS via escaping JSX do React
- ✅ Conformidade WCAG 2.1 AA em acessibilidade
- ✅ Hooks pre-commit garantem qualidade de código

## 📦 Deploy

Configurado para **Vercel** com GitHub Actions:

1. **PR**: Lint, typecheck, testes unitários, build de produção
2. **Push em main**: Testes E2E e auto-deploy se tudo passar

Segredos necessários:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## 📝 Documentação

- **[PRD.md](PRD.md)** — Requisitos de produto, histórias de usuário
- **[ARCHITECTURE.md](ARCHITECTURE.md)** — Design de Clean Architecture
- **[DESIGN.md](DESIGN.md)** — Sistema visual, specs de componentes
- **[API-SPEC.md](API-SPEC.md)** — Queries GraphQL e contratos
- **[PLAN-TEST.md](PLAN-TEST.md)** — Estratégia de testes e metas de cobertura

## 🤝 Contribuindo

1. Clone o repositório
2. Crie uma branch de feature: `git checkout -b feature/sua-feature`
3. Faça as mudanças (lint/test passam automaticamente no commit)
4. Push e abra um Pull Request

## 📄 Licença

MIT License — veja o arquivo LICENSE para detalhes.

## 🙏 Créditos

- **Dados**: [Rick and Morty API](https://rickandmortyapi.com/)
- **Desenvolvimento**: [Alan Andrade](https://alanfma.vercel.app/)
