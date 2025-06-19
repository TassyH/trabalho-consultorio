const EspecialidadeRepository = require('../repositories/EspecialidadeRepository');

class EspecialidadeController{

  async index (request, response){
    //Listar todos os registros
    const especialidade = await EspecialidadeRepository.findAll();
    response.json(especialidade);
  }

  async show(request, response){
    const {id} = request.params;
    const especialidade = await EspecialidadeRepository.findById(id);

     if(!especialidade){
        return response.status(404).json({error: "especialidade noa encontrado"});
        }
     response.json(especialidade);
  
  }

  async store(request, response){
      //Criar um novo registro
        const {descricao} = request.body;
  
        if(!descricao){
          return response.status(403).json({error: "O nome da categoria precisa ser informado"})
        }
  
       
        const especialidade = await EspecialidadeRepository.create({descricao});
  
        response.status(201).json(especialidade);
  
    }

  async update(request, response){
    //Atualizar um registro
      //Atualizar um registro
     const {id} = request.params;
     const {descricao} = request.body;

     const espec = await EspecialidadeRepository.findById(id);
     if(!espec){
      return response.status(404).json({error: "contato nao encontrado"})
     }

     if(descricao){
        const especialidadeByNome = await EspecialidadeRepository.findByName(descricao);

        if(especialidadeByNome){
          return response.status(400).json({error: "esse nome ja está sendo usado"});
        }
      }

        await CategoryRepository.update(id, {
        descricao: descricao ?? especialidade.descricao})

      const upDateCat = await EspecialidadeRepository.findById(id)
      response.status(200).json(upDateCat);

  }

  async delete(request, response){
    //Deletar um registro
      const {id} = request.params;

      if(!id){
        return response.status(400).json({message: "id de especialidade invalido"})
      }

      await EspecialidadeRepository.delete(id);
      response.status(204).json({message: "excluido com sucesso"});
  }

}

module.exports = new EspecialidadeController();