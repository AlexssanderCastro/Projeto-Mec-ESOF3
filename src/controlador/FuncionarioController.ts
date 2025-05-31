import { Request, Response } from 'express';
import {FuncionarioBO} from '../modelo/BO/FuncionarioBO';
import {Usuario} from '../modelo/dominio/usuario';
import {Funcionario} from '../modelo/dominio/funcionario';
import {UsuarioBO} from '../modelo/BO/UsuarioBO';

class FuncionarioController {
  
  public async cadastrar(req: Request, res: Response) {
    try {
      const {
        nome,
        cpf,
        data_nascimento,
        cargo,
        salario,
        email,
        telefone,
        endereco,
        login,
        senha,
        perfil
      } = req.body;

      const funcionarioBO = new FuncionarioBO();
      const usuarioBO = new UsuarioBO();

      const cpfExistente = await funcionarioBO.buscarPorCpf(cpf);
      if(cpfExistente){
         res.status(401).json({mensagem:'Já tem um funcionário com esse CPF cadastrado'});
      }
      const LoginExiste = await usuarioBO.buscarPorLogin(login);
      if(LoginExiste){
        res.status(401).json({mensagem:'Login existente'});
      }

      
      // 1. Criar usuário
      const usuario = new Usuario(1,login,senha,perfil);
       

      
      const foiCriado = await usuarioBO.cadastrar(usuario);
      if(!foiCriado){
        res.status(400).json({mensagem:'Erro ao cadastrar funcionário.'});
      }


      const funcionario = new Funcionario(1,usuario,nome,cpf,new Date(data_nascimento),cargo,salario,email,endereco,telefone);
      
      
      const inseriu=await funcionarioBO.inserir(funcionario);
      if(!inseriu){
         res.status(400).json({mensagem:'Erro ao cadastrar funcionário.'});
      }

      res.status(201).json({ mensagem: 'Cadastro realizado com sucesso!' });
    } catch (erro) {
      console.error(erro);
      res.status(400).send({mensagem:'Erro ao cadastrar funcionário.'});
    }
  }
}

export default new FuncionarioController();
