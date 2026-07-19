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

↓

ui/

Responsável pela interface.

- Pages
- Components
- Layouts

↓

domain/

Representa o negócio.

- Entidades
- Contratos
- Value Objects

↓

infrastructure/

Implementa os contratos do domínio.

- Dexie
- Supabase
- Firebase

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
- Sempre utiliza um Repository.

## Infrastructure

- Implementa contratos definidos pelo Domain.

## Shared

- Contém código reutilizável.
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
