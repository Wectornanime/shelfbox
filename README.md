# 📦 ShelfBox

<div align="center">
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src= "https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src= "https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" />
  <img src= "https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
  <img src= "https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/github/license/wectornanime/shelfbox.svg?style=for-the-badge" />
  <img src= "https://img.shields.io/badge/in%20development-yellow?style=for-the-badge" />
</div>

> Organize, catalogue e acompanhe sua coleção de miniaturas, mesmo sem conexão com a internet.

ShelfBox é uma Progressive Web App (PWA) desenvolvida para organizar coleções pessoais. A primeira versão é focada em miniaturas, mas a arquitetura foi pensada para suportar outros tipos de coleções, como livros, discos, jogos e muito mais.

## 💡 Sobre o projeto

ShelfBox nasceu como um laboratório para estudar arquitetura de software aplicada ao desenvolvimento front-end.

Além de ser uma aplicação para gerenciamento de coleções, o projeto busca explorar conceitos como:

- Domain-Driven Design (DDD)
- Separação por camadas
- Repository Pattern
- Offline First
- Progressive Web Apps (PWA)
- Persistência local com IndexedDB

## ✨ Funcionalidades

- 📦 Cadastro de miniaturas
- 🗂️ Organização por coleções
- 📷 Imagens das miniaturas
- 📱 Instalação como aplicativo (PWA)
- 🌐 Funcionamento offline
- 🔍 Pesquisa e filtros *(planejado)*
- ❤️ Favoritos *(planejado)*

> 🚧 Projeto em desenvolvimento — ainda não está pronto para uso em produção.

---

## 🚀 Tecnologias

### Front-end

- React
- Vite
- TypeScript
- HeroUI
- Tailwind CSS

### Persistência

- Dexie (IndexedDB)

### Qualidade e infraestrutura

- Jest + ts-jest (testes)
- ESLint + Prettier
- Husky + lint-staged + git-commit-msg-linter
- Semantic Release + conventional-changelog
- GitHub Actions (CI, release e deploy)

<!-- ### Futuro

- Sincronização com Supabase
- Backup na nuvem -->

---

## 📁 Estrutura do projeto

```text
src/
├── app/
├── domain/
├── infrastructure/
├── styles/
└── ui/
```

Consulte o arquivo [`ARCHITECTURE.md`](./docs/ARCHITECTURE.md) para mais detalhes.

---

## 🛠️ Executando o projeto

### Instalar dependências

```bash
npm install
```

### Executar

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Testes

```bash
npm test
```

### Lint e typecheck

```bash
npm run lint
npm run typecheck
```

### Cobertura

```bash
npm run test:coverage
```

---

## 📝 Changelog

O histórico de versões e alterações do projeto é mantido em [`CHANGELOG.md`](./CHANGELOG.md), gerado automaticamente a partir dos commits seguindo a convenção [Conventional Commits](https://www.conventionalcommits.org/pt-br/). Consulte [`docs/RELEASE_FLOW.md`](./docs/RELEASE_FLOW.md) para o detalhamento do fluxo de releases.

---

## 🎯 Objetivos

- Aplicação **Offline First**
- Arquitetura organizada por responsabilidades
- Código simples e escalável
- Experiência semelhante a um aplicativo nativo

---

## 📋 Roadmap

### Bootstrap

- [x] React + Vite
- [x] HeroUI
- [x] Tailwind CSS
- [x] Estrutura da arquitetura
- [x] PWA
- [x] Dexie

### MVP

- [x] Cadastro de miniaturas
- [x] Listagem
- [ ] Pesquisa
- [ ] Favoritos
- [x] Imagens

### Futuro

- [ ] Múltiplas coleções
- [ ] Backup
- [ ] Sincronização
- [ ] Suporte a múltiplos tipos de coleção

### Infraestrutura

- [x] Persistência local com Dexie
- [ ] Sincronização opcional com Supabase

---

## 📄 Licença

Este projeto está licenciado sob a [licença MIT](./LICENSE).

Copyright ©️ 2026 - ShelfBox
