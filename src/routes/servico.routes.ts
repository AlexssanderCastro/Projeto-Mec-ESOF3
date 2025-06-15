import { Router, Request, Response } from 'express';
import path from 'path';
import { ServicoController } from '../controlador/ServicoController';

const router: Router = Router();

const servicoController = new ServicoController();

router.post('/criar-servico', (req: Request, res: Response) => {
  servicoController.criar(req, res);
});

router.get('/criar-servico-gerente.html', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'criar-servico-gerente.html'));
});

router.get('/criar-servico-funcionario.html', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'criar-servico-funcionario.html'));
});

router.get('/gerenciar-servicos-gerente.html', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'gerenciar-servicos-gerente.html'));
});

router.get('/gerenciar-servicos-funcionario.html', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'gerenciar-servicos-funcionario.html'));
});

router.get('/gerenciar-servico-gerente.html', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'gerenciar-servico-gerente.html'));
});

router.get('/gerenciar-servico-funcionario.html', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'gerenciar-servico-funcionario.html'));
});

router.post('/criar-servico', (req, res) => servicoController.criar(req, res));

router.get('/servicos-ativos', (req, res) => servicoController.listarAtivos(req, res));

router.get('/buscar-servico/:id', (req, res) =>servicoController.buscarServicoPorId(req, res));

router.put("/atualizar-status", (req, res) => servicoController.atualizarStatus(req, res));

export default router;