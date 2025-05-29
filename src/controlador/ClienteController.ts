import { Request, Response } from 'express';
import { ClienteBO } from '../modelo/BO/ClienteBO';
import { UsuarioBO } from '../modelo/BO/UsuarioBO';
import { Cliente } from '../modelo/dominio/cliente';
import { Usuario } from '../modelo/dominio/usuario';

export class ClienteController {
  private clienteBO: ClienteBO;
  private usuarioBO: UsuarioBO;

  constructor() {
    this.clienteBO = new ClienteBO();
    this.usuarioBO = new UsuarioBO();
  }

  public async cadastrarCliente(req: Request, res: Response): Promise<void> {
    try {
      const {
        nome,
        data_nascimento,
        telefone,
        endereco,
        cpf,
        email,
        login,
        senha
      } = req.body;

      const usuarioExistente = await this.usuarioBO.buscarPorLogin(login);
      const cpfExistente = await this.clienteBO.buscarPorCPF(cpf);
      const emailExistente = await this.clienteBO.buscarPorEmail(email);

      if (usuarioExistente) {
        res.status(400).json({ mensagem: 'Login já está em uso.' });
        return;
      }

      if (cpfExistente) {
        res.status(400).json({ mensagem: 'CPF já cadastrado.' });
        return;
      }

      if (emailExistente) {
        res.status(400).json({ mensagem: 'E-mail já está em uso.' });
        return;
      }

      const novoUsuario = new Usuario(
        Math.floor(Math.random() * 1000),
        login,
        senha,
        'cliente'
      );

      const novoCliente = new Cliente(
        Math.floor(Math.random() * 1000),
        novoUsuario,
        nome,
        new Date(data_nascimento),
        cpf,
        email,
        telefone
      );

      novoCliente.endereco = endereco || null;

      const resultadoUsuario = await this.usuarioBO.cadastrar(novoUsuario);
      const resultadoCliente = await this.clienteBO.cadastrar(novoCliente);

      if (resultadoUsuario && resultadoCliente) {
        res.status(201).json({ mensagem: 'Cadastro realizado com sucesso!' });
      } else {
        res.status(500).send('Erro ao cadastrar cliente.');
      }

    } catch (err) {
      console.error('Erro no cadastro:', err);
      res.status(500).send('Erro interno no servidor.');
    }
  }

  public async obterClienteLogado(req: Request, res: Response): Promise<void> {
    try {
      if (!req.session.usuario) {
        res.status(401).json({ erro: 'Usuário não autenticado.' });
        return;
      }

      const usuario = new Usuario(
        req.session.usuario.id,
        req.session.usuario.login,
        '',
        req.session.usuario.perfil
      );

      const cliente = await this.clienteBO.buscarPorUsuario(usuario);

      if (!cliente) {
        res.status(404).json({ erro: 'Cliente não encontrado.' });
        return;
      }

      res.json({ nome: cliente.nome });
    } catch (error) {
      console.error('Erro ao buscar cliente logado:', error);
      res.status(500).json({ erro: 'Erro interno no servidor.' });
    }
  }
  
}
