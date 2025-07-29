"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface SalesChartProps {
  data: Array<{
    data: string
    valor: number
  }>
}

export function SalesChart({ data }: SalesChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="data" stroke="#9CA3AF" fontSize={12} />
        <YAxis stroke="#9CA3AF" fontSize={12} tickFormatter={(value) => `R$ ${value.toFixed(0)}`} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1F2937",
            border: "1px solid #374151",
            borderRadius: "8px",
            color: "#F3F4F6",
          }}
          formatter={(value: number) => [`R$ ${value.toFixed(2)}`, "Vendas"]}
        />
        <Line
          type="monotone"
          dataKey="valor"
          stroke="#EAB308"
          strokeWidth={3}
          dot={{ fill: "#EAB308", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: "#EAB308", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
