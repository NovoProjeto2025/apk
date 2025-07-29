"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface StockChartProps {
  data: Array<{
    nome: string
    estoque: number
    estoqueMinimo: number
  }>
}

export function StockChart({ data }: StockChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="nome" stroke="#9CA3AF" fontSize={12} angle={-45} textAnchor="end" height={80} />
        <YAxis stroke="#9CA3AF" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1F2937",
            border: "1px solid #374151",
            borderRadius: "8px",
            color: "#F3F4F6",
          }}
        />
        <Bar dataKey="estoque" fill="#EAB308" name="Estoque Atual" />
        <Bar dataKey="estoqueMinimo" fill="#EF4444" name="Estoque Mínimo" />
      </BarChart>
    </ResponsiveContainer>
  )
}
