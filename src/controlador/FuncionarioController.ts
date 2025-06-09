import { Request, Response } from 'express';
import { FuncionarioBO } from '../modelo/BO/FuncionarioBO';
import { Usuario } from '../modelo/dominio/usuario';
import { Funcionario } from '../modelo/dominio/funcionario';
import { UsuarioBO } from '../modelo/BO/UsuarioBO';

export class FuncionarioController {

  private funcionarioBO: FuncionarioBO;
  private usuarioBO: UsuarioBO;

  constructor() {
    this.funcionarioBO = new FuncionarioBO();
    this.usuarioBO = new UsuarioBO();
  }



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



      const cpfExistente = await this.funcionarioBO.buscarPorCpf(cpf);
      if (cpfExistente) {
        res.status(401).json({ mensagem: 'Já tem um funcionário com esse CPF cadastrado' });
      }
      const LoginExiste = await this.usuarioBO.buscarPorLogin(login);
      if (LoginExiste) {
        res.status(401).json({ mensagem: 'Login existente' });
      }


      // 1. Criar usuário
      const usuario = new Usuario(1, login, senha, perfil);



      const foiCriado = await this.usuarioBO.cadastrar(usuario);
      if (!foiCriado) {
        res.status(400).json({ mensagem: 'Erro ao cadastrar funcionário.' });
      }


      const funcionario = new Funcionario(1, usuario, nome, cpf, new Date(data_nascimento), cargo, salario, email, endereco, telefone);


      const inseriu = await this.funcionarioBO.inserir(funcionario);
      if (!inseriu) {
        res.status(400).json({ mensagem: 'Erro ao cadastrar funcionário.' });
      }

      res.status(201).json({ mensagem: 'Cadastro realizado com sucesso!' });
    } catch (erro) {
      console.error(erro);
      res.status(400).send({ mensagem: 'Erro ao cadastrar funcionário.' });
    }
  }


  public async listar(req: Request, res: Response): Promise<void> {

    try {
      const funcionarios = await this.funcionarioBO.listar();
      res.json(funcionarios);

    } catch (error) {
      console.error("Erro ao listar funcionários:", error);
      res.status(500).send("Erro ao buscar funcionários.");
    }
  }


  async buscarPorId(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const funcionario = await this.funcionarioBO.buscarPorId(id);

      if (!funcionario) {
        res.status(404).json({ mensagem: 'Funcionário não encontrado' });
      } else {
        res.json(funcionario);
      }
    } catch (error) {
      console.error('Erro ao buscar funcionário por ID:', error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }


  public async editar(req: Request, res: Response) {
    try {
      const {
        id,
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

      const funcionarioExistente = await this.funcionarioBO.buscarPorId(Number(id));
      if (!funcionarioExistente) {
        return res.status(404).json({ mensagem: 'Funcionário não encontrado.' });
      }


      // Atualiza dados do usuário (você pode adaptar a lógica para verificar se login já está em uso por outro)
      const usuario = new Usuario(
        funcionarioExistente.usuario.id,
        login,
        senha,
        perfil
      );

      const atualizouUsuario = await this.usuarioBO.atualizar(usuario);
      if (!atualizouUsuario) {
        return res.status(400).json({ mensagem: 'Erro ao atualizar usuário.' });
      }

      const funcionario = new Funcionario(
        Number(id),
        usuario,
        nome,
        cpf,
        new Date(data_nascimento),
        cargo,
        parseFloat(salario),
        email,
        endereco,
        telefone
      );

      const atualizouFuncionario = await this.funcionarioBO.atualizar(funcionario);
      if (!atualizouFuncionario) {
        return res.status(400).json({ mensagem: 'Erro ao atualizar funcionário.' });
      }

      res.status(200).json({ mensagem: 'Funcionário atualizado com sucesso!' });

    } catch (erro) {
      console.error(erro);
      res.status(500).json({ mensagem: 'Erro interno ao editar funcionário.' });
    }
  }



  public async excluir(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const sucesso = await this.funcionarioBO.excluir(id);

      if (sucesso) {
        res.status(200).json({ mensagem: "Funcionário excluído com sucesso!" });
      } else {
        res.status(400).json({ mensagem: "Erro ao excluir funcionário." });
      }
    } catch (erro) {
      console.error("Erro ao excluir funcionário:", erro);
      res.status(500).json({ mensagem: "Erro interno no servidor." });
    }
  }





}


