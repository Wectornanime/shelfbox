# Contribuindo com o ShelfBox

Obrigado por contribuir! Este documento descreve o fluxo de desenvolvimento do projeto.

---

## Configuração do ambiente

Requisitos: Node.js `24.18.0` (ver `engines` no `package.json`).

```bash
npm install
npm run dev
```

## Branches

- `main` — código oficialmente lançado (versões estáveis).
- `dev` — estado atual de desenvolvimento (versões `*-dev.N`).
- `feature/<nome>` — novas funcionalidades.
- `fix/<nome>` — correções de bugs.
- `refactor/<nome>`, `chore/<nome>`, `docs/<nome>`, `test/<nome>` — demais tipos de alteração.

> O hook `pre-push` do Husky bloqueia pushes a partir de branches fora desse padrão.

Sempre crie sua branch a partir de `dev`:

```bash
git checkout dev
git pull
git checkout -b feature/minha-funcionalidade
```

## Convenção de commits

O projeto usa [Conventional Commits](https://www.conventionalcommits.org/pt-br/), validados pelo hook `commit-msg` do Husky:

| Prefixo | Uso |
| ------- | --- |
| `feat:` | Nova funcionalidade |
| `fix:` | Correção de bug |
| `docs:` | Documentação |
| `test:` | Testes |
| `chore:` | Tarefas gerais |
| `refactor:` | Refatoração |
| `perf:` | Melhoria de performance |
| `ci:` | Pipeline/CI |

Exemplos:

```text
feat: adds miniature search
fix(domain): normalize repository filename casing
```

## Antes de abrir o PR

O Husky roda `lint-staged` (ESLint) no commit e `typecheck` + testes no push. Verifique localmente:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Pull Request

1. Abra o PR da sua branch para `dev`.
2. O CI (`.github/workflows/ci.yml`) roda testes, typecheck, lint e build.
3. Após aprovação, integre com **Squash and Merge**.

O merge em `dev` dispara o `release-prepare.yml`, que recalcula a versão de desenvolvimento (`0.2.0-dev.N`) e a atualiza no `package.json`/`package-lock.json`.

## Release

Quando o estado de `dev` estiver pronto para produção:

1. Abra um PR de `dev` para `main`.
2. Após o merge, o `release.yml` consolida a versão estável, gera o `CHANGELOG.md`, cria a tag `vX.Y.Z` e a GitHub Release.

Detalhes em [`docs/RELEASE_FLOW.md`](./docs/RELEASE_FLOW.md).

## Arquitetura

Antes de escrever código, leia [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md). Regras importantes:

- O `domain/` não depende de React, HeroUI ou IndexedDB.
- A `ui/` nunca acessa o banco diretamente — sempre via repositories/use cases.
- A `infrastructure/` implementa os contratos definidos no `domain/`.
