import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const EMAIL_SENDER = process.env.EMAIL_SENDER;
const EMAIL_REPLY_TO = process.env.EMAIL_REPLY_TO;

if (!SENDGRID_API_KEY || !EMAIL_SENDER || !EMAIL_REPLY_TO) {
  throw new Error("Alguma variável de ambiente (SENDGRID_API_KEY, EMAIL_SENDER, EMAIL_REPLY_TO) não está definida no arquivo .env");
}

sgMail.setApiKey(SENDGRID_API_KEY);

export async function enviarEmail(to: string, subject: string, html: string) {
  const msg = {
    to,
    from: EMAIL_SENDER!,
    subject,
    html,
    replyTo: EMAIL_REPLY_TO!
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