import db from '../../config/database';  // Importando a conexão do arquivo database.ts
import { Servico } from '../dominio/servico';


export class ServicoDAO {

    public async criar(servico: Servico): Promise<Servico> {
        const query = `
            INSERT INTO servico (cliente_id, descricao, status)
            VALUES ($1, $2, $3)
            RETURNING id, data_criacao
        `;

        const values = [
            servico.cliente?.id ?? null,
            servico.descricao,
            servico.status
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
}