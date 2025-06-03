import  db  from '../../config/database'; // ajuste se o caminho for diferente
import { Orcamento } from '../dominio/orcamento';




export class OrcamentoDAO {

    public async criarOrcamentoGenerico(orcamento: Orcamento): Promise<Orcamento | null> {
        try {
            const result = await db.query(
            'INSERT INTO orcamento(valor_total) VALUES ($1) RETURNING id',
            [orcamento.valor_total]
            );

            if ( result.rows.length > 0) {
            orcamento.id = result.rows[0].id;
            return orcamento;
            } else {
            console.warn('Nenhuma linha foi inserida ao criar o orçamento.');
            return null;
            }
        } catch (erro) {
            console.error('Erro ao gerar orçamento:', erro);
            return null;
        }
    }

    async atualizarValor(valorAdicionar: number, orcamentoId: number | null): Promise<void> {
    const query = `
        UPDATE orcamento
        SET valor_total = valor_total + $1
        WHERE id = $2
    `;

    const values = [valorAdicionar, orcamentoId];

    try {
        await db.query(query, values);
    } catch (error) {
        console.error("Erro ao atualizar o valor do orçamento:", error);
        throw error;
    }
}


}