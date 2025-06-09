import { Funcionario } from '../dominio/funcionario';
import db from '../../config/database'; // ajuste se o caminho for diferente
import { Usuario } from '../dominio/usuario';


export class FuncionarioDAO {

  async inserir(funcionario: Funcionario): Promise<boolean> {
    try {
      const resultado = await db.query(
        `INSERT INTO funcionario (
          usuario_id, nome, cpf, data_nascimento, cargo, salario, email, telefone, endereco
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          funcionario.usuario.id,
          funcionario.nome,
          funcionario.cpf,
          funcionario.data_nascimento,
          funcionario.cargo,
          funcionario.salario,
          funcionario.email,
          funcionario.telefone,
          funcionario.endereco
        ]
      );

      return true;

    } catch (erro) {
      console.error('Erro ao inserir funcionário no banco:', erro);
      return false;
    }
  }

  async atualizar(funcionario: Funcionario): Promise<boolean> {
    try {
      const resultado = await db.query(
        `UPDATE funcionario 
        SET nome = $1, cpf = $2, data_nascimento = $3, cargo = $4, salario = $5, 
            email = $6, telefone = $7, endereco = $8
       WHERE id = $9`,
        [
          funcionario.nome,
          funcionario.cpf,
          funcionario.data_nascimento,
          funcionario.cargo,
          funcionario.salario,
          funcionario.email,
          funcionario.telefone,
          funcionario.endereco,
          funcionario.id
        ]
      );

      return (resultado.rowCount ?? 0) > 0;

    } catch (erro) {
      console.error('Erro ao atualizar funcionário no banco:', erro);
      return false;
    }
  }


  async buscarPorCpf(cpf: string): Promise<boolean> {
    try {
      const result = await db.query(
        'SELECT * FROM funcionario WHERE cpf = $1',
        [cpf]
      );

      if (result.rows.length === 0) return false;



      return true;
    } catch (erro) {
      console.error('Erro ao buscar funcionário por CPF:', erro);
      return false;
    }
  }

  async listarTodos(): Promise<Funcionario[] | null> {
    const query = `
      SELECT 
        funcionario.id AS funcionario_id,
        funcionario.nome,
        funcionario.cpf,
        funcionario.data_nascimento,
        funcionario.cargo,
        funcionario.salario,
        funcionario.email,
        funcionario.telefone,
        funcionario.endereco,
        usuario.id AS usuario_id,
        usuario.login,
        usuario.senha,
        usuario.perfil
      FROM funcionario
      JOIN usuario ON funcionario.usuario_id = usuario.id
    `;


    try {
      const resultado = await db.query(query);

      return resultado.rows.map((row: any) => {
        const usuario = new Usuario(
          row.usuario_id, // Cuidado: esse campo precisa estar no SELECT se não estiver ainda
          row.login,
          row.senha, // Esse também precisa estar no SELECT se usado
          row.perfil
        );

        const funcionario = new Funcionario(
          row.funcionario_id,
          usuario,
          row.nome,
          row.cpf,
          new Date(row.data_nascimento),
          row.cargo,
          parseFloat(row.salario),
          row.email,
          row.endereco,
          row.telefone
        );

        return funcionario;
      });
    } catch (error) {
      console.error("Erro ao listar funcionários:", error);
      return null;
    }
  }


  async buscarPorId(id: number): Promise<Funcionario | null> {
    const query = `
    SELECT 
      funcionario.id AS funcionario_id,
      funcionario.nome,
      funcionario.cpf,
      funcionario.data_nascimento,
      funcionario.cargo,
      funcionario.salario,
      funcionario.email,
      funcionario.telefone,
      funcionario.endereco,
      usuario.id AS usuario_id,
      usuario.login,
      usuario.senha,
      usuario.perfil
    FROM funcionario
    JOIN usuario ON funcionario.usuario_id = usuario.id
    WHERE funcionario.id = $1
  `;

    try {
      const resultado = await db.query(query, [id]);
      const row = resultado.rows[0];

      if (!row) return null;

      const usuario = new Usuario(
        row.usuario_id,
        row.login,
        row.senha,
        row.perfil
      );

      return new Funcionario(
        row.funcionario_id, // <--- corrigido
        usuario,
        row.nome,
        row.cpf,
        new Date(row.data_nascimento),
        row.cargo,
        parseFloat(row.salario),
        row.email,
        row.endereco,
        row.telefone
      );
    } catch (error) {
      console.error("Erro no DAO buscarPorId:", error);
      return null;
    }
  }


  public async excluir(id: number): Promise<boolean> {
    try {
      const resultado = await db.query('DELETE FROM funcionario WHERE id = $1', [id]);
      return resultado.rowCount !== null && resultado.rowCount > 0;
    } catch (error) {
      console.error("Erro ao excluir funcionário:", error);
      return false;
    }
  }



}
