import { Usuario } from "../dominio/usuario";
import { UsuarioDAO } from "../DAO/UsuarioDAO";
import bcrypt from 'bcrypt';

export class UsuarioBO {
  private usuarioDAO: UsuarioDAO;

  constructor() {
    this.usuarioDAO = new UsuarioDAO();
  }

  public async buscarPorLogin(login: string): Promise<boolean> {
    return this.usuarioDAO.buscarPorLogin(login);
  }

  public async buscarPorLoginSenha(login: string, senha: string): Promise<Usuario | null> {
    const usuario = await this.usuarioDAO.buscarPorLoginSenha(login); // buscar apenas pelo login
    
    if (!usuario) {
      return null;
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha); // compara a senha digitada com o hash salvo
    
    if (!senhaCorreta) {
      return null;
    }

    return usuario;
  }

  public async atualizar(usuario: Usuario): Promise<boolean> {
    usuario.senha = await bcrypt.hash(usuario.senha, 10);
    const resultado = await this.usuarioDAO.atualizar(usuario);
    return resultado;
  }

  public async editar(usuario: Usuario): Promise<boolean> {

    const resultado = await this.usuarioDAO.editar(usuario);
    return resultado;
  }

  public async trocarSenha(usuario: Usuario): Promise<boolean> {
    try {
      // Hash da nova senha
      const senhaCriptografada = await bcrypt.hash(usuario.senha, 10);

      // Atualiza o objeto com a senha criptografada
      usuario.senha = senhaCriptografada;

      // Chama o DAO para atualizar a senha
      const atualizado = await this.usuarioDAO.trocarSenha(usuario);

      return atualizado;
    } catch (error) {
      console.error("Erro no ClienteBO ao trocar senha:", error);
      return false;
    }
  }


  // Valida o cadastro do usuário
  public async cadastrar(usuario: Usuario): Promise<boolean> {

    const hash = await bcrypt.hash(usuario.senha, 10);
    usuario.senha = hash;

    const resultado = await this.usuarioDAO.cadastrar(usuario);
    return resultado;
  }
}