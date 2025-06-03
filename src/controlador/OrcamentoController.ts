import { Request, Response } from 'express';
import { Orcamento } from '../modelo/dominio/orcamento';
import { OrcamentoBO } from '../modelo/BO/OrcamentoBO';

export class OrcamentoController {
        private orcamentoBO = new OrcamentoBO();

        public async criarOrcamentoGenerico(): Promise<Orcamento | null> {
            return await this.orcamentoBO.criarOrcamentoGenerico();
        }





    
}