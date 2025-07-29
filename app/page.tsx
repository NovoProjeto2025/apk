"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Bell,
  Sun,
  HelpCircle,
  Settings,
  Home,
  ShoppingCart,
  Package,
  DollarSign,
  FileText,
  Users,
  Truck,
  Receipt,
  BarChart3,
  Cog,
  Search,
  Plus,
  Download,
  RefreshCw,
  Share,
  Filter,
  Trash2,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Menu,
  Save,
  CreditCard,
  Loader2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { useDatabase } from "@/hooks/useDatabase"
import { SalesChart } from "@/components/charts/SalesChart"
import { PaymentMethodChart } from "@/components/charts/PaymentMethodChart"
import { StockChart } from "@/components/charts/StockChart"
import { RevenueChart } from "@/components/charts/RevenueChart"

const menuItems = [
  { id: "painel", label: "Painel", icon: Home, section: "PRINCIPAL" },
  { id: "pedidos", label: "Pedidos", icon: ShoppingCart, section: "PRINCIPAL" },
  { id: "estoque", label: "Estoque", icon: Package, section: "GESTÃO" },
  { id: "financeiro", label: "Financeiro", icon: DollarSign, section: "GESTÃO" },
  { id: "comprovante-fiado", label: "Comprovante Fiado", icon: Receipt, section: "GESTÃO" },
  { id: "clientes", label: "Clientes", icon: Users, section: "GESTÃO" },
  { id: "fornecedores", label: "Fornecedores", icon: Truck, section: "GESTÃO" },
  { id: "notas-fiscais", label: "Notas Fiscais", icon: FileText, section: "GESTÃO" },
  { id: "relatorios", label: "Relatórios", icon: BarChart3, section: "ANÁLISES" },
  { id: "configuracoes", label: "Configurações", icon: Cog, section: "ANÁLISES" },
]

export default function BebidasOnApp() {
  const [activeSection, setActiveSection] = useState("painel")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const database = useDatabase()

  const renderContent = () => {
    if (database.loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-yellow-500 mx-auto mb-4" />
            <p className="text-gray-400">Carregando dados...</p>
          </div>
        </div>
      )
    }

    switch (activeSection) {
      case "painel":
        return <PainelContent database={database} />
      case "pedidos":
        return <PedidosContent database={database} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      case "estoque":
        return <EstoqueContent database={database} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      case "financeiro":
        return <FinanceiroContent database={database} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      case "comprovante-fiado":
        return <ComprovanteFiadoContent database={database} />
      case "clientes":
        return <ClientesContent database={database} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      case "fornecedores":
        return <FornecedoresContent database={database} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      case "notas-fiscais":
        return <NotasFiscaisContent database={database} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      case "relatorios":
        return <RelatoriosContent database={database} />
      case "configuracoes":
        return <ConfiguracoesContent />
      default:
        return <PainelContent database={database} />
    }
  }

  const getPageTitle = () => {
    const titles = {
      painel: "Painel",
      pedidos: "Pedidos",
      estoque: "Estoque",
      financeiro: "Financeiro",
      "comprovante-fiado": "Comprovantes Fiado",
      clientes: "Gestão de Clientes",
      fornecedores: "Gestão de Fornecedores",
      "notas-fiscais": "Notas Fiscais",
      relatorios: "Relatórios Avançados",
      configuracoes: "Configurações",
    }
    return titles[activeSection as keyof typeof titles] || "Painel"
  }

  const showBackButton = () => {
    return ["fornecedores", "relatorios"].includes(activeSection)
  }

  const SidebarContent = () => (
    <div className="w-full animated-gradient flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 text-center border-b border-yellow-300/30">
        <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden ring-2 ring-white/20">
          <img src="/logo-oficial.jpg" alt="Bebidas ON Logo" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-gray-900 font-bold text-lg">Bebidas ON</h1>
        <p className="text-gray-700 text-sm">Delivery</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {["PRINCIPAL", "GESTÃO", "ANÁLISES"].map((section) => (
          <div key={section} className="mb-4">
            <h3 className="text-gray-700 text-xs font-semibold mb-2 px-2">{section}</h3>
            {menuItems
              .filter((item) => item.section === section)
              .map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id)
                      setSidebarOpen(false)
                    }}
                    className={`sidebar-item w-full flex items-center px-3 py-2 rounded-lg text-left mb-1 text-sm ${
                      activeSection === item.id
                        ? "bg-yellow-500/90 text-gray-900 font-medium shadow-lg"
                        : "text-gray-800 hover:bg-yellow-300/50"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-3 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                )
              })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-yellow-300/30">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0 ring-2 ring-white/20">
            <img src="/logo-oficial.jpg" alt="Bebidas ON Logo" className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <p className="text-gray-900 font-medium text-sm truncate">Renan</p>
            <p className="text-gray-700 text-xs">Desenvolvido por</p>
            <p className="text-gray-700 text-xs">GV SOFTWARE</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-60">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700 flex-shrink-0">
          <div className="flex items-center min-w-0">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-gray-300 hover:text-white mr-3 flex-shrink-0"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
            </Sheet>

            {showBackButton() && (
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white mr-3 flex-shrink-0">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <h1 className="text-white text-lg lg:text-xl font-medium truncate">{getPageTitle()}</h1>
          </div>

          <div className="flex items-center space-x-2 flex-shrink-0">
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white relative">
              <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center text-[10px]">
                2
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex text-gray-300 hover:text-white">
              <Sun className="w-4 h-4 lg:w-5 lg:h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex text-gray-300 hover:text-white">
              <HelpCircle className="w-4 h-4 lg:w-5 lg:h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
              <Settings className="w-4 h-4 lg:w-5 lg:h-5" />
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  )
}

function PainelContent({ database }: { database: any }) {
  const totalVendas = database.lancamentos
    .filter((l: any) => l.tipo === "Entrada")
    .reduce((sum: number, l: any) => sum + l.valor, 0)

  const produtosBaixoEstoque = database.produtos.filter((p: any) => p.estoque <= p.estoque_minimo)

  const handleRefreshData = async () => {
    await database.loadAllData()
    alert("Dados atualizados com sucesso!")
  }

  // Preparar dados para gráficos
  const salesData = database.lancamentos
    .filter((l: any) => l.tipo === "Entrada")
    .slice(-7)
    .map((l: any) => ({
      data: l.data.split(",")[0],
      valor: l.valor,
    }))

  const paymentData = database.lancamentos.reduce((acc: any, l: any) => {
    const existing = acc.find((item: any) => item.metodo === l.metodo)
    if (existing) {
      existing.valor += l.valor
      existing.count += 1
    } else {
      acc.push({ metodo: l.metodo, valor: l.valor, count: 1 })
    }
    return acc
  }, [])

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6">
        <p className="text-gray-400 mb-4 text-sm lg:text-base">Visão geral do seu negócio.</p>
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mb-6">
          <Button
            variant="outline"
            className="bg-gray-800 border-gray-600 text-gray-300 text-sm"
            onClick={handleRefreshData}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar Dados
          </Button>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 text-sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            Relatórios
          </Button>
        </div>
      </div>

      {/* Cards principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-green-500 border-0 text-white">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Vendas</p>
                <p className="text-xl lg:text-2xl font-bold">R$ {totalVendas.toFixed(2)}</p>
              </div>
              <DollarSign className="w-6 h-6 lg:w-8 lg:h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-500 border-0 text-white">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Clientes</p>
                <p className="text-xl lg:text-2xl font-bold">{database.clientes.length}</p>
              </div>
              <Users className="w-6 h-6 lg:w-8 lg:h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-500 border-0 text-white">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Pedidos</p>
                <p className="text-xl lg:text-2xl font-bold">{database.pedidos.length}</p>
              </div>
              <ShoppingCart className="w-6 h-6 lg:w-8 lg:h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-500 border-0 text-white">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">Estoque</p>
                <p className="text-xl lg:text-2xl font-bold">{produtosBaixoEstoque.length}</p>
                <p className="text-red-100 text-xs">{produtosBaixoEstoque.length} produtos com estoque baixo</p>
              </div>
              <Package className="w-6 h-6 lg:w-8 lg:h-8 text-red-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-yellow-500 flex items-center text-lg">
              <TrendingUp className="w-5 h-5 mr-2" />
              Evolução das Vendas
            </CardTitle>
            <CardDescription className="text-gray-400 text-sm">Últimas vendas registradas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <SalesChart data={salesData} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-yellow-500 flex items-center text-lg">
              <CreditCard className="w-5 h-5 mr-2" />
              Métodos de Pagamento
            </CardTitle>
            <CardDescription className="text-gray-400 text-sm">Distribuição por forma de pagamento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <PaymentMethodChart data={paymentData} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seções inferiores */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Vendas Recentes */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-4">
            <CardTitle className="text-yellow-500 flex items-center text-lg">
              <DollarSign className="w-5 h-5 mr-2" />
              Vendas Recentes
            </CardTitle>
            <CardDescription className="text-gray-400 text-sm">Últimas transações de entrada</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {database.lancamentos
                .filter((l: any) => l.tipo === "Entrada")
                .slice(-5)
                .map((lancamento: any) => (
                  <div key={lancamento.id} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <div>
                      <p className="text-white font-medium text-sm">{lancamento.descricao}</p>
                      <p className="text-gray-400 text-xs">{lancamento.data}</p>
                    </div>
                    <p className="text-green-400 font-bold">R$ {lancamento.valor.toFixed(2)}</p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerta de Estoque Baixo */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-4">
            <CardTitle className="text-red-400 flex items-center text-lg">
              <AlertCircle className="w-5 h-5 mr-2" />
              Alerta de Estoque Baixo
            </CardTitle>
            <CardDescription className="text-gray-400 text-sm">
              Produtos que precisam de reposição urgente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="space-y-3">
                  {produtosBaixoEstoque.slice(0, 5).map((produto: any) => (
                    <div key={produto.id} className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="text-white font-medium text-sm truncate">{produto.nome}</p>
                        <p className="text-gray-400 text-xs">{produto.categoria}</p>
                      </div>
                      <span className="text-white font-bold text-sm ml-2">{produto.estoque} unid.</span>
                    </div>
                  ))}
                </div>

                {produtosBaixoEstoque.length > 5 && (
                  <div className="mt-4 text-right">
                    <Button variant="link" className="text-yellow-500 p-0 text-sm">
                      Ver todos ({produtosBaixoEstoque.length})
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Continuar com os outros componentes...
function PedidosContent({ database, searchTerm, setSearchTerm }: any) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newPedido, setNewPedido] = useState({
    cliente_nome: "",
    cliente_id: 0,
    produtos: [],
    total: 0,
    status: "Pendente" as const,
  })

  const filteredPedidos = database.pedidos.filter(
    (pedido: any) =>
      pedido.cliente_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.produtos.some((p: string) => p.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleAddPedido = async () => {
    try {
      await database.addPedido({
        ...newPedido,
        data: new Date().toISOString().split("T")[0],
      })
      setNewPedido({ cliente_nome: "", cliente_id: 0, produtos: [], total: 0, status: "Pendente" })
      setIsAddModalOpen(false)
      alert("Pedido adicionado com sucesso!")
    } catch (error) {
      console.error("Erro ao adicionar pedido:", error)
      alert("Erro ao adicionar pedido")
    }
  }

  const handleDeletePedido = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este pedido?")) {
      try {
        await database.deletePedido(id)
        alert("Pedido excluído com sucesso!")
      } catch (error) {
        console.error("Erro ao excluir pedido:", error)
        alert("Erro ao excluir pedido")
      }
    }
  }

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await database.updatePedido(id, { status: newStatus })
    } catch (error) {
      console.error("Erro ao atualizar status:", error)
      alert("Erro ao atualizar status")
    }
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center mb-4 space-y-4 lg:space-y-0">
          <div className="flex items-center flex-1">
            <div className="bg-yellow-500 p-2 rounded-lg mr-4 flex-shrink-0">
              <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6 text-gray-900" />
            </div>
            <div className="min-w-0">
              <h2 className="text-white text-lg lg:text-xl font-medium">Histórico de Pedidos</h2>
              <p className="text-gray-400 text-sm">Visualize e gerencie os pedidos dos clientes</p>
            </div>
          </div>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 w-full lg:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Novo Pedido
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-white">Novo Pedido</DialogTitle>
                <DialogDescription className="text-gray-400">Adicione um novo pedido ao sistema</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-400">Cliente</Label>
                  <Select
                    onValueChange={(value) => {
                      const cliente = database.clientes.find((c: any) => c.nome === value)
                      setNewPedido({ ...newPedido, cliente_nome: value, cliente_id: cliente?.id || 0 })
                    }}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Selecione um cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {database.clientes.map((cliente: any) => (
                        <SelectItem key={cliente.id} value={cliente.nome}>
                          {cliente.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-400">Total (R$)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={newPedido.total}
                    onChange={(e) => setNewPedido({ ...newPedido, total: Number.parseFloat(e.target.value) || 0 })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddPedido} className="bg-yellow-500 hover:bg-yellow-600 text-gray-900">
                    Adicionar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">Lista de Pedidos ({filteredPedidos.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar pedidos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {filteredPedidos.length === 0 ? (
            <div className="text-center py-12 lg:py-20">
              <ShoppingCart className="w-12 h-12 lg:w-16 lg:h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Nenhum pedido encontrado.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPedidos.map((pedido: any) => (
                <Card key={pedido.id} className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={
                            pedido.status === "Entregue"
                              ? "bg-green-500"
                              : pedido.status === "Pendente"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }
                        >
                          {pedido.status}
                        </Badge>
                        <span className="text-gray-400 text-sm">#{pedido.id}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Select value={pedido.status} onValueChange={(value) => handleStatusChange(pedido.id, value)}>
                          <SelectTrigger className="w-32 bg-gray-600 border-gray-500 text-white text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pendente">Pendente</SelectItem>
                            <SelectItem value="Entregue">Entregue</SelectItem>
                            <SelectItem value="Cancelado">Cancelado</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeletePedido(pedido.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <h3 className="text-white font-medium mb-1">{pedido.cliente_nome}</h3>
                    <p className="text-gray-400 text-sm mb-2">
                      Produtos: {Array.isArray(pedido.produtos) ? pedido.produtos.join(", ") : "N/A"}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold">R$ {pedido.total.toFixed(2)}</span>
                      <span className="text-gray-400 text-sm">{pedido.data}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Continuar implementando os outros componentes com a mesma estrutura...
// Por questões de espaço, vou mostrar apenas alguns exemplos principais

function EstoqueContent({ database, searchTerm, setSearchTerm }: any) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newProduto, setNewProduto] = useState({
    nome: "",
    categoria: "",
    preco: 0,
    estoque: 0,
    estoque_minimo: 0,
  })

  const filteredProdutos = database.produtos.filter(
    (produto: any) =>
      produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produto.categoria.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddProduto = async () => {
    try {
      await database.addProduto(newProduto)
      setNewProduto({ nome: "", categoria: "", preco: 0, estoque: 0, estoque_minimo: 0 })
      setIsAddModalOpen(false)
      alert("Produto adicionado com sucesso!")
    } catch (error) {
      console.error("Erro ao adicionar produto:", error)
      alert("Erro ao adicionar produto")
    }
  }

  const handleDeleteProduto = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await database.deleteProduto(id)
        alert("Produto excluído com sucesso!")
      } catch (error) {
        console.error("Erro ao excluir produto:", error)
        alert("Erro ao excluir produto")
      }
    }
  }

  const handleUpdateEstoque = async (id: number, novoEstoque: number) => {
    try {
      await database.updateProduto(id, { estoque: novoEstoque })
    } catch (error) {
      console.error("Erro ao atualizar estoque:", error)
      alert("Erro ao atualizar estoque")
    }
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 space-y-4 lg:space-y-0">
          <div className="flex items-center">
            <div className="bg-yellow-500 p-2 rounded-lg mr-4 flex-shrink-0">
              <Package className="w-5 h-5 lg:w-6 lg:h-6 text-gray-900" />
            </div>
            <div className="min-w-0">
              <h2 className="text-white text-lg lg:text-xl font-medium">Produtos</h2>
              <p className="text-gray-400 text-sm">Visualize e gerencie seus produtos</p>
            </div>
          </div>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 w-full lg:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-white">Novo Produto</DialogTitle>
                <DialogDescription className="text-gray-400">Adicione um novo produto ao estoque</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-400">Nome do Produto</Label>
                  <Input
                    value={newProduto.nome}
                    onChange={(e) => setNewProduto({ ...newProduto, nome: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-400">Categoria</Label>
                  <Input
                    value={newProduto.categoria}
                    onChange={(e) => setNewProduto({ ...newProduto, categoria: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-400">Preço (R$)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={newProduto.preco}
                      onChange={(e) => setNewProduto({ ...newProduto, preco: Number.parseFloat(e.target.value) || 0 })}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-400">Estoque</Label>
                    <Input
                      type="number"
                      value={newProduto.estoque}
                      onChange={(e) => setNewProduto({ ...newProduto, estoque: Number.parseInt(e.target.value) || 0 })}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-gray-400">Estoque Mínimo</Label>
                  <Input
                    type="number"
                    value={newProduto.estoque_minimo}
                    onChange={(e) =>
                      setNewProduto({ ...newProduto, estoque_minimo: Number.parseInt(e.target.value) || 0 })
                    }
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddProduto} className="bg-yellow-500 hover:bg-yellow-600 text-gray-900">
                    Adicionar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center">
              <Package className="w-5 h-5 text-yellow-500 mr-2" />
              <CardTitle className="text-yellow-500 text-lg">Lista de Produtos</CardTitle>
              <div className="ml-2 w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <CardDescription className="text-gray-400">
            {filteredProdutos.length} produto(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar produtos por nome, categoria..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Gráfico de Estoque */}
          <Card className="bg-gray-700 border-gray-600 mb-6">
            <CardHeader>
              <CardTitle className="text-yellow-500 text-lg">Níveis de Estoque</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <StockChart
                  data={filteredProdutos.map((p: any) => ({
                    nome: p.nome.length > 10 ? p.nome.substring(0, 10) + "..." : p.nome,
                    estoque: p.estoque,
                    estoqueMinimo: p.estoque_minimo,
                  }))}
                />
              </div>
            </CardContent>
          </Card>

          {filteredProdutos.length === 0 ? (
            <div className="text-center py-12 lg:py-20">
              <Package className="w-12 h-12 lg:w-16 lg:h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">Nenhum produto encontrado.</p>
              <p className="text-gray-500 text-sm">Clique em 'Adicionar Produto' para começar.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProdutos.map((produto: any) => (
                <Card key={produto.id} className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge className={produto.estoque <= produto.estoque_minimo ? "bg-red-500" : "bg-green-500"}>
                          {produto.estoque <= produto.estoque_minimo ? "Baixo" : "OK"}
                        </Badge>
                        <span className="text-gray-400 text-sm">{produto.categoria}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteProduto(produto.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <h3 className="text-white font-medium mb-1">{produto.nome}</h3>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-gray-400 text-sm">Preço</p>
                        <p className="text-white font-bold">R$ {produto.preco.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Estoque</p>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            value={produto.estoque}
                            onChange={(e) => handleUpdateEstoque(produto.id, Number.parseInt(e.target.value) || 0)}
                            className="w-20 h-8 bg-gray-600 border-gray-500 text-white text-sm"
                          />
                          <span className="text-gray-400 text-sm">/ {produto.estoque_minimo} min</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function FinanceiroContent({ database, searchTerm, setSearchTerm }: any) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newLancamento, setNewLancamento] = useState({
    tipo: "Entrada" as const,
    descricao: "",
    categoria: "",
    valor: 0,
    metodo: "Dinheiro",
  })

  const totalEntradas = database.lancamentos
    .filter((l: any) => l.tipo === "Entrada")
    .reduce((sum: number, l: any) => sum + l.valor, 0)

  const totalSaidas = database.lancamentos
    .filter((l: any) => l.tipo === "Saída")
    .reduce((sum: number, l: any) => sum + l.valor, 0)

  const saldoTotal = totalEntradas - totalSaidas

  const filteredLancamentos = database.lancamentos.filter(
    (lancamento: any) =>
      lancamento.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lancamento.categoria.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Preparar dados para gráfico de receita
  const revenueData = [
    {
      mes: "Jan",
      entradas: totalEntradas * 0.8,
      saidas: totalSaidas * 0.7,
      lucro: totalEntradas * 0.8 - totalSaidas * 0.7,
    },
    {
      mes: "Fev",
      entradas: totalEntradas * 0.9,
      saidas: totalSaidas * 0.8,
      lucro: totalEntradas * 0.9 - totalSaidas * 0.8,
    },
    { mes: "Mar", entradas: totalEntradas, saidas: totalSaidas, lucro: saldoTotal },
  ]

  const handleAddLancamento = async () => {
    try {
      await database.addLancamento({
        ...newLancamento,
        data: new Date().toLocaleString("pt-BR"),
      })
      setNewLancamento({ tipo: "Entrada", descricao: "", categoria: "", valor: 0, metodo: "Dinheiro" })
      setIsAddModalOpen(false)
      alert("Lançamento adicionado com sucesso!")
    } catch (error) {
      console.error("Erro ao adicionar lançamento:", error)
      alert("Erro ao adicionar lançamento")
    }
  }

  const handleDeleteLancamento = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este lançamento?")) {
      try {
        await database.deleteLancamento(id)
        alert("Lançamento excluído com sucesso!")
      } catch (error) {
        console.error("Erro ao excluir lançamento:", error)
        alert("Erro ao excluir lançamento")
      }
    }
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 space-y-4 lg:space-y-0">
          <div className="flex items-center">
            <div className="bg-yellow-500 p-2 rounded-lg mr-4 flex-shrink-0">
              <DollarSign className="w-5 h-5 lg:w-6 lg:h-6 text-gray-900" />
            </div>
            <div className="min-w-0">
              <h2 className="text-yellow-500 text-lg lg:text-xl font-medium">Gestão Financeira</h2>
              <p className="text-gray-400 text-sm">Controle suas finanças, contas a pagar e receber.</p>
            </div>
          </div>
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 mb-6 w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Lançamento
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">Novo Lançamento</DialogTitle>
              <DialogDescription className="text-gray-400">
                Adicione uma nova entrada ou saída financeira
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-400">Tipo</Label>
                <Select
                  value={newLancamento.tipo}
                  onValueChange={(value: "Entrada" | "Saída") => setNewLancamento({ ...newLancamento, tipo: value })}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Entrada">Entrada</SelectItem>
                    <SelectItem value="Saída">Saída</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-400">Descrição</Label>
                <Input
                  value={newLancamento.descricao}
                  onChange={(e) => setNewLancamento({ ...newLancamento, descricao: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-400">Categoria</Label>
                <Input
                  value={newLancamento.categoria}
                  onChange={(e) => setNewLancamento({ ...newLancamento, categoria: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-400">Valor (R$)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={newLancamento.valor}
                    onChange={(e) =>
                      setNewLancamento({ ...newLancamento, valor: Number.parseFloat(e.target.value) || 0 })
                    }
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-400">Método</Label>
                  <Select
                    value={newLancamento.metodo}
                    onValueChange={(value) => setNewLancamento({ ...newLancamento, metodo: value })}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                      <SelectItem value="PIX">PIX</SelectItem>
                      <SelectItem value="Cartão">Cartão</SelectItem>
                      <SelectItem value="Fiado">Fiado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddLancamento} className="bg-yellow-500 hover:bg-yellow-600 text-gray-900">
                  Adicionar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cards de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center">
              <div className="bg-green-500 p-2 rounded-lg mr-4 flex-shrink-0">
                <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-gray-400 text-sm">Total de Entradas</p>
                <p className="text-green-400 text-lg lg:text-xl font-bold">R$ {totalEntradas.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center">
              <div className="bg-red-500 p-2 rounded-lg mr-4 flex-shrink-0">
                <TrendingDown className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-gray-400 text-sm">Total de Saídas</p>
                <p className="text-red-400 text-lg lg:text-xl font-bold">R$ {totalSaidas.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center">
              <div className="bg-yellow-500 p-2 rounded-lg mr-4 flex-shrink-0">
                <DollarSign className="w-5 h-5 lg:w-6 lg:h-6 text-gray-900" />
              </div>
              <div className="min-w-0">
                <p className="text-gray-400 text-sm">Saldo Total</p>
                <p className={`text-lg lg:text-xl font-bold ${saldoTotal >= 0 ? "text-green-400" : "text-red-400"}`}>
                  R$ {saldoTotal.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Receita */}
      <Card className="bg-gray-800 border-gray-700 mb-6">
        <CardHeader>
          <CardTitle className="text-yellow-500 flex items-center text-lg">
            <BarChart3 className="w-5 h-5 mr-2" />
            Fluxo de Caixa
          </CardTitle>
          <CardDescription className="text-gray-400 text-sm">Entradas, saídas e lucro por período</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <RevenueChart data={revenueData} />
          </div>
        </CardContent>
      </Card>

      {/* Histórico de lançamentos */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex items-center">
            <Filter className="w-5 h-5 text-yellow-500 mr-2" />
            <CardTitle className="text-yellow-500 text-lg">
              Histórico de Lançamentos ({filteredLancamentos.length})
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar lançamentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Mobile-friendly cards */}
          <div className="space-y-4 lg:hidden">
            {filteredLancamentos.map((item: any) => (
              <Card key={item.id} className="bg-gray-700 border-gray-600">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={item.tipo === "Entrada" ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
                      {item.tipo}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-400 hover:text-red-300"
                      onClick={() => handleDeleteLancamento(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <h3 className="text-white font-medium mb-1">{item.descricao}</h3>
                  <p className="text-gray-400 text-sm mb-2">{item.categoria}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">R$ {item.valor.toFixed(2)}</span>
                    <span className="text-gray-400 text-sm">{item.metodo}</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">{item.data}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-400 py-3 px-4">Tipo</th>
                  <th className="text-left text-gray-400 py-3 px-4">Descrição</th>
                  <th className="text-left text-gray-400 py-3 px-4">Categoria</th>
                  <th className="text-left text-gray-400 py-3 px-4">Valor</th>
                  <th className="text-left text-gray-400 py-3 px-4">Método</th>
                  <th className="text-left text-gray-400 py-3 px-4">Data</th>
                  <th className="text-left text-gray-400 py-3 px-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredLancamentos.map((item: any) => (
                  <tr key={item.id} className="border-b border-gray-700">
                    <td className="py-3 px-4">
                      <Badge className={item.tipo === "Entrada" ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
                        {item.tipo}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-white">{item.descricao}</td>
                    <td className="py-3 px-4 text-gray-400">{item.categoria}</td>
                    <td className="py-3 px-4 text-white">R$ {item.valor.toFixed(2)}</td>
                    <td className="py-3 px-4 text-gray-400">{item.metodo}</td>
                    <td className="py-3 px-4 text-gray-400">{item.data}</td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-400 hover:text-red-300"
                        onClick={() => handleDeleteLancamento(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function RelatoriosContent({ database }: any) {
  const [periodo, setPeriodo] = useState("30dias")
  const [activeTab, setActiveTab] = useState("vendas")

  const totalVendas = database.lancamentos
    .filter((l: any) => l.tipo === "Entrada")
    .reduce((sum: number, l: any) => sum + l.valor, 0)

  const handleExportPDF = () => {
    alert("Exportando relatório em PDF...")
  }

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(database, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "relatorio-completo.json"
    link.click()
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Relatório Bebidas ON",
        text: `Relatório de vendas: R$ ${totalVendas.toFixed(2)}`,
        url: window.location.href,
      })
    } else {
      alert("Compartilhamento não suportado neste navegador")
    }
  }

  // Preparar dados para gráficos
  const salesData = database.lancamentos
    .filter((l: any) => l.tipo === "Entrada")
    .slice(-7)
    .map((l: any) => ({
      data: l.data.split(",")[0],
      valor: l.valor,
    }))

  const paymentData = database.lancamentos.reduce((acc: any, l: any) => {
    const existing = acc.find((item: any) => item.metodo === l.metodo)
    if (existing) {
      existing.valor += l.valor
      existing.count += 1
    } else {
      acc.push({ metodo: l.metodo, valor: l.valor, count: 1 })
    }
    return acc
  }, [])

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 space-y-4 lg:space-y-0">
          <div className="flex items-center">
            <div className="bg-yellow-500 p-2 rounded-lg mr-4 flex-shrink-0">
              <BarChart3 className="w-5 h-5 lg:w-6 lg:h-6 text-gray-900" />
            </div>
            <div className="min-w-0">
              <h2 className="text-white text-lg lg:text-xl font-medium">Relatórios Avançados</h2>
              <p className="text-gray-400 text-sm">Análises detalhadas e insights do seu negócio</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Button
              variant="outline"
              className="bg-gray-800 border-gray-600 text-gray-300 text-sm"
              onClick={handleShare}
            >
              <Share className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
            <Button
              variant="outline"
              className="bg-gray-800 border-gray-600 text-gray-300 text-sm"
              onClick={handleExportPDF}
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar PDF
            </Button>
            <Button
              variant="outline"
              className="bg-gray-800 border-gray-600 text-gray-300 text-sm"
              onClick={handleExportJSON}
            >
              <FileText className="w-4 h-4 mr-2" />
              Exportar JSON
            </Button>
            <Button variant="outline" className="bg-gray-800 border-gray-600 text-gray-300 text-sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar
            </Button>
          </div>
        </div>
      </div>

      {/* Filtro de período */}
      <div className="mb-6">
        <Label className="text-gray-400 mb-2 block">Período</Label>
        <Select value={periodo} onValueChange={setPeriodo}>
          <SelectTrigger className="w-full sm:w-48 bg-gray-700 border-gray-600 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7dias">Últimos 7 dias</SelectItem>
            <SelectItem value="30dias">Últimos 30 dias</SelectItem>
            <SelectItem value="90dias">Últimos 90 dias</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cards de métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center">
              <div className="bg-green-500 p-2 rounded-lg mr-4 flex-shrink-0">
                <DollarSign className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-gray-400 text-sm">Vendas Totais</p>
                <p className="text-green-400 text-lg lg:text-xl font-bold">R$ {totalVendas.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center">
              <div className="bg-blue-500 p-2 rounded-lg mr-4 flex-shrink-0">
                <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-gray-400 text-sm">Total de Pedidos</p>
                <p className="text-white text-lg lg:text-xl font-bold">{database.pedidos.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center">
              <div className="bg-purple-500 p-2 rounded-lg mr-4 flex-shrink-0">
                <Users className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-gray-400 text-sm">Clientes</p>
                <p className="text-white text-lg lg:text-xl font-bold">{database.clientes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center">
              <div className="bg-orange-500 p-2 rounded-lg mr-4 flex-shrink-0">
                <Package className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-gray-400 text-sm">Produtos</p>
                <p className="text-white text-lg lg:text-xl font-bold">{database.produtos.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de relatórios */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-1 bg-gray-800 p-1 rounded-lg">
          {[
            { id: "vendas", label: "Vendas", icon: TrendingUp },
            { id: "pedidos", label: "Pedidos", icon: ShoppingCart },
            { id: "produtos", label: "Produtos", icon: Package },
            { id: "clientes", label: "Clientes", icon: Users },
            { id: "financeiro", label: "Financeiro", icon: DollarSign },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-sm ${
                  activeTab === tab.id ? "bg-yellow-500 text-gray-900 hover:bg-" : "text-gray-400 hover:text-white"
                }`}
                variant={activeTab === tab.id ? "default" : "ghost"}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Gráficos Interativos */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 text-yellow-500 mr-2" />
              <CardTitle className="text-yellow-500 text-lg">Evolução das Vendas</CardTitle>
            </div>
            <CardDescription className="text-gray-400 text-sm">Vendas por período selecionado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <SalesChart data={salesData} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center">
              <CreditCard className="w-5 h-5 text-yellow-500 mr-2" />
              <CardTitle className="text-yellow-500 text-lg">Métodos de Pagamento</CardTitle>
            </div>
            <CardDescription className="text-gray-400 text-sm">Distribuição por forma de pagamento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <PaymentMethodChart data={paymentData} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resumo detalhado por aba */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-500 text-lg">
            Resumo Detalhado - {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeTab === "vendas" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Maior Venda</p>
                  <p className="text-white font-bold">
                    R${" "}
                    {Math.max(
                      ...database.lancamentos.filter((l: any) => l.tipo === "Entrada").map((l: any) => l.valor),
                      0,
                    ).toFixed(2)}
                  </p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Venda Média</p>
                  <p className="text-white font-bold">
                    R${" "}
                    {database.lancamentos.filter((l: any) => l.tipo === "Entrada").length > 0
                      ? (totalVendas / database.lancamentos.filter((l: any) => l.tipo === "Entrada").length).toFixed(2)
                      : "0.00"}
                  </p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Total de Transações</p>
                  <p className="text-white font-bold">
                    {database.lancamentos.filter((l: any) => l.tipo === "Entrada").length}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "produtos" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Produtos em Estoque</p>
                  <p className="text-white font-bold">{database.produtos.filter((p: any) => p.estoque > 0).length}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Estoque Baixo</p>
                  <p className="text-red-400 font-bold">
                    {database.produtos.filter((p: any) => p.estoque <= p.estoque_minimo).length}
                  </p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Valor Total Estoque</p>
                  <p className="text-white font-bold">
                    R$ {database.produtos.reduce((sum: number, p: any) => sum + p.preco * p.estoque, 0).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "clientes" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Cliente Top</p>
                  <p className="text-white font-bold">
                    {database.clientes.length > 0
                      ? database.clientes.reduce((prev: any, current: any) =>
                          prev.total_gasto > current.total_gasto ? prev : current,
                        ).nome
                      : "N/A"}
                  </p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Gasto Médio</p>
                  <p className="text-white font-bold">
                    R${" "}
                    {database.clientes.length > 0
                      ? (
                          database.clientes.reduce((sum: number, c: any) => sum + (c.total_gasto || 0), 0) /
                          database.clientes.length
                        ).toFixed(2)
                      : "0.00"}
                  </p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Novos Este Mês</p>
                  <p className="text-white font-bold">{database.clientes.length}</p>
                </div>
              </div>
            </div>
          )}

          {(activeTab === "pedidos" || activeTab === "financeiro") && (
            <div className="text-center py-8">
              <p className="text-gray-400">Dados detalhados para {activeTab} carregados do banco de dados</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Implementar os outros componentes seguindo o mesmo padrão...
function ComprovanteFiadoContent({ database }: any) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newComprovante, setNewComprovante] = useState({
    cliente_nome: "",
    valor: 0,
    produtos: [] as string[],
    telefone: "",
    endereco: "",
    metodo_pagamento: "Fiado",
    status: "Pendente" as const,
  })

  const handleAddComprovante = async () => {
    try {
      await database.addComprovante({
        ...newComprovante,
        data: new Date().toISOString().split("T")[0],
      })
      setNewComprovante({
        cliente_nome: "",
        valor: 0,
        produtos: [],
        telefone: "",
        endereco: "",
        metodo_pagamento: "Fiado",
        status: "Pendente",
      })
      setIsAddModalOpen(false)
      alert("Comprovante adicionado com sucesso!")
    } catch (error) {
      console.error("Erro ao adicionar comprovante:", error)
      alert("Erro ao adicionar comprovante")
    }
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 space-y-4 lg:space-y-0">
          <div className="flex items-center">
            <div className="bg-yellow-500 p-2 rounded-lg mr-4 flex-shrink-0">
              <Receipt className="w-5 h-5 lg:w-6 lg:h-6 text-gray-900" />
            </div>
            <div className="min-w-0">
              <h2 className="text-white text-lg lg:text-xl font-medium">Comprovantes Fiado</h2>
              <p className="text-gray-400 text-sm">Gerencie vendas fiado e controle de pagamentos</p>
            </div>
          </div>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 w-full lg:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Novo Comprovante
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-white">Novo Comprovante Fiado</DialogTitle>
                <DialogDescription className="text-gray-400">Registre uma nova venda fiado</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-400">Nome do Cliente</Label>
                  <Input
                    value={newComprovante.cliente_nome}
                    onChange={(e) => setNewComprovante({ ...newComprovante, cliente_nome: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Digite o nome do cliente"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-400">Valor (R$)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={newComprovante.valor}
                      onChange={(e) =>
                        setNewComprovante({ ...newComprovante, valor: Number.parseFloat(e.target.value) || 0 })
                      }
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-400">Telefone</Label>
                    <Input
                      value={newComprovante.telefone}
                      onChange={(e) => setNewComprovante({ ...newComprovante, telefone: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-gray-400">Endereço</Label>
                  <Input
                    value={newComprovante.endereco}
                    onChange={(e) => setNewComprovante({ ...newComprovante, endereco: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Endereço para entrega"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddComprovante} className="bg-yellow-500 hover:bg-yellow-600 text-gray-900">
                    Adicionar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">Comprovantes ({database.comprovantes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {database.comprovantes.length === 0 ? (
            <div className="text-center py-12 lg:py-20">
              <Receipt className="w-12 h-12 lg:w-16 lg:h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">Nenhum comprovante encontrado.</p>
              <p className="text-gray-500 text-sm">Clique em 'Novo Comprovante' para começar.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {database.comprovantes.map((comprovante: any) => (
                <Card key={comprovante.id} className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={comprovante.status === "Pago" ? "bg-green-500" : "bg-yellow-500"}>
                        {comprovante.status}
                      </Badge>
                      <span className="text-gray-400 text-sm">#{comprovante.id}</span>
                    </div>
                    <h3 className="text-white font-medium mb-1">{comprovante.cliente_nome}</h3>
                    <p className="text-gray-400 text-sm mb-2">{comprovante.telefone}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold">R$ {comprovante.valor.toFixed(2)}</span>
                      <span className="text-gray-400 text-sm">{comprovante.data}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function ClientesContent({ database, searchTerm, setSearchTerm }: any) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newCliente, setNewCliente] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    total_gasto: 0,
  })

  const filteredClientes = database.clientes.filter(
    (cliente: any) =>
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddCliente = async () => {
    try {
      await database.addCliente(newCliente)
      setNewCliente({ nome: "", email: "", telefone: "", endereco: "", total_gasto: 0 })
      setIsAddModalOpen(false)
      alert("Cliente adicionado com sucesso!")
    } catch (error) {
      console.error("Erro ao adicionar cliente:", error)
      alert("Erro ao adicionar cliente")
    }
  }

  const handleDeleteCliente = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este cliente?")) {
      try {
        await database.deleteCliente(id)
        alert("Cliente excluído com sucesso!")
      } catch (error) {
        console.error("Erro ao excluir cliente:", error)
        alert("Erro ao excluir cliente")
      }
    }
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 space-y-4 lg:space-y-0">
          <div className="flex items-center">
            <div className="bg-yellow-500 p-2 rounded-lg mr-4 flex-shrink-0">
              <Users className="w-5 h-5 lg:w-6 lg:h-6 text-gray-900" />
            </div>
            <div className="min-w-0">
              <h2 className="text-white text-lg lg:text-xl font-medium">Gestão de Clientes</h2>
              <p className="text-gray-400 text-sm">Cadastre e gerencie seus clientes</p>
            </div>
          </div>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 w-full lg:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Novo Cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-white">Novo Cliente</DialogTitle>
                <DialogDescription className="text-gray-400">Adicione um novo cliente ao sistema</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-400">Nome Completo</Label>
                  <Input
                    value={newCliente.nome}
                    onChange={(e) => setNewCliente({ ...newCliente, nome: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Digite o nome completo"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-400">Email</Label>
                    <Input
                      type="email"
                      value={newCliente.email}
                      onChange={(e) => setNewCliente({ ...newCliente, email: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="email@exemplo.com"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-400">Telefone</Label>
                    <Input
                      value={newCliente.telefone}
                      onChange={(e) => setNewCliente({ ...newCliente, telefone: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-gray-400">Endereço</Label>
                  <Input
                    value={newCliente.endereco}
                    onChange={(e) => setNewCliente({ ...newCliente, endereco: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Endereço completo"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddCliente} className="bg-yellow-500 hover:bg-yellow-600 text-gray-900">
                    Adicionar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">Lista de Clientes ({filteredClientes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar clientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {filteredClientes.length === 0 ? (
            <div className="text-center py-12 lg:py-20">
              <Users className="w-12 h-12 lg:w-16 lg:h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">Nenhum cliente encontrado.</p>
              <p className="text-gray-500 text-sm">Clique em 'Novo Cliente' para começar.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredClientes.map((cliente: any) => (
                <Card key={cliente.id} className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-medium">{cliente.nome}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteCliente(cliente.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <p className="text-gray-400">📧 {cliente.email || "Não informado"}</p>
                      <p className="text-gray-400">📱 {cliente.telefone || "Não informado"}</p>
                      <p className="text-gray-400">📍 {cliente.endereco || "Não informado"}</p>
                      <p className="text-green-400 font-bold">💰 R$ {cliente.total_gasto.toFixed(2)}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function FornecedoresContent({ database, searchTerm, setSearchTerm }: any) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newFornecedor, setNewFornecedor] = useState({
    nome: "",
    email: "",
    telefone: "",
    cnpj: "",
    endereco: "",
  })

  const filteredFornecedores = database.fornecedores.filter(
    (fornecedor: any) =>
      fornecedor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fornecedor.cnpj?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddFornecedor = async () => {
    try {
      await database.addFornecedor(newFornecedor)
      setNewFornecedor({ nome: "", email: "", telefone: "", cnpj: "", endereco: "" })
      setIsAddModalOpen(false)
      alert("Fornecedor adicionado com sucesso!")
    } catch (error) {
      console.error("Erro ao adicionar fornecedor:", error)
      alert("Erro ao adicionar fornecedor")
    }
  }

  const handleDeleteFornecedor = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este fornecedor?")) {
      try {
        await database.deleteFornecedor(id)
        alert("Fornecedor excluído com sucesso!")
      } catch (error) {
        console.error("Erro ao excluir fornecedor:", error)
        alert("Erro ao excluir fornecedor")
      }
    }
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 space-y-4 lg:space-y-0">
          <div className="flex items-center">
            <div className="bg-yellow-500 p-2 rounded-lg mr-4 flex-shrink-0">
              <Truck className="w-5 h-5 lg:w-6 lg:h-6 text-gray-900" />
            </div>
            <div className="min-w-0">
              <h2 className="text-white text-lg lg:text-xl font-medium">Gestão de Fornecedores</h2>
              <p className="text-gray-400 text-sm">Cadastre e gerencie seus fornecedores</p>
            </div>
          </div>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 w-full lg:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Novo Fornecedor
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-white">Novo Fornecedor</DialogTitle>
                <DialogDescription className="text-gray-400">Adicione um novo fornecedor ao sistema</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-400">Nome da Empresa</Label>
                  <Input
                    value={newFornecedor.nome}
                    onChange={(e) => setNewFornecedor({ ...newFornecedor, nome: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Digite o nome da empresa"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-400">Email</Label>
                    <Input
                      type="email"
                      value={newFornecedor.email}
                      onChange={(e) => setNewFornecedor({ ...newFornecedor, email: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="email@empresa.com"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-400">Telefone</Label>
                    <Input
                      value={newFornecedor.telefone}
                      onChange={(e) => setNewFornecedor({ ...newFornecedor, telefone: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="(11) 3333-3333"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-gray-400">CNPJ</Label>
                  <Input
                    value={newFornecedor.cnpj}
                    onChange={(e) => setNewFornecedor({ ...newFornecedor, cnpj: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="00.000.000/0000-00"
                  />
                </div>
                <div>
                  <Label className="text-gray-400">Endereço</Label>
                  <Input
                    value={newFornecedor.endereco}
                    onChange={(e) => setNewFornecedor({ ...newFornecedor, endereco: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Endereço completo"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddFornecedor} className="bg-yellow-500 hover:bg-yellow-600 text-gray-900">
                    Adicionar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">Lista de Fornecedores ({filteredFornecedores.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar fornecedores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {filteredFornecedores.length === 0 ? (
            <div className="text-center py-12 lg:py-20">
              <Truck className="w-12 h-12 lg:w-16 lg:h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">Nenhum fornecedor encontrado.</p>
              <p className="text-gray-500 text-sm">Clique em 'Novo Fornecedor' para começar.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFornecedores.map((fornecedor: any) => (
                <Card key={fornecedor.id} className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-medium">{fornecedor.nome}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteFornecedor(fornecedor.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <p className="text-gray-400">📧 {fornecedor.email || "Não informado"}</p>
                      <p className="text-gray-400">📱 {fornecedor.telefone || "Não informado"}</p>
                      <p className="text-gray-400">🏢 {fornecedor.cnpj || "Não informado"}</p>
                      <p className="text-gray-400">📍 {fornecedor.endereco || "Não informado"}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function NotasFiscaisContent({ database, searchTerm, setSearchTerm }: any) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newNota, setNewNota] = useState({
    numero: "",
    cliente_nome: "",
    cliente_id: 0,
    valor: 0,
    status: "Emitida" as const,
  })

  const filteredNotas = database.notasFiscais.filter(
    (nota: any) =>
      nota.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nota.cliente_nome.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddNota = async () => {
    try {
      await database.addNotaFiscal({
        ...newNota,
        data: new Date().toISOString().split("T")[0],
      })
      setNewNota({ numero: "", cliente_nome: "", cliente_id: 0, valor: 0, status: "Emitida" })
      setIsAddModalOpen(false)
      alert("Nota fiscal adicionada com sucesso!")
    } catch (error) {
      console.error("Erro ao adicionar nota fiscal:", error)
      alert("Erro ao adicionar nota fiscal")
    }
  }

  const handleDeleteNota = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta nota fiscal?")) {
      try {
        await database.deleteNotaFiscal(id)
        alert("Nota fiscal excluída com sucesso!")
      } catch (error) {
        console.error("Erro ao excluir nota fiscal:", error)
        alert("Erro ao excluir nota fiscal")
      }
    }
  }

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await database.updateNotaFiscal(id, { status: newStatus })
    } catch (error) {
      console.error("Erro ao atualizar status:", error)
      alert("Erro ao atualizar status")
    }
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 space-y-4 lg:space-y-0">
          <div className="flex items-center">
            <div className="bg-yellow-500 p-2 rounded-lg mr-4 flex-shrink-0">
              <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-gray-900" />
            </div>
            <div className="min-w-0">
              <h2 className="text-white text-lg lg:text-xl font-medium">Notas Fiscais</h2>
              <p className="text-gray-400 text-sm">Gerencie suas notas fiscais</p>
            </div>
          </div>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 w-full lg:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Nova Nota Fiscal
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-white">Nova Nota Fiscal</DialogTitle>
                <DialogDescription className="text-gray-400">Emita uma nova nota fiscal</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-400">Número da Nota</Label>
                  <Input
                    value={newNota.numero}
                    onChange={(e) => setNewNota({ ...newNota, numero: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Ex: 001"
                  />
                </div>
                <div>
                  <Label className="text-gray-400">Cliente</Label>
                  <Select
                    onValueChange={(value) => {
                      const cliente = database.clientes.find((c: any) => c.nome === value)
                      setNewNota({ ...newNota, cliente_nome: value, cliente_id: cliente?.id || 0 })
                    }}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Selecione um cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {database.clientes.map((cliente: any) => (
                        <SelectItem key={cliente.id} value={cliente.nome}>
                          {cliente.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-400">Valor (R$)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={newNota.valor}
                    onChange={(e) => setNewNota({ ...newNota, valor: Number.parseFloat(e.target.value) || 0 })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddNota} className="bg-yellow-500 hover:bg-yellow-600 text-gray-900">
                    Emitir Nota
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">Notas Fiscais ({filteredNotas.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar notas fiscais..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {filteredNotas.length === 0 ? (
            <div className="text-center py-12 lg:py-20">
              <FileText className="w-12 h-12 lg:w-16 lg:h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">Nenhuma nota fiscal encontrada.</p>
              <p className="text-gray-500 text-sm">Clique em 'Nova Nota Fiscal' para começar.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotas.map((nota: any) => (
                <Card key={nota.id} className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge className={nota.status === "Emitida" ? "bg-green-500" : "bg-red-500"}>
                          {nota.status}
                        </Badge>
                        <span className="text-gray-400 text-sm">NF #{nota.numero}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Select value={nota.status} onValueChange={(value) => handleStatusChange(nota.id, value)}>
                          <SelectTrigger className="w-32 bg-gray-600 border-gray-500 text-white text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Emitida">Emitida</SelectItem>
                            <SelectItem value="Cancelada">Cancelada</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteNota(nota.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <h3 className="text-white font-medium mb-1">{nota.cliente_nome}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold">R$ {nota.valor.toFixed(2)}</span>
                      <span className="text-gray-400 text-sm">{nota.data}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function ConfiguracoesContent() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: true,
    autoBackup: false,
    emailReports: true,
    soundAlerts: false,
    lowStockAlert: true,
    currency: "BRL",
    language: "pt-BR",
    timezone: "America/Sao_Paulo",
  })

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSaveSettings = () => {
    alert("Configurações salvas com sucesso!")
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="bg-yellow-500 p-2 rounded-lg mr-4 flex-shrink-0">
            <Cog className="w-5 h-5 lg:w-6 lg:h-6 text-gray-900" />
          </div>
          <div className="min-w-0">
            <h2 className="text-white text-lg lg:text-xl font-medium">Configurações</h2>
            <p className="text-gray-400 text-sm">Personalize o aplicativo conforme suas necessidades</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Configurações Gerais */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-yellow-500 text-lg">Configurações Gerais</CardTitle>
            <CardDescription className="text-gray-400">Ajustes básicos do sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Notificações</Label>
                <p className="text-gray-400 text-sm">Receber notificações do sistema</p>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) => handleSettingChange("notifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Modo Escuro</Label>
                <p className="text-gray-400 text-sm">Interface em tema escuro</p>
              </div>
              <Switch
                checked={settings.darkMode}
                onCheckedChange={(checked) => handleSettingChange("darkMode", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Backup Automático</Label>
                <p className="text-gray-400 text-sm">Backup diário dos dados</p>
              </div>
              <Switch
                checked={settings.autoBackup}
                onCheckedChange={(checked) => handleSettingChange("autoBackup", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Informações do Sistema */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-yellow-500 text-lg">Informações do Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full overflow-hidden">
                  <img src="/logo-oficial.jpg" alt="Bebidas ON" className="w-full h-full object-cover" />
                </div>
                <p className="text-white font-medium">Bebidas ON</p>
                <p className="text-gray-400 text-sm">Versão 2.0.0 com Banco de Dados</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Desenvolvido por</p>
                <p className="text-white font-medium">GV SOFTWARE</p>
                <p className="text-gray-400 text-xs">© 2025 Todos os direitos reservados</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Botões de Ação */}
      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
        <Button onClick={handleSaveSettings} className="bg-yellow-500 hover:bg-yellow-600 text-gray-900">
          <Save className="w-4 h-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  )
}
