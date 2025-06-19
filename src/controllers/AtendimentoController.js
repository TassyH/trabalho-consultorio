const AtendimentoRepository = require('../repositories/AtendimentoRepository');

class AtendimentoController{

  async index (request, response){
    //Listar todos os registros
    const prof = await AtendimentoRepository.findAll();
    response.json(prof);
  }

  async show(request, response){
    const {id} = request.params;
    const prof = await AtendimentoRepository.findById(id);

     if(!prof){
        return response.status(404).json({error: "atendimento noa encontrado"});
        }
     response.json(prof);
  
  }

  async store(request, response){
      //Criar um novo registro
        const {paciente_id, profissional_id, data_atendimento, diagnostico} = request.body;
  
        if(!paciente_id || !profissional_id ){
          return response.status(403).json({error: "O nome e crm precisa ser informado"})
        }
        const paciente = await AtendimentoRepository.create({paciente_id, profissional_id, data_atendimento, diagnostico});
        response.status(201).json(paciente);

    }

  async update(request, response){
    //Atualizar um registro
      //Atualizar um registro
     const {id} = request.params;
     const {paciente_id, profissional_id, data_atendimento, diagnostico} = request.body;

     const atend = await AtendimentoRepository.findById(id);
     if(!atend){
      return response.status(404).json({error: "prof nao encontrado"})
     }

        await AtendimentoRepository.update(id, {
        paciente_id: paciente_id ?? atend.paciente_id,
        profissional_id: profissional_id ?? atend.profissional_id,
        data_atendimento: data_atendimento ?? atend.data_atendimento,
        diagnostico: diagnostico ?? atend.diagnostico,
      })

      const upDatePac = await AtendimentoRepository.findById(id)
      response.status(200).json(upDatePac);

  }

  async delete(request, response){
    //Deletar um registro
      const {id} = request.params;

      if(!id){
        return response.status(400).json({message: "id do atendimento invalido"})
      }

      await AtendimentoRepository.delete(id);
      response.status(204).json({message: "excluido com sucesso"});
  }

}

module.exports = new AtendimentoController();