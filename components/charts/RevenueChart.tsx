"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface RevenueChartProps {
  data: Array<{
    mes: string
    entradas: number
    saidas: number
    lucro: number
  }>
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorEntradas" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="colorSaidas" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="colorLucro" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#EAB308" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#EAB308" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="mes" stroke="#9CA3AF" fontSize={12} />
        <YAxis stroke="#9CA3AF" fontSize={12} tickFormatter={(value) => `R$ ${value}`} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1F2937",
            border: "1px solid #374151",
            borderRadius: "8px",
            color: "#F3F4F6",
          }}
          formatter={(value: number, name) => [`R$ ${value.toFixed(2)}`, name]}
        />
        <Area
          type="monotone"
          dataKey="entradas"
          stackId="1"
          stroke="#10B981"
          fillOpacity={1}
          fill="url(#colorEntradas)"
          name="Entradas"
        />
        <Area
          type="monotone"
          dataKey="saidas"
          stackId="2"
          stroke="#EF4444"
          fillOpacity={1}
          fill="url(#colorSaidas)"
          name="Saídas"
        />
        <Area
          type="monotone"
          dataKey="lucro"
          stackId="3"
          stroke="#EAB308"
          fillOpacity={1}
          fill="url(#colorLucro)"
          name="Lucro"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
