# Regras de Contexto de Implementação

## Estrutura de Diretórios

```
.ai/
├── RULES.md                    # Este arquivo — regras de contexto
└── workdir/
    ├── context.md              # Índice de todos os contextos
    └── <projeto>/              # Subdiretório por projeto/funcionalidade
        └── context.md          # Contexto detalhado da implementação
```

## Regras

### 1. Criar Contexto Após Implementação

Após concluir uma implementação ou mudança significativa, consolidar o contexto em `.ai/workdir/<projeto>/context.md`.

### 2. Estrutura do Contexto Detalhado

Cada contexto deve conter:

```markdown
# Contexto de Implementação — <Nome do Projeto>

## Visão Geral
Breve descrição do que foi implementado.

## Mudanças Realizadas
### <Seção da Mudança>
**Arquivos:**
- `caminho/do/arquivo.tsx`

**Mudanças:**
- Descrição da mudança

## Padrão Visual/Estabelecido (se aplicável)
Descrição do padrão seguido.

## Commits
- `<hash>` — `<mensagem do commit>`

## Validações
- ✅ TypeScript
- ✅ ESLint
- ✅ Build
- ✅ Testes
```

### 3. Atualizar o Índice

Após criar um novo contexto, atualizar `.ai/workdir/context.md` com:

```markdown
## <Nome do Projeto>

**Contexto:** `.ai/workdir/<projeto>/context.md`

**Resumo:** Uma linha descrevendo a implementação.

**Data:** DD/MM/AAAA
```

### 4. Commits

- Commits devem seguir o padrão Conventional Commits
- O husky executa validações automaticamente (lint-staged)
- Se as validações forem puladas, executá-las manualmente antes do commit

### 5. Nomenclatura

- Subdiretórios em `.ai/workdir/` devem usar kebab-case
- Nomes devem refletir o projeto ou funcionalidade (ex: `shelfbox-ui`, `auth-flow`)
