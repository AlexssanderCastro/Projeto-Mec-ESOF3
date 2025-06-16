import db from '../../config/database';  // Importando a conexão do arquivo database.ts
import { Usuario } from '../dominio/usuario';

export class UsuarioDAO {
  public async cadastrar(usuario: Usuario): Promise<boolean> {
    try {
      const result = await db.query(
        'INSERT INTO usuario (login, senha, perfil) VALUES ($1, $2, $3) RETURNING id',
        [usuario.login, usuario.senha, usuario.perfil]
      );
      usuario.id = result.rows[0].id;
      return true;
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      return false;
    }
  }

  public async atualizar(usuario: Usuario): Promise<boolean> {
    try {
      const result = await db.query(
        'UPDATE usuario SET login = $1, senha = $2, perfil = $3 WHERE id = $4',
        [usuario.login, usuario.senha, usuario.perfil, usuario.id]
      );

     return (result.rowCount ?? 0) > 0;

    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return false;
    }
  }

  public async editar(usuario: Usuario): Promise<boolean> {
    try {
      const result = await db.query(
        'UPDATE usuario SET login = $1  WHERE id = $2',
        [usuario.login, usuario.id]
      );

     return (result.rowCount ?? 0) > 0;

    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return false;
    }
  }

  public async trocarSenha(usuario: Usuario): Promise<boolean> {
    try {
      const result = await db.query(
        'UPDATE usuario SET senha = $1  WHERE id = $2',
        [usuario.senha, usuario.id]
      );

     return (result.rowCount ?? 0) > 0;

    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return false;
    }
  }


  public async buscarPorLogin(login: string): Promise<boolean> {

    const result = await db.query('SELECT * FROM usuario WHERE login = $1', [login]);
    if (result.rows.length === 0) return false;
    return true;
  }

  public async buscarPorLoginSenha(login: string, senha: string): Promise<Usuario | null> {
    const result = await db.query('SELECT * FROM usuario WHERE login = $1 AND senha = $2', [login, senha]);

    if (result.rows.length === 0) return null;

    const row = result.rows[0];

    const usuario = new Usuario(
      row.id,
      row.login,
      row.senha,
      row.perfil
    );

    return usuario;
  }
}
