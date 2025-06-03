import db from '../../config/database';  // Importando a conexão do arquivo database.ts
import { Servico } from '../dominio/servico';
import { Cliente } from '../dominio/cliente';
import { Orcamento } from '../dominio/orcamento';
import { ItemOrcamento } from '../dominio/itens_orcamento';
import { Usuario } from '../dominio/usuario';


export class ServicoDAO {

    public async criar(servico: Servico): Promise<Servico> {
        const query = `
            INSERT INTO servico (cliente_id, descricao, status,orcamento_id)
            VALUES ($1, $2, $3, $4)
            RETURNING id, data_criacao
        `;

        const values = [
            servico.cliente?.id ?? null,
            servico.descricao,
            servico.status,
            servico.orcamento?.id
        ];

        try {
            const result = await db.query(query, values);
            const row = result.rows[0];

            // Atualiza o objeto servico com o id retornado
            servico.id = row.id;
            servico.data_inicio = new Date(row.data_criacao);

            return servico;

        } catch (error) {
            console.error('Erro na criação do serviço', error);
            throw error;
        }
    }

    public async buscarAtivos(): Promise<Servico[]> {
        const query = `
                SELECT s.id, s.descricao, s.status, c.nome AS cliente_nome
                FROM servico s
                JOIN cliente c ON s.cliente_id = c.id
                WHERE s.status NOT IN ('Finalizado', 'Cancelado')
            `;

        const result = await db.query(query);

        return result.rows.map(row => {
            const cliente = new Cliente(row.cliente_id, undefined!, row.cliente_nome, new Date(), '', '', '');
            return new Servico(row.id, row.descricao, row.status, cliente);
        });
    }


    public async buscarServicoPorId(id: number): Promise<Servico | null> {
        const query = `
            SELECT 
                s.id AS servico_id,
                s.descricao AS servico_descricao,
                s.status AS servico_status,
                s.data_criacao,
                c.id AS cliente_id,
                c.nome AS cliente_nome,
                c.email AS cliente_email,
                c.telefone AS cliente_telefone,
                o.id AS orcamento_id,
                o.data_orcamento,
                o.valor_total
            FROM servico s
            JOIN cliente c ON s.cliente_id = c.id
            LEFT JOIN orcamento o ON s.orcamento_id = o.id
            WHERE s.id = $1
        `;
        
        const result = await db.query(query, [id]);
        
        if (result.rows.length === 0) {
            return null;
        }

        const row = result.rows[0];

        const usuario = new Usuario(0, '', '', 'cliente');

        // Instanciando Cliente
        const cliente = new Cliente(
            row.cliente_id,
            usuario,
            row.cliente_nome,
            new Date(),
            '',
            row.cliente_email,
            row.cliente_telefone

        );

        // Instanciando Orcamento, se existir
        let orcamento: Orcamento | null = null;
        if (row.orcamento_id) {
            const itens = await this.buscarItensOrcamento(row.orcamento_id);
            orcamento = new Orcamento(
                row.orcamento_id,
                row.valor_total,
                itens,
                new Date(row.data_orcamento)
            );
        }

        // Instanciando Servico
        const servico = new Servico(
            row.servico_id,
            row.servico_descricao,
            row.servico_status,
            cliente,
            orcamento,
            row.data_criacao
        );

        return servico;
    }

    private async buscarItensOrcamento(orcamentoId: number): Promise<ItemOrcamento[]> {
        const query = `
        SELECT 
                id,
                descricao_peca,
                valor_unitario,
                quantidade
            FROM itens_orcamento
            WHERE orcamento_id = $1
        `;
        const result = await db.query(query, [orcamentoId]);

        const itens: ItemOrcamento[] = result.rows.map(row => new ItemOrcamento(
            row.id,
            row.descricao_peca,
            parseFloat(row.valor_unitario),
            row.quantidade
        ));

        return itens;
    }

    async atualizarStatus(servico:Servico | null): Promise<Servico | null> {
        

        if (!servico) {
            throw new Error("Serviço não encontrado.");
        }

         const query = `
            UPDATE servico SET status = $1 
            WHERE id = $2
        `;

        const values = [
            servico.status,
            servico.id
        ];

        try {
            const result = await db.query(query, values);
            

            return servico;

        } catch (error) {
            console.error('Erro na criação do serviço', error);
            throw error;
        }

    }


}