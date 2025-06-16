import { Usuario } from "../dominio/usuario";
import { UsuarioDAO } from "../DAO/UsuarioDAO";

export class UsuarioBO {
  private usuarioDAO: UsuarioDAO;

  constructor() {
    this.usuarioDAO = new UsuarioDAO();
  }

  public async buscarPorLogin(login: string): Promise<boolean> {
    return this.usuarioDAO.buscarPorLogin(login);
  }

  public async buscarPorLoginSenha(login: string, senha: string): Promise<Usuario | null> {
    return this.usuarioDAO.buscarPorLoginSenha(login, senha);
  }

  public async atualizar(usuario: Usuario): Promise<boolean> {

    const resultado = await this.usuarioDAO.atualizar(usuario);
    return resultado;
  }

  public async editar(usuario: Usuario): Promise<boolean> {

    const resultado = await this.usuarioDAO.editar(usuario);
    return resultado;
  }

  public async trocarSenha(usuario: Usuario): Promise<boolean> {
    try {
      //   // Hash da nova senha
      //   const senhaCriptografada = await bcrypt.hash(usuario.senha, 10);

      //   // Atualiza o objeto com a senha criptografada
      //   usuario.senha = senhaCriptografada;

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

    const resultado = await this.usuarioDAO.cadastrar(usuario);
    return resultado;
  }
}