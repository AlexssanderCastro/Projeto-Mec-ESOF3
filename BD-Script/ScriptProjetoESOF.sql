-- Criação do tipo ENUM
CREATE TYPE public.perfil_usuario AS ENUM (
    'cliente',
    'funcionario',
    'gerente'
);

-- Tabelas e Sequências

CREATE TABLE public.usuario (
    id integer PRIMARY KEY DEFAULT nextval('usuario_id_seq'),
    login character varying(100) NOT NULL UNIQUE,
    senha character varying(100) NOT NULL,
    perfil public.perfil_usuario NOT NULL
);

CREATE SEQUENCE public.usuario_id_seq START 1;

CREATE TABLE public.cliente (
    id integer PRIMARY KEY DEFAULT nextval('cliente_id_seq'),
    usuario_id integer REFERENCES public.usuario(id),
    nome character varying(100) NOT NULL,
    data_nascimento date NOT NULL,
    telefone character varying(15),
    endereco text,
    cpf character varying(14) NOT NULL UNIQUE,
    email character varying(100) NOT NULL UNIQUE
);

CREATE SEQUENCE public.cliente_id_seq START 1;

CREATE TABLE public.funcionario (
    id integer PRIMARY KEY DEFAULT nextval('funcionario_id_seq'),
    usuario_id integer REFERENCES public.usuario(id) ON DELETE CASCADE,
    nome character varying(100) NOT NULL,
    cpf character varying(14) NOT NULL UNIQUE,
    data_nascimento date NOT NULL,
    cargo character varying(50),
    salario numeric(10,2),
    email character varying(100) NOT NULL UNIQUE,
    telefone character varying(15),
    endereco text
);

CREATE SEQUENCE public.funcionario_id_seq START 1;

CREATE TABLE public.orcamento (
    id integer PRIMARY KEY DEFAULT nextval('orcamento_id_seq'),
    data_orcamento timestamp DEFAULT CURRENT_TIMESTAMP,
    valor_total numeric(10,2) NOT NULL
);

CREATE SEQUENCE public.orcamento_id_seq START 1;

CREATE TABLE public.itens_orcamento (
    id integer PRIMARY KEY DEFAULT nextval('itens_orcamento_id_seq'),
    orcamento_id integer REFERENCES public.orcamento(id) ON DELETE CASCADE,
    descricao_peca character varying(100) NOT NULL,
    valor_unitario numeric(10,2) NOT NULL,
    quantidade integer NOT NULL DEFAULT 1
);

CREATE SEQUENCE public.itens_orcamento_id_seq START 1;

CREATE TABLE public.servico (
    id integer PRIMARY KEY DEFAULT nextval('servico_id_seq'),
    cliente_id integer REFERENCES public.cliente(id) ON DELETE SET NULL,
    orcamento_id integer REFERENCES public.orcamento(id) ON DELETE SET NULL,
    descricao text NOT NULL,
    status character varying(30) NOT NULL,
    data_criacao timestamp DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT servico_status_check CHECK (
        status IN ('Em análise', 'Aguardando pagamento', 'Consertando', 'Finalizado', 'Cancelado', 'Aguardando confirmação')
    )
);

CREATE SEQUENCE public.servico_id_seq START 1;


INSERT INTO usuario (login, senha, perfil)
VALUES ('admin', '$2b$10$U8T8AFyt0SK865LRNMbyjufbq/85IOT2RwfuDUwn4BxpJCLbZDLUu', 'gerente');
