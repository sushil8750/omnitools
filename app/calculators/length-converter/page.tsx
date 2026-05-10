"use client"

import * as React from "react"
import { ToolLayout } from "@/components/shared/tool-layout"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRightLeft, Calculator } from "lucide-react"

const UNITS: Record<string, number> = {
  meters: 1,
  kilometers: 1000,
  centimeters: 0.01,
  millimeters: 0.001,
  miles: 1609.34,
  yards: 0.9144,
  feet: 0.3048,
  inches: 0.0254
}

export default function LengthConverterPage() {
  const [value, setValue] = React.useState("1")
  const [fromUnit, setFromUnit] = React.useState("meters")
  const [toUnit, setToUnit] = React.useState("feet")
  const [result, setResult] = React.useState("3.28084")

  React.useEffect(() => {
    const numValue = parseFloat(value)
    if (isNaN(numValue)) {
      setResult("0")
      return
    }

    const valueInMeters = numValue * UNITS[fromUnit]
    const convertedValue = valueInMeters / UNITS[toUnit]
    setResult(convertedValue.toLocaleString(undefined, { maximumFractionDigits: 6 }))
  }, [value, fromUnit, toUnit])

  return (
    <ToolLayout
      title="Length Converter"
      description="Quickly convert between metric and imperial length units."
      category="Calculators"
    >
      <div className="max-w-2xl mx-auto">
        <Card className="rounded-3xl border-primary/10 shadow-xl overflow-hidden">
          <CardContent className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
              <div className="space-y-4">
                <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">From</label>
                <div className="space-y-4">
                  <Input 
                    type="number" 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)}
                    className="h-16 text-2xl font-bold rounded-2xl border-muted-foreground/20"
                  />
                  <Select value={fromUnit} onValueChange={(v) => v && setFromUnit(v)}>
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(UNITS).map(unit => (
                        <SelectItem key={unit} value={unit} className="capitalize">{unit}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">To</label>
                <div className="space-y-4">
                  <div className="h-16 flex items-center px-4 text-2xl font-bold bg-muted/30 rounded-2xl text-primary border border-transparent">
                    {result}
                  </div>
                  <Select value={toUnit} onValueChange={(v) => v && setToUnit(v)}>
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(UNITS).map(unit => (
                        <SelectItem key={unit} value={unit} className="capitalize">{unit}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t flex items-center justify-between text-muted-foreground">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Calculator size={16} /> Formula: 1 {fromUnit} = {(UNITS[fromUnit] / UNITS[toUnit]).toFixed(4)} {toUnit}
              </div>
              <Button variant="ghost" size="icon" onClick={() => {
                const temp = fromUnit
                setFromUnit(toUnit)
                setToUnit(temp)
              }}>
                <ArrowRightLeft size={18} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  )
}

import { Button } from "@/components/ui/button"
