"use client"

import { useState, useEffect } from "react"
import {
  supabase,
  type Produto,
  type Cliente,
  type Fornecedor,
  type Pedido,
  type Lancamento,
  type NotaFiscal,
  type Comprovante,
} from "@/lib/supabase"

export function useDatabase() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([])
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([])
  const [notasFiscais, setNotasFiscais] = useState<NotaFiscal[]>([])
  const [comprovantes, setComprovantes] = useState<Comprovante[]>([])
  const [loading, setLoading] = useState(true)

  // Carregar todos os dados
  const loadAllData = async () => {
    setLoading(true)
    try {
      const [produtosRes, clientesRes, fornecedoresRes, pedidosRes, lancamentosRes, notasRes, comprovantesRes] =
        await Promise.all([
          supabase.from("produtos").select("*").order("id"),
          supabase.from("clientes").select("*").order("id"),
          supabase.from("fornecedores").select("*").order("id"),
          supabase.from("pedidos").select("*").order("id"),
          supabase.from("lancamentos").select("*").order("id"),
          supabase.from("notas_fiscais").select("*").order("id"),
          supabase.from("comprovantes").select("*").order("id"),
        ])

      if (produtosRes.data) setProdutos(produtosRes.data)
      if (clientesRes.data) setClientes(clientesRes.data)
      if (fornecedoresRes.data) setFornecedores(fornecedoresRes.data)
      if (pedidosRes.data) setPedidos(pedidosRes.data)
      if (lancamentosRes.data) setLancamentos(lancamentosRes.data)
      if (notasRes.data) setNotasFiscais(notasRes.data)
      if (comprovantesRes.data) setComprovantes(comprovantesRes.data)
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
    } finally {
      setLoading(false)
    }
  }

  // CRUD Produtos
  const addProduto = async (produto: Omit<Produto, "id">) => {
    const { data, error } = await supabase.from("produtos").insert([produto]).select().single()
    if (error) throw error
    setProdutos((prev) => [...prev, data])
    return data
  }

  const updateProduto = async (id: number, updates: Partial<Produto>) => {
    const { data, error } = await supabase.from("produtos").update(updates).eq("id", id).select().single()
    if (error) throw error
    setProdutos((prev) => prev.map((p) => (p.id === id ? data : p)))
    return data
  }

  const deleteProduto = async (id: number) => {
    const { error } = await supabase.from("produtos").delete().eq("id", id)
    if (error) throw error
    setProdutos((prev) => prev.filter((p) => p.id !== id))
  }

  // CRUD Clientes
  const addCliente = async (cliente: Omit<Cliente, "id">) => {
    const { data, error } = await supabase.from("clientes").insert([cliente]).select().single()
    if (error) throw error
    setClientes((prev) => [...prev, data])
    return data
  }

  const updateCliente = async (id: number, updates: Partial<Cliente>) => {
    const { data, error } = await supabase.from("clientes").update(updates).eq("id", id).select().single()
    if (error) throw error
    setClientes((prev) => prev.map((c) => (c.id === id ? data : c)))
    return data
  }

  const deleteCliente = async (id: number) => {
    const { error } = await supabase.from("clientes").delete().eq("id", id)
    if (error) throw error
    setClientes((prev) => prev.filter((c) => c.id !== id))
  }

  // CRUD Fornecedores
  const addFornecedor = async (fornecedor: Omit<Fornecedor, "id">) => {
    const { data, error } = await supabase.from("fornecedores").insert([fornecedor]).select().single()
    if (error) throw error
    setFornecedores((prev) => [...prev, data])
    return data
  }

  const deleteFornecedor = async (id: number) => {
    const { error } = await supabase.from("fornecedores").delete().eq("id", id)
    if (error) throw error
    setFornecedores((prev) => prev.filter((f) => f.id !== id))
  }

  // CRUD Pedidos
  const addPedido = async (pedido: Omit<Pedido, "id">) => {
    const { data, error } = await supabase.from("pedidos").insert([pedido]).select().single()
    if (error) throw error
    setPedidos((prev) => [...prev, data])
    return data
  }

  const updatePedido = async (id: number, updates: Partial<Pedido>) => {
    const { data, error } = await supabase.from("pedidos").update(updates).eq("id", id).select().single()
    if (error) throw error
    setPedidos((prev) => prev.map((p) => (p.id === id ? data : p)))
    return data
  }

  const deletePedido = async (id: number) => {
    const { error } = await supabase.from("pedidos").delete().eq("id", id)
    if (error) throw error
    setPedidos((prev) => prev.filter((p) => p.id !== id))
  }

  // CRUD Lançamentos
  const addLancamento = async (lancamento: Omit<Lancamento, "id">) => {
    const { data, error } = await supabase.from("lancamentos").insert([lancamento]).select().single()
    if (error) throw error
    setLancamentos((prev) => [...prev, data])
    return data
  }

  const deleteLancamento = async (id: number) => {
    const { error } = await supabase.from("lancamentos").delete().eq("id", id)
    if (error) throw error
    setLancamentos((prev) => prev.filter((l) => l.id !== id))
  }

  // CRUD Notas Fiscais
  const addNotaFiscal = async (nota: Omit<NotaFiscal, "id">) => {
    const { data, error } = await supabase.from("notas_fiscais").insert([nota]).select().single()
    if (error) throw error
    setNotasFiscais((prev) => [...prev, data])
    return data
  }

  const updateNotaFiscal = async (id: number, updates: Partial<NotaFiscal>) => {
    const { data, error } = await supabase.from("notas_fiscais").update(updates).eq("id", id).select().single()
    if (error) throw error
    setNotasFiscais((prev) => prev.map((n) => (n.id === id ? data : n)))
    return data
  }

  const deleteNotaFiscal = async (id: number) => {
    const { error } = await supabase.from("notas_fiscais").delete().eq("id", id)
    if (error) throw error
    setNotasFiscais((prev) => prev.filter((n) => n.id !== id))
  }

  // CRUD Comprovantes
  const addComprovante = async (comprovante: Omit<Comprovante, "id">) => {
    const { data, error } = await supabase.from("comprovantes").insert([comprovante]).select().single()
    if (error) throw error
    setComprovantes((prev) => [...prev, data])
    return data
  }

  useEffect(() => {
    loadAllData()
  }, [])

  return {
    // Estados
    produtos,
    clientes,
    fornecedores,
    pedidos,
    lancamentos,
    notasFiscais,
    comprovantes,
    loading,

    // Funções
    loadAllData,

    // Produtos
    addProduto,
    updateProduto,
    deleteProduto,

    // Clientes
    addCliente,
    updateCliente,
    deleteCliente,

    // Fornecedores
    addFornecedor,
    deleteFornecedor,

    // Pedidos
    addPedido,
    updatePedido,
    deletePedido,

    // Lançamentos
    addLancamento,
    deleteLancamento,

    // Notas Fiscais
    addNotaFiscal,
    updateNotaFiscal,
    deleteNotaFiscal,

    // Comprovantes
    addComprovante,
  }
}
