import { Router, Request, Response } from 'express';
import path from 'path';

const router: Router = Router();

router.get('/gerente.html', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'gerente.html'));
});

router.get('/cadastro-funcionario.html', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'cadastro-funcionario.html'));
});

router.get('/gerenciar-funcionario.html', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'gerenciar-funcionario.html'));
});

router.get('/editar-funcionario.html', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'editar-funcionario.html'));
});

router.get('/listar-clientes-gerente.html', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'listar-clientes-gerente.html'));
});

router.get('/listar-clientes-funcionario.html', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'listar-clientes-funcionario.html'));
});

router.get('/relatorio-gerente.html', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'relatorio-gerente.html'));
});




export default router;