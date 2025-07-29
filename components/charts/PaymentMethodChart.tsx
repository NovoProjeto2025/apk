"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

interface PaymentMethodChartProps {
  data: Array<{
    metodo: string
    valor: number
    count: number
  }>
}

const COLORS = ["#EAB308", "#F97316", "#EF4444", "#10B981", "#3B82F6"]

export function PaymentMethodChart({ data }: PaymentMethodChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ metodo, percent }) => `${metodo} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="valor"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#1F2937",
            border: "1px solid #374151",
            borderRadius: "8px",
            color: "#F3F4F6",
          }}
          formatter={(value: number, name, props) => [
            `R$ ${value.toFixed(2)} (${props.payload.count} transações)`,
            "Valor",
          ]}
        />
        <Legend wrapperStyle={{ color: "#9CA3AF" }} />
      </PieChart>
    </ResponsiveContainer>
  )
}
