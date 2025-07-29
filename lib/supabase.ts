import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key"

export const supabase = createClient(supabaseUrl, supabaseKey)

// Tipos do banco de dados
export interface Produto {
  id: number
  nome: string
  categoria: string
  preco: number
  estoque: number
  estoque_minimo: number
  created_at?: string
  updated_at?: string
}

export interface Cliente {
  id: number
  nome: string
  email?: string
  telefone?: string
  endereco?: string
  total_gasto: number
  created_at?: string
  updated_at?: string
}

export interface Fornecedor {
  id: number
  nome: string
  email?: string
  telefone?: string
  cnpj?: string
  endereco?: string
  created_at?: string
  updated_at?: string
}

export interface Pedido {
  id: number
  cliente_id: number
  cliente_nome: string
  produtos: string[]
  total: number
  status: "Pendente" | "Entregue" | "Cancelado"
  data: string
  created_at?: string
  updated_at?: string
}

export interface Lancamento {
  id: number
  tipo: "Entrada" | "Saída"
  descricao: string
  categoria: string
  valor: number
  metodo: string
  data: string
  created_at?: string
  updated_at?: string
}

export interface NotaFiscal {
  id: number
  numero: string
  cliente_id: number
  cliente_nome: string
  valor: number
  status: "Emitida" | "Cancelada"
  data: string
  created_at?: string
  updated_at?: string
}

export interface Comprovante {
  id: number
  cliente_nome: string
  valor: number
  status: "Pendente" | "Pago"
  data: string
  produtos: string[]
  telefone?: string
  endereco?: string
  metodo_pagamento?: string
  created_at?: string
  updated_at?: string
}
