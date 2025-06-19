const PacienteRepository = require('../repositories/PacienteRepository');

class PacienteController{

  async index (request, response){
    //Listar todos os registros
    const paciente = await PacienteRepository.findAll();
    response.json(paciente);
  }

  async show(request, response){
    const {id} = request.params;
    const paciente = await PacienteRepository.findById(id);

     if(!paciente){
        return response.status(404).json({error: "paciente noa encontrado"});
        }
     response.json(paciente);
  
  }

  async store(request, response){
      //Criar um novo registro
        const {nome, cpf, data_nascimento, telefone, email, endereco} = request.body;
  
        if(!nome || !cpf || !data_nascimento ){
          return response.status(403).json({error: "O nome, cpf e ano de dascimento precisa ser informado"})
        }
        const paciente = await PacienteRepository.create({nome, cpf, data_nascimento, telefone, email, endereco});
        response.status(201).json(paciente);

    }

  async update(request, response){
    //Atualizar um registro
      //Atualizar um registro
     const {id} = request.params;
     const {nome, cpf, data_nascimento, telefone, email, endereco} = request.body;

     const pac = await PacienteRepository.findById(id);
     if(!pac){
      return response.status(404).json({error: "contato nao encontrado"})
     }

     if(nome){
        const pacienteByNome = await PacienteRepository.findByNome(nome);

        if(pacienteByNome){
          return response.status(400).json({error: "esse nome ja está sendo usado"});
        }
      }

        await PacienteRepository.update(id, {
        nome: nome ?? pac.nome,
        cpf: cpf ?? pac.cpf,
        data_nascimento: data_nascimento ?? pac.data_nascimento,
        telefone: telefone ?? pac.telefone,
        email: email ?? pac.email,
        endereco: endereco ?? pac.endereco
      })

      const upDatePac = await PacienteRepository.findById(id)
      response.status(200).json(upDatePac);

  }

  async delete(request, response){
    //Deletar um registro
      const {id} = request.params;

      if(!id){
        return response.status(400).json({message: "id do paciente invalido"})
      }

      await PacienteRepository.delete(id);
      response.status(204).json({message: "excluido com sucesso"});
  }

}

module.exports = new PacienteController();