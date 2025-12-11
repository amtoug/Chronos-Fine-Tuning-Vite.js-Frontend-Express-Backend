"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import React, { useEffect, useState } from "react"
import axios from "axios"

const chartConfig = {
  timestamp: { label: "timestamp" },
  prediction: { label: "prediction", color: "var(--chart-1)" },
  high_90: { label: "high_90", color: "var(--chart-2)" },
} satisfies ChartConfig

interface ChartDataItem {
  timestamp: string
  prediction: number
  high_90: number
}

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = useState("90d") // dernier 90 jours
  const [interval, setInterval] = useState("4h") // résolution par défaut
  const [data, setData] = useState<ChartDataItem[]>([])
  const [filteredData, setFilteredData] = useState<ChartDataItem[]>([])

  // fetch data
  useEffect(() => {
    axios
      .get<ChartDataItem[]>("http://localhost:3000/data")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
  }, [])

  // filtrage par timeRange et interval
  useEffect(() => {
    const daysMap: Record<string, number> = { "90d": 90, "30d": 30, "7d": 7 }
    const daysToSubtract = daysMap[timeRange] || 90
    const referenceDate = data.length
      ? new Date(Math.max(...data.map((d) => new Date(d.timestamp).getTime())))
      : new Date() // fallback si data vide
        const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)

    // filtrer par date
    let fData = data.filter((item) => new Date(item.timestamp) >= startDate)

    // filtrer selon intervalle (4h, 2h, 1h)
    const hourInterval = parseInt(interval) // convert "4h" -> 4
    fData = fData.filter((item) => {
      const date = new Date(item.timestamp)
      return date.getHours() % hourInterval === 0
    })

    setFilteredData(fData)
  }, [data, timeRange, interval])

  return (
    <div className="flex flex-col justify-center h-screen">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:justify-between">
          <CardTitle>Prédiction de la consommation d’énergie France &#127467;&#127479; à partir des données de RTE</CardTitle>
          <div className="flex gap-2">

            <Select value={interval} onValueChange={setInterval}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Interval" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4h">4h</SelectItem>
                <SelectItem value="2h">2h</SelectItem>
                <SelectItem value="1h">1h</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="px-10 pt-10 sm:px-6 sm:pt-6">
          <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
            <LineChart data={filteredData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="timestamp"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(11, 16)} // heure
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line dataKey="prediction" type="monotone" stroke="var(--color-prediction)" strokeWidth={2} dot={false} />
              <Line dataKey="high_90" type="monotone" stroke="var(--color-high_90)" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </CardContent>

        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 leading-none font-medium">
                La prédiction est réalisée chaque jour à 23h <TrendingUp className="h-4 w-4" />
              </div>
              <div className="text-muted-foreground flex items-center gap-2 leading-none">
                Affichage des données groupées par {interval}
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ChartAreaInteractive
