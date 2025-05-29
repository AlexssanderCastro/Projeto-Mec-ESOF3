import { Funcionario } from '../dominio/funcionario';
import  db  from '../../config/database'; // ajuste se o caminho for diferente


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
}
