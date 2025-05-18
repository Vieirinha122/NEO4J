const neo4j = require("neo4j-driver");
const express = require("express");

const app = express();
app.use(express.json());

// Configuração da conexão com o Neo4j
const driver = neo4j.driver(
  "neo4j+s://634cad1f.databases.neo4j.io",
  neo4j.auth.basic("neo4j", "PWoZ0FjiytE3hcwZXUUAJMrwrQkt6YKcwn6idauwn30")
);

// Função para executar queries
async function runQuery(query, params = {}) {
  const session = driver.session();
  try {
    const result = await session.run(query, params);
    return result.records.map((record) => record.toObject());
  } finally {
    await session.close();
  }
}

// CRUD

// CREATE - Criar um nó
app.post("/pessoas", async (req, res) => {
  const { nome, idade } = req.body;
  const query = `
    CREATE (p:Pessoa {nome: $nome, idade: $idade})
    RETURN p
  `;
  const result = await runQuery(query, { nome, idade });
  res.json(result[0]);
});

// READ - Ler todas as pessoas
app.get("/pessoas", async (req, res) => {
  const query = "MATCH (p:Pessoa) RETURN p";
  const result = await runQuery(query);
  res.json(result);
});

// READ - Ler uma pessoa específica
app.get("/pessoas/:nome", async (req, res) => {
  const query = "MATCH (p:Pessoa {nome: $nome}) RETURN p";
  const result = await runQuery(query, { nome: req.params.nome });
  res.json(result[0] || {});
});

// UPDATE - Atualizar uma pessoa
app.put("/pessoas/:nome", async (req, res) => {
  const { idade } = req.body;
  const query = `
    MATCH (p:Pessoa {nome: $nome})
    SET p.idade = $idade
    RETURN p
  `;
  const result = await runQuery(query, {
    nome: req.params.nome,
    idade,
  });
  res.json(result[0] || {});
});

// DELETE - Deletar uma pessoa
app.delete("/pessoas/:nome", async (req, res) => {
  const query = "MATCH (p:Pessoa {nome: $nome}) DELETE p";
  await runQuery(query, { nome: req.params.nome });
  res.json({ message: "Pessoa deletada com sucesso" });
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Fechar a conexão quando o app terminar
process.on("SIGINT", async () => {
  await driver.close();
  process.exit();
});
