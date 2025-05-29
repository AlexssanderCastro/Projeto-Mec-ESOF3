import { Funcionario } from '../dominio/funcionario';
import { FuncionarioDAO } from '../DAO/FuncionarioDAO';

export class FuncionarioBO {
  private funcionarioDAO: FuncionarioDAO;

  constructor() {
    this.funcionarioDAO = new FuncionarioDAO();
  }

  public async buscarPorCpf(cpf:string): Promise<boolean> {
      return this.funcionarioDAO.buscarPorCpf(cpf);
  }

  async inserir(funcionario: Funcionario): Promise<boolean> {
    // Aqui você pode adicionar validações de negócio, por exemplo:

    return await this.funcionarioDAO.inserir(funcionario);
  }

  // Outros métodos como atualizar, excluir, buscar etc., podem ser adicionados depois
}
