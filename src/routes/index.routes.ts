import { Router, Request, Response } from 'express';
import path from 'path';

const router: Router = Router();

// Rota de exibição da página inicial
router.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

// Rota de exibição da página de login
router.get('/login.html', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
});

export default router;
