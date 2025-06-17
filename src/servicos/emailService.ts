import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

if (!SENDGRID_API_KEY) {
  throw new Error("Chave SENDGRID_API_KEY não está definida no arquivo .env");
}

sgMail.setApiKey(SENDGRID_API_KEY);

export async function enviarEmail(to: string, subject: string, html: string) {
  const msg = {
    to,
    from: 'ac9954460@gmail.com',  // seu sender verificado
    subject,
    html,
    replyTo: 'ac9954460@gmail.com'
  };

  try {
    await sgMail.send(msg);
    console.log("E-mail enviado com sucesso!");
    return true;
  } catch (erro) {
    console.error("Erro ao enviar e-mail:", erro);
    return false;
  }
}
