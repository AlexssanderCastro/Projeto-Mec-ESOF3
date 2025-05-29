import db from '../../config/database';  // Importando a conexão do arquivo database.ts
import { Cliente } from '../dominio/cliente';
import { Usuario } from '../dominio/usuario';


export class ClienteDAO {
  

  // Método para cadastrar um cliente
  public async cadastrar(cliente: Cliente): Promise<boolean> {
    try {
      const result = await db.query(
        `INSERT INTO cliente (usuario_id, nome, data_nascimento, telefone, endereco, cpf, email)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
        [
          cliente.usuario.id,
          cliente.nome,
          cliente.data_nascimento,
          cliente.telefone,
          cliente.endereco,
          cliente.cpf,
          cliente.email
        ]
      );
      cliente.id = result.rows[0].id;
      return true;
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      return false;
    }
  }

  // Método para listar todos os clientes
  

  // Método para buscar cliente pelo CPF
  public async buscarPorCpf(cpf: string): Promise<boolean> {
    
    const result = await db.query(
      `SELECT * FROM cliente WHERE cpf = $1`,
      [cpf]
    );

    if (result.rows.length > 0) {
      return true;
    }

    return false;
  }

  public async buscarPorEmail(email:String) : Promise<boolean>{
    const result = await db.query(
      `SELECT * FROM cliente WHERE email = $1`,
      [email]
    );

    if (result.rows.length > 0) {
      return true;
    }

    return false;
  }

  public async buscarPorUsuario(usuario: Usuario): Promise<Cliente | null> {
    try {
      const result = await db.query(
        'SELECT * FROM cliente WHERE usuario_id = $1',
        [usuario.id] // Aqui utilizamos o getter para obter o ID do usuário
      );

      if (result.rows.length === 0) return null;

      const row = result.rows[0];

      // Criando um novo cliente usando o construtor sobrecarregado
      return new Cliente(
        row.id,
        usuario, // Passando o objeto usuario para o cliente
        row.nome,
        row.data_nascimento,
        row.cpf,
        row.email,
        row.telefone
      );
    } catch (err) {
      console.error('Erro ao buscar cliente por usuário:', err);
      throw err;
    }
  }

     
}

