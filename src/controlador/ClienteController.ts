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
        telefone,
        endereco
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

  //

  public async editarCliente(req: Request, res: Response): Promise<void> {
    const usuarioLogado = req.session.usuario;

    if (!usuarioLogado) {
      throw new Error("Usuário não está logado.");
    }

    const usuarioLogadoParaBusca = new Usuario(usuarioLogado.id, usuarioLogado.login, '', usuarioLogado.perfil)

    const clienteAtual = await this.clienteBO.buscarPorUsuario(usuarioLogadoParaBusca)

    if (!clienteAtual) {
      res.status(404).json({ mensagem: 'Cliente não encontrado.' });
      return;
    }

    try {
      const {
        id,
        nome,
        data_nascimento,
        telefone,
        endereco,
        cpf,
        email,
        login,
      } = req.body;



      // Verifica se o login foi alterado
      if (login !== clienteAtual.usuario.login) {
        const usuarioExistente = await this.usuarioBO.buscarPorLogin(login);
        if (usuarioExistente) {
          res.status(400).json({ mensagem: 'Login já está em uso.' });
          return;
        }
      }

      // Verifica se o CPF foi alterado
      if (cpf !== clienteAtual.cpf) {
        const cpfExistente = await this.clienteBO.buscarPorCPF(cpf);
        if (cpfExistente) {
          res.status(400).json({ mensagem: 'CPF já cadastrado.' });
          return;
        }
      }

      // Verifica se o email foi alterado
      if (email !== clienteAtual.email) {
        const emailExistente = await this.clienteBO.buscarPorEmail(email);
        if (emailExistente) {
          res.status(400).json({ mensagem: 'E-mail já está em uso.' });
          return;
        }
      }

      const novoUsuario = new Usuario(
        usuarioLogado.id,
        login,
        '',
        'cliente'
      );

      const novoCliente = new Cliente(
        id,
        novoUsuario,
        nome,
        new Date(data_nascimento),
        cpf,
        email,
        telefone,
        endereco
      );

      novoCliente.endereco = endereco || null;


      const resultadoUsuario = await this.usuarioBO.editar(novoUsuario);
      const resultadoCliente = await this.clienteBO.editar(novoCliente);
      console.log(resultadoCliente);
      if (resultadoUsuario && resultadoCliente) {
        res.status(200).json({ sucesso: true, mensagem: 'Perfil atualizado com sucesso!' });
      } else {
        res.status(500).send('Erro ao cadastrar cliente.');
      }

    } catch (err) {
      console.error('Erro no cadastro:', err);
      res.status(500).send('Erro interno no servidor.');
    }
  }

  //

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


  public async buscarClienteLogado(req: Request, res: Response): Promise<void> {
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

      res.json({ cliente });
    } catch (error) {
      console.error('Erro ao buscar cliente logado:', error);
      res.status(500).json({ erro: 'Erro interno no servidor.' });
    }
  }

  public async buscarClientes(req: Request, res: Response): Promise<void> {
    try {
      const clientes = await this.clienteBO.buscarClientes();

      const clientesSimples = clientes.map(c => ({
        id: c.id,
        nome: c.nome,
        cpf: c.cpf,
      }));

      res.status(200).json(clientesSimples);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao buscar clientes' });
    }
  }

  public async trocarSenha(req: Request, res: Response): Promise<void> {

    try {
      const usuarioLogado = req.session.usuario;
      if (!usuarioLogado) {
        res.status(401).json({ mensagem: "Usuário não autenticado." });
        return;
      }

      const { senhaAntiga, novaSenha } = req.body;

      if (!senhaAntiga || !novaSenha) {
        res.status(400).json({ mensagem: "Senha antiga e nova são obrigatórias." });
        return;
      }

      const usuario = await this.usuarioBO.buscarPorLoginSenha(usuarioLogado.login, senhaAntiga);

      if (!usuario) {
        res.status(400).json({ mensagem: "Senha informada incorreta." });
        return;
      }

      const novoUsuario = new Usuario(usuarioLogado.id, usuarioLogado.login, novaSenha, 'cliente');

      // Chama o BO para trocar a senha, passando usuário logado e as senhas
      const trocaRealizada = await this.usuarioBO.trocarSenha(novoUsuario);

      if (trocaRealizada) {
        res.json({ sucesso: true, mensagem: "Senha alterada com sucesso." });
      } else {
        res.status(400).json({ sucesso: false, mensagem: "Senha antiga incorreta." });
      }

    } catch (error) {
      console.error("Erro ao trocar senha:", error);
      res.status(500).json({ mensagem: "Erro ao trocar senha." });
    }
  }

  public async buscarTodosClientes(req: Request, res: Response): Promise<void> {

    try {
      const usuarioLogado = req.session.usuario;

      if (!usuarioLogado) {
        res.status(401).json({ mensagem: "Usuário não autenticado." });
        return;
      }

      if (usuarioLogado.perfil !== 'gerente' && usuarioLogado.perfil !== 'funcionario') {
        res.status(403).json({ mensagem: "Acesso não autorizado." });
        return;
      }

      const listaClientes: Cliente[] = await this.clienteBO.buscarTodosClientes();

      res.json({
        sucesso: true,
        clientes: listaClientes
      });

    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      res.status(500).json({ mensagem: "Erro ao buscar clientes." });
    }

  }

  




}
