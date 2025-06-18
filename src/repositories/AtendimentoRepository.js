
const db = require('../models/ConnectDatabase');

class AtendimentoRepository{

  async findAll(){
       const rows = await db.query(`SELECT * from atendimentos`)
       return rows;
  }
  async findById(id){
      const [row] = await db.query(`SELECT * FROM atendimentos WHERE id = ? 
        `,
      [id]
    )
       return row;
  }

  async create({paciente_id, profissional_id, data_atendimento, diagnostico}) {
      const result = await db.query(`insert into atendimentos (paciente_id, profissional_id, data_atendimento, diagnostico) values (?, ?,?,?)`,
      [paciente_id, profissional_id, data_atendimento, diagnostico])

      const insertedId = result.insertId
      return {
        id: insertedId,
        paciente_id,
        profissional_id,
        data_atendimento,
        diagnostico
        }
    }

  async update(id, {nome, cpf, data_nascimento,	telefone, email, endereco}){
      const result = await db.query(`UPDATE atendimentos SET nome = ?,cpf = ?, data_nascimento = ?, telefone = ?, email = ?, endereco = ?  where id = ?`,
      [nome, cpf, data_nascimento,	telefone, email, endereco, id])

      return result;
  }

  async delete(id){
     const deleteItem = await db.query(`DELETE FROM pacientes WHERE id = ? 
      `,
      [id]
    )
       return deleteItem;
  }


}

module.exports = new AtendimentoRepository();