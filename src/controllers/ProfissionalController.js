const ProfissionalRepository = require('../repositories/ProfissionalRepository');

class PacienteController{

  async index (request, response){
    //Listar todos os registros
    const prof = await ProfissionalRepository.findAll();
    response.json(prof);
  }

  async show(request, response){
    const {id} = request.params;
    const prof = await ProfissionalRepository.findById(id);

     if(!prof){
        return response.status(404).json({error: "profisisonaol noa encontrado"});
        }
     response.json(prof);
  
  }

  async store(request, response){
      //Criar um novo registro
        const {nome, crm, especialidade_id, telefone, email} = request.body;
  
        if(!nome || !crm ){
          return response.status(403).json({error: "O nome e crm precisa ser informado"})
        }
        const paciente = await ProfissionalRepository.create({nome, crm, especialidade_id, telefone, email});
        response.status(201).json(paciente);

    }

  async update(request, response){
    //Atualizar um registro
      //Atualizar um registro
     const {id} = request.params;
     const {nome, crm, especialidade_id, telefone, email} = request.body;

     const prof = await ProfissionalRepository.findById(id);
     if(!prof){
      return response.status(404).json({error: "prof nao encontrado"})
     }

     if(nome){
        const profByNome = await ProfissionalRepository.findByNome(nome);

        if(profByNome){
          return response.status(400).json({error: "esse nome ja está sendo usado"});
        }
      }

        await ProfissionalRepository.update(id, {
        nome: nome ?? prof.nome,
        crm: crm ?? prof.crm,
        especialidade_id: especialidade_id ?? prof.especialidade_id,
        telefone: telefone ?? prof.telefone,
        email: email ?? prof.email,
      })

      const upDatePac = await ProfissionalRepository.findById(id)
      response.status(200).json(upDatePac);

  }

async delete(req, res) {
  try {
    await ProfissionalRepository.delete(req.params.id)
    res.sendStatus(204)
  } catch (error) {
    if (error.code === 'ER_ROW_IS_REFERENCED_2' || error.code === 'ER_ROW_IS_REFERENCED') {
      return res.status(400).json({
        error: 'Este profissional possui atendimentos vinculados e não pode ser excluído.'
      })
    }

    console.error('Erro ao excluir profissional:', error)
    res.status(500).json({ error: 'Erro interno no servidor.' })
  }
}



}

module.exports = new PacienteController();