import express from 'express';
import path from 'path';
import index from './routes/index.routes';
import cliente from './routes/cliente.routes';
import usuario from './routes/usuario.routes';
import gerente from './routes/gerente.routes';
import funcionario from './routes/funcionario.routes';
import servico from './routes/servico.routes';
import orcamento from './routes/orcamento.routes';
import itens from './routes/itens_orcamento.routes';
import session from 'express-session';

const app = express();
const PORT = 3003;



// Configuração do express para lidar com dados JSON e URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'chave_secreta_temporaria',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // coloque como true apenas se usar HTTPS
}));


app.use(express.static(path.join(__dirname, 'public')));


app.use(index);
app.use(usuario);
app.use(cliente);
app.use(gerente);
app.use(funcionario);
app.use(servico);
app.use(orcamento);
app.use(itens);

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
