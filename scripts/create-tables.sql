-- Criar tabelas no Supabase

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS produtos (
  id BIGSERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  preco DECIMAL(10,2) NOT NULL DEFAULT 0,
  estoque INTEGER NOT NULL DEFAULT 0,
  estoque_minimo INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de clientes
CREATE TABLE IF NOT EXISTS clientes (
  id BIGSERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  telefone VARCHAR(20),
  endereco TEXT,
  total_gasto DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de fornecedores
CREATE TABLE IF NOT EXISTS fornecedores (
  id BIGSERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  telefone VARCHAR(20),
  cnpj VARCHAR(18),
  endereco TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de pedidos
CREATE TABLE IF NOT EXISTS pedidos (
  id BIGSERIAL PRIMARY KEY,
  cliente_id BIGINT REFERENCES clientes(id),
  cliente_nome VARCHAR(255) NOT NULL,
  produtos TEXT[] NOT NULL DEFAULT '{}',
  total DECIMAL(10,2) NOT NULL DEFAULT 0,
  status VARCHAR(20) NOT NULL DEFAULT 'Pendente',
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de lançamentos financeiros
CREATE TABLE IF NOT EXISTS lancamentos (
  id BIGSERIAL PRIMARY KEY,
  tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('Entrada', 'Saída')),
  descricao VARCHAR(255) NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  valor DECIMAL(10,2) NOT NULL DEFAULT 0,
  metodo VARCHAR(50) NOT NULL,
  data VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de notas fiscais
CREATE TABLE IF NOT EXISTS notas_fiscais (
  id BIGSERIAL PRIMARY KEY,
  numero VARCHAR(50) NOT NULL UNIQUE,
  cliente_id BIGINT REFERENCES clientes(id),
  cliente_nome VARCHAR(255) NOT NULL,
  valor DECIMAL(10,2) NOT NULL DEFAULT 0,
  status VARCHAR(20) NOT NULL DEFAULT 'Emitida',
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de comprovantes fiado
CREATE TABLE IF NOT EXISTS comprovantes (
  id BIGSERIAL PRIMARY KEY,
  cliente_nome VARCHAR(255) NOT NULL,
  valor DECIMAL(10,2) NOT NULL DEFAULT 0,
  status VARCHAR(20) NOT NULL DEFAULT 'Pendente',
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  produtos TEXT[] NOT NULL DEFAULT '{}',
  telefone VARCHAR(20),
  endereco TEXT,
  metodo_pagamento VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir dados de exemplo
INSERT INTO produtos (nome, categoria, preco, estoque, estoque_minimo) VALUES
('Coca-Cola 2L', 'Refrigerantes', 8.50, 25, 10),
('Antártica Lata 350ml', 'Cervejas', 3.50, 0, 20),
('Skol Lata 350ml', 'Cervejas', 3.20, 0, 20),
('Água Mineral 500ml', 'Águas', 2.00, 50, 15),
('Guaraná Antarctica 2L', 'Refrigerantes', 7.90, 15, 8),
('Brahma Lata 350ml', 'Cervejas', 3.80, 30, 20);

INSERT INTO clientes (nome, email, telefone, endereco, total_gasto) VALUES
('João Silva', 'joao@email.com', '(11) 99999-9999', 'Rua A, 123', 156.80),
('Maria Santos', 'maria@email.com', '(11) 88888-8888', 'Rua B, 456', 89.50),
('Pedro Oliveira', 'pedro@email.com', '(11) 77777-7777', 'Rua C, 789', 234.20),
('Ana Costa', 'ana@email.com', '(11) 66666-6666', 'Rua D, 321', 67.90);

INSERT INTO fornecedores (nome, email, telefone, cnpj, endereco) VALUES
('Distribuidora ABC', 'contato@abc.com', '(11) 3333-3333', '12.345.678/0001-90', 'Av. Principal, 789'),
('Bebidas XYZ Ltda', 'vendas@xyz.com', '(11) 4444-4444', '98.765.432/0001-10', 'Rua Comercial, 456');

INSERT INTO lancamentos (tipo, descricao, categoria, valor, metodo, data) VALUES
('Entrada', 'Venda de Coca-Cola 2L', 'Vendas', 45.90, 'Dinheiro', '28/01/2025, 12:57'),
('Saída', 'Compra de estoque', 'Compras', 250.00, 'PIX', '27/01/2025, 12:57'),
('Entrada', 'Venda fiado - João Silva', 'Vendas', 78.50, 'Fiado', '26/01/2025, 12:57'),
('Entrada', 'Venda de cervejas', 'Vendas', 21.00, 'Cartão', '25/01/2025, 15:30'),
('Saída', 'Pagamento fornecedor', 'Compras', 180.00, 'PIX', '24/01/2025, 09:15');

-- Habilitar RLS (Row Level Security)
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE fornecedores ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE lancamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE notas_fiscais ENABLE ROW LEVEL SECURITY;
ALTER TABLE comprovantes ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso (permitir tudo por enquanto)
CREATE POLICY "Enable all operations for all users" ON produtos FOR ALL USING (true);
CREATE POLICY "Enable all operations for all users" ON clientes FOR ALL USING (true);
CREATE POLICY "Enable all operations for all users" ON fornecedores FOR ALL USING (true);
CREATE POLICY "Enable all operations for all users" ON pedidos FOR ALL USING (true);
CREATE POLICY "Enable all operations for all users" ON lancamentos FOR ALL USING (true);
CREATE POLICY "Enable all operations for all users" ON notas_fiscais FOR ALL USING (true);
CREATE POLICY "Enable all operations for all users" ON comprovantes FOR ALL USING (true);
