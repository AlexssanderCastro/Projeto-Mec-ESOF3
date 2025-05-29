import { Cliente } from '../dominio/cliente';
import { ClienteDAO } from '../DAO/ClienteDAO';
import { Usuario } from '../dominio/usuario';

export class ClienteBO {
    private clienteDAO: ClienteDAO;

    constructor() {
        this.clienteDAO = new ClienteDAO();
    }

    public async buscarPorEmail(email: String): Promise<boolean> {
        return await this.clienteDAO.buscarPorEmail(email);
    }

    public async buscarPorCPF(cpf: string): Promise<boolean> {
        return await this.clienteDAO.buscarPorCpf(cpf);
    }

    // Valida o cadastro do cliente
    public async cadastrar(cliente: Cliente): Promise<boolean> {

        const resultadoCliente = await this.clienteDAO.cadastrar(cliente);
        return resultadoCliente;
    }

    async buscarPorUsuario(usuario: Usuario): Promise<Cliente | null> {
        return await this.clienteDAO.buscarPorUsuario(usuario);
    }

    public async buscarClientes(): Promise<Cliente[]> {
        const clientesJson = await this.clienteDAO.buscarClientes();
        const usuarioTemporario = new Usuario(0, '', '', 'cliente');
        
        return clientesJson.map((json: any) => {
            
            return new Cliente(
                json.id,
                usuarioTemporario,
                json.nome,
                new Date(json.data_nascimento),
                json.cpf,
                json.email,
                json.telefone
            );
        });
    }
}