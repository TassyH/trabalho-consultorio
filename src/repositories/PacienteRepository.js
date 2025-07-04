
const db = require('../models/ConnectDatabase');

class PacienteRepository{

  async findAll(){
       const rows = await db.query(`SELECT * from pacientes`)
       return rows;
  }
  async findById(id){
      const [row] = await db.query(`SELECT * FROM pacientes WHERE id = ? 
        `,
      [id]
    )
       return row;
  }

  async findByNome(nome){
        const [row] = await db.query(`SELECT * FROM pacientes WHERE nome = ?`,
        [nome]
      )
         return row;
    }

  async findByCpf(cpf) {
    const [rows] = await db.query('SELECT * FROM pacientes WHERE cpf = ?', [cpf])
    return rows[0] || null
  }


  async create({nome, cpf, data_nascimento, telefone, email, endereco}) {
      const result = await db.query(`insert into pacientes (nome, cpf, data_nascimento,	telefone, email, endereco) values (?, ?,?,?,?,?)`,
      [nome, cpf, data_nascimento,	telefone, email, endereco])

      const insertedId = result.insertId
      return {
        id: insertedId,
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        endereco
        }
    }

  async update(id, {nome, cpf, data_nascimento,	telefone, email, endereco}){
      const result = await db.query(`UPDATE pacientes SET nome = ?,cpf = ?, data_nascimento = ?, telefone = ?, email = ?, endereco = ?  where id = ?`,
      [nome, cpf, data_nascimento,	telefone, email, endereco, id])

      return result;
  }

  async delete(id){
     const deleteItem = await db.query(`DELETE FROM pacientes WHERE id = ?`,
      [id]
    )
       return deleteItem;
  }


}

module.exports = new PacienteRepository();