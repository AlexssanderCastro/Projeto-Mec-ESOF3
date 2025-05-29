import { Router, Request, Response } from 'express';
import path from 'path';

const router: Router = Router();

router.get('/gerente.html', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'gerente.html'));
});

router.get('/cadastro-funcionario.html', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'cadastro-funcionario.html'));
});




export default router;