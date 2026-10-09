# Contexto de Implementação — ShelfBox UI

## Visão Geral

Consolidação das mudanças visuais aplicadas nas telas de detalhes, criação e edição do ShelfBox, um app de coleção de miniaturas.

## Mudanças Realizadas

### 1. Telas de Detalhes (`MiniatureDetailsPage`, `CollectionDetailsPage`)

**Arquivos:**
- `src/ui/pages/MiniatureDetailsPage.tsx`
- `src/ui/pages/CollectionDetailsPage.tsx`
- `src/ui/components/shelfBoxImage.tsx`

**Mudanças:**
- Layout responsivo com grid de duas colunas (`md:grid-cols-2`)
- Imagem em destaque com container `bg-surface-secondary` e `aspect-square`
- Títulos com hierarquia visual (label pequeno `text-accent` + título grande)
- Informações agrupadas em card com borda e sombra
- Loading/error em cards estilizados com `role="status"` e `role="alert"`
- `ShelfBoxImage` atualizado para aceitar `className` customizado
- FAB posicionado fora do `main`

### 2. Telas de Criação (`CreateCollectionPage`, `CreateMiniaturePage`)

**Arquivos:**
- `src/ui/pages/CreateCollectionPage.tsx`
- `src/ui/pages/CreateMiniaturePage.tsx`

**Mudanças:**
- Mesmo padrão visual das telas de details (grid, imagem responsiva)
- Formulário sem card wrapper (inputs soltos)
- Título no PageHeader: "Nova coleção" / "Nova miniatura"
- FAB fora do `main`

### 3. Telas de Edição (`CollectionEditPage`, `MiniatureEditPage`)

**Arquivos:**
- `src/ui/pages/CollectionEditPage.tsx`
- `src/ui/pages/MiniatureEditPage.tsx`

**Mudanças:**
- Mesmo padrão visual das telas de details (grid, imagem responsiva)
- Formulário sem card wrapper (inputs soltos)
- Título no PageHeader: "Editar coleção" / "Editar miniatura"
- Loading/error em cards estilizados
- FAB fora do `main`

## Padrão Visual Estabelecido

### Estrutura Base
```tsx
<main className="mx-auto w-full max-w-4xl pb-28 pt-4 sm:pt-8">
  <section className="grid items-start gap-6 md:grid-cols-2 md:gap-10">
    {/* Imagem */}
    <div className="rounded-3xl bg-surface-secondary p-3 shadow-sm sm:p-5">
      <Card className="relative aspect-square w-full ...">
        <img ... />
      </Card>
    </div>

    {/* Conteúdo */}
    <div className="min-w-0 flex flex-col gap-4 md:py-4">
      {/* Detalhes: card com borda */}
      {/* Criação/Edição: inputs soltos */}
    </div>
  </section>
</main>
```

### Classes Utilitárias Consistentes
- **Container principal:** `mx-auto w-full max-w-4xl pb-28 pt-4 sm:pt-8`
- **Grid responsivo:** `grid items-start gap-6 md:grid-cols-2 md:gap-10`
- **Imagem:** `rounded-3xl bg-surface-secondary p-3 shadow-sm sm:p-5`
- **Card de detalhes:** `rounded-3xl border border-foreground/10 bg-surface p-5 shadow-sm sm:p-6`
- **Loading/Error:** `rounded-2xl bg-surface p-6 text-center text-muted` / `text-danger`

## Commits

1. `afd59c0` — fix: update the style of details pages
2. `c77a082` — fix: update the style of create and edit pages
3. `57a0926` — fix: simplify create and edit pages layout

## Validações

- ✅ TypeScript (`npm run typecheck`)
- ✅ ESLint (`npx eslint`)
- ✅ Build (`npm run build`)
- ✅ Testes (`npm test` — 84 testes passaram)
