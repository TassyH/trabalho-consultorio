const mysql = require("mysql2/promise");

const client = mysql.createPool({
  host: "45.132.157.52",
  port: 3306,
  user: "u864744069_tassy",
  password: "Tassy692416+",
  database: "u864744069_jpa_exemplo",
});

const testConnection = async () => {
  try {
    const connection = await client.getConnection();
    console.log("MySQL conectado com sucesso!");
    connection.release();
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    throw error;
  }
};

exports.query = async (_query, values) => {
  try {
    const [rows, fields] = await client.execute(_query, values);
    return rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
};

exports.testConnection = testConnection;
