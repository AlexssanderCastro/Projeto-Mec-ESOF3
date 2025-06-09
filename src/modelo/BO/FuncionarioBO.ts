import { Funcionario } from '../dominio/funcionario';
import { FuncionarioDAO } from '../DAO/FuncionarioDAO';

export class FuncionarioBO {
  private funcionarioDAO: FuncionarioDAO;

  constructor() {
    this.funcionarioDAO = new FuncionarioDAO();
  }

  public async buscarPorCpf(cpf: string): Promise<boolean> {
    return this.funcionarioDAO.buscarPorCpf(cpf);
  }

  async inserir(funcionario: Funcionario): Promise<boolean> {

    return await this.funcionarioDAO.inserir(funcionario);
  }

  async atualizar(funcionario: Funcionario): Promise<boolean> {

    return await this.funcionarioDAO.atualizar(funcionario);
  }

  async listar(): Promise<Funcionario[] | null> {
    return await this.funcionarioDAO.listarTodos();
  }

  async buscarPorId(id: number): Promise<Funcionario | null> {
    return await this.funcionarioDAO.buscarPorId(id);
  }

  public async excluir(id: number): Promise<boolean> {
    return await this.funcionarioDAO.excluir(id);
  }


  
}
