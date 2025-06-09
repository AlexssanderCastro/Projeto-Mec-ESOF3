import { Usuario } from "../dominio/usuario";
import { UsuarioDAO } from "../DAO/UsuarioDAO";

export class UsuarioBO {
    private usuarioDAO: UsuarioDAO;
  
    constructor() {
      this.usuarioDAO = new UsuarioDAO();
    }
  
    public async buscarPorLogin(login:string): Promise<boolean> {
      return this.usuarioDAO.buscarPorLogin(login);
    }

    public async buscarPorLoginSenha(login:string,senha:string): Promise<Usuario | null> {
      return this.usuarioDAO.buscarPorLoginSenha(login, senha);
    }

    public async atualizar(usuario: Usuario): Promise<boolean> {
  
      const resultado = await this.usuarioDAO.atualizar(usuario);
      return resultado;
    }

    
    // Valida o cadastro do usuário
    public async cadastrar(usuario: Usuario): Promise<boolean> {
  
      const resultado = await this.usuarioDAO.cadastrar(usuario);
      return resultado;
    }
  }