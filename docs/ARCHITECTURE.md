# Arquitetura

## Filosofia

ShelfBox utiliza uma arquitetura em camadas inspirada em DDD e Clean Architecture.

O objetivo é manter o domínio independente da interface e da tecnologia de persistência, permitindo que a aplicação evolua sem grandes refatorações.

---

# Camadas

app/

Responsável pela inicialização da aplicação.

- Providers
- Configurações
- Bootstrap
- Rotas
- Composition Root (injeção de dependências)

↓

ui/

Responsável pela interface.

- Pages
- Components
- Layouts
- Hooks
- Icons

↓

domain/

Representa o negócio.

- Entidades
- Modelos
- Contratos (Repositories)
- Use Cases
- Value Objects
- Serviços (portas)

↓

infrastructure/

Implementa os contratos do domínio.

- Dexie (IndexedDB)
- Repositories (implementações Dexie)
- Supabase (futuro)
- Firebase (futuro)

---

# Dependências

```
app
    ↓
ui
    ↓
domain
    ↑
infrastructure
```

# Regras

## Domain

- Não depende de React.
- Não depende de HeroUI.
- Não depende de IndexedDB.
- Não conhece infraestrutura.

## UI

- Nunca acessa o banco diretamente.
- Sempre utiliza um Repository (via hooks ou use cases).

## Infrastructure

- Implementa contratos definidos pelo Domain.

## Styles

- Contém o CSS global e configurações do Tailwind.
- Não contém regras de negócio.

# Diagrama de uso
```
UI
 │
 ▼
Use Case
 │
 ▼
Repository (Interface)
 │
 ▼
Repository (Dexie)
 │
 ▼
IndexedDB
```
