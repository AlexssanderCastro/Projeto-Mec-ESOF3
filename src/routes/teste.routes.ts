import express, { Request, Response } from 'express';
import { enviarEmail } from '../servicos/emailService';

const router = express.Router();

router.post('/teste-email', async (req: Request, res: Response) => {
  const { to, subject, html } = req.body;

  if (!to || !subject || !html) {
    res.status(400).json({ erro: 'Campos obrigatórios: to, subject e html' });
    return;
  }


   const sucesso = await enviarEmail(to, subject, html);

  if (sucesso) {
     res.json({ mensagem: 'E-mail enviado com sucesso!' });
  } else {
    res.status(500).json({ erro: 'Erro ao enviar e-mail.' });
  }
});

export default router;
