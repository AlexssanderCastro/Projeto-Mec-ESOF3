import { ItemOrcamento } from '../dominio/itens_orcamento';
import db from '../../config/database'; // ajuste se o caminho for diferente


export class ItensOrcamentoDAO {

    async inserir(item: ItemOrcamento): Promise<ItemOrcamento> {
        const query = `
            INSERT INTO itens_orcamento (descricao_peca, valor_unitario, quantidade, orcamento_id)
            VALUES ($1, $2, $3, $4)
            RETURNING id, descricao_peca, valor_unitario, quantidade, orcamento_id;
        `;

        const values = [
            item.descricao_peca,
            item.valor_unitario,
            item.quantidade,
            item.id_orcamento
        ];

        try {
            const result = await db.query(query, values);

            const row = result.rows[0];
            return new ItemOrcamento(
                row.id,
                row.descricao_peca,
                row.valor_unitario,
                row.quantidade,
                row.id_orcamento
            );
        } catch (erro) {
            console.error("Erro ao inserir item no banco:", erro);
            throw new Error("Falha ao inserir item no banco de dados.");
        }
    }

    async buscarItem(id: number): Promise<ItemOrcamento> {

        const query = `
            SELECT * FROM itens_orcamento WHERE id=$1
        `;

        const values = [
            id
        ];

        try {
            const result = await db.query(query, values);

            const row = result.rows[0];
            return new ItemOrcamento(
                row.id,
                row.descricao_peca,
                row.valor_unitario,
                row.quantidade,
                row.orcamento_id
            );
        } catch (erro) {
            console.error("Erro ao inserir item no banco:", erro);
            throw new Error("Falha ao inserir item no banco de dados.");
        }

    }

    async deletarItem(id: number): Promise<boolean> {
        const query = `
        DELETE FROM itens_orcamento WHERE id = $1
    `;

        try {
            const result = await db.query(query, [id]);

            // Se nenhuma linha foi deletada, o item não existia
            return (result.rowCount ?? 0) > 0;

        } catch (erro) {
            console.error("Erro ao deletar item no banco:", erro);
            throw new Error("Falha ao deletar item do banco de dados.");
        }
    }

}