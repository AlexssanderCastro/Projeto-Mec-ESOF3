import { Router, Request, Response } from 'express';
import path from 'path';
import { OrcamentoController } from '../controlador/OrcamentoController';

const router: Router = Router();
const orcamentoController = new OrcamentoController();

router.get('/criar-orcamento-gerente.html', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'criar-orcamento-gerente.html'));
});
router.get('/criar-orcamento-funcionario.html', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'criar-orcamento-funcionario.html'));
});



export default router;