# CRUD API com Node.js e Neo4j

## 📝 Descrição

API simples para gerenciamento de pessoas em banco de dados Neo4j, implementando operações básicas CRUD (Create, Read, Update, Delete).

## ⚙️ Funcionalidades

### ➕ Criar Pessoa

`POST /pessoas`

- Cadastra nova pessoa com nome e idade
- Exemplo: `{"nome": "Maria", "idade": 25}`

### 🔍 Consultar Pessoas

`GET /pessoas`

- Lista todas as pessoas cadastradas

`GET /pessoas/:nome`

- Busca pessoa específica pelo nome

### ✏️ Atualizar Pessoa

`PUT /pessoas/:nome`

- Atualiza dados de uma pessoa existente
- Exemplo: `{"idade": 26}` (atualiza idade)

### ❌ Remover Pessoa

`DELETE /pessoas/:nome`

- Deleta registro de uma pessoa

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Iniciar servidor
node neo4j-crud.js
```
