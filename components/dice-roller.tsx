"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, RotateCcw } from "lucide-react"
import { useState } from "react"

export function DiceRoller() {
  const [rollResult, setRollResult] = useState<number | null>(null)
  const [skillValue, setSkillValue] = useState(50)
  const [lastRoll, setLastRoll] = useState<{
    result: number
    success: string
    color: string
  } | null>(null)

  const rollD100 = () => {
    const result = Math.floor(Math.random() * 100) + 1
    setRollResult(result)

    let success = ""
    let color = ""

    if (result === 1) {
      success = "CRÍTICO"
      color = "bg-green-500"
    } else if (result <= Math.floor(skillValue / 5)) {
      success = "EXTREMO"
      color = "bg-blue-500"
    } else if (result <= Math.floor(skillValue / 2)) {
      success = "SÓLIDO"
      color = "bg-green-400"
    } else if (result <= skillValue) {
      success = "REGULAR"
      color = "bg-yellow-500"
    } else if (result >= 96) {
      success = "DESASTRE"
      color = "bg-red-600"
    } else {
      success = "FALHA"
      color = "bg-red-400"
    }

    setLastRoll({ result, success, color })
  }

  const rollDice = (sides: number) => {
    const result = Math.floor(Math.random() * sides) + 1
    setRollResult(result)
    setLastRoll(null)
  }

  const getDiceIcon = (sides: number) => {
    const icons = {
      4: Dice1,
      6: Dice2,
      8: Dice3,
      10: Dice4,
      12: Dice5,
      20: Dice6,
    }
    const Icon = icons[sides as keyof typeof icons] || Dice1
    return <Icon className="w-4 h-4" />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RotateCcw className="w-5 h-5" />
          Rolagem de Dados
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Teste de Perícia */}
        <div className="space-y-2">
          <Label htmlFor="skillValue">Valor da Perícia</Label>
          <Input
            id="skillValue"
            type="number"
            value={skillValue}
            onChange={(e) => setSkillValue(Number.parseInt(e.target.value) || 0)}
            min="0"
            max="100"
            className="text-center text-lg font-mono"
          />
          <Button onClick={rollD100} className="w-full" variant="default">
            Rolar d100
          </Button>
        </div>

        {/* Outros Dados */}
        <div className="space-y-2">
          <Label>Outros Dados</Label>
          <div className="grid grid-cols-3 gap-2">
            {[4, 6, 8, 10, 12, 20].map((sides) => (
              <Button
                key={sides}
                onClick={() => rollDice(sides)}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                {getDiceIcon(sides)}d{sides}
              </Button>
            ))}
          </div>
        </div>

        {/* Resultado */}
        {rollResult !== null && (
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold font-mono">{rollResult}</div>
            {lastRoll && <Badge className={`${lastRoll.color} text-white text-base`}>{lastRoll.success}</Badge>}
          </div>
        )}

        <div className="text-sm text-muted-foreground space-y-2 bg-muted/50 p-3 rounded-lg">
          <div className="flex justify-between font-medium">
            <span>Crítico:</span>
            <span>01</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Extremo:</span>
            <span>≤ {Math.floor(skillValue / 5)}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Sólido:</span>
            <span>≤ {Math.floor(skillValue / 2)}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Regular:</span>
            <span>≤ {skillValue}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Desastre:</span>
            <span>96+</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
