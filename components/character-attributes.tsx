"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Zap, Brain, MinusCircle as Muscle, Shield, Calculator } from "lucide-react"

interface CharacterAttributesProps {
  character: any
  updateCharacter: (field: string, value: string | number) => void
}

export function CharacterAttributes({ character, updateCharacter }: CharacterAttributesProps) {
  const attributes = [
    { key: "str", label: "FOR", name: "Força", icon: Muscle },
    { key: "con", label: "CON", name: "Constituição", icon: Shield },
    { key: "siz", label: "TAM", name: "Tamanho", icon: Muscle },
    { key: "dex", label: "DES", name: "Destreza", icon: Zap },
    { key: "app", label: "APA", name: "Aparência", icon: Brain },
    { key: "edu", label: "EDU", name: "Educação", icon: Brain },
    { key: "int", label: "INT", name: "Inteligência", icon: Brain },
    { key: "pow", label: "POD", name: "Poder", icon: Zap },
  ]

  const getHalfValue = (value: number) => Math.floor(value / 2)
  const getFifthValue = (value: number) => Math.floor(value / 5)

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Brain className="w-6 h-6" />
            Atributos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {attributes.map(({ key, label, name, icon: Icon }) => {
              const value = character[key] || 0
              return (
                <div key={key} className="space-y-4 p-4 rounded-lg bg-muted/30 border border-border/50">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Icon className="w-5 h-5" />
                      <Label className="font-bold text-2xl text-primary">{label}</Label>
                    </div>
                    <p className="text-base text-muted-foreground font-semibold">{name}</p>
                  </div>
                  <Input
                    type="number"
                    value={value}
                    onChange={(e) => updateCharacter(key, Number.parseInt(e.target.value) || 0)}
                    className="text-center font-mono text-3xl font-bold h-16 border-2"
                    min="0"
                    max="100"
                  />
                  <div className="flex justify-center gap-2">
                    <Badge variant="secondary" className="text-base font-bold px-3 py-2">
                      ½: {getHalfValue(value)}
                    </Badge>
                    <Badge variant="outline" className="text-base font-bold px-3 py-2">
                      ⅕: {getFifthValue(value)}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Calculator className="w-6 h-6" />
            Valores Calculados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="text-center space-y-3 p-4 rounded-lg bg-muted/30 border border-border/50">
              <Label className="text-lg font-bold">Esquivar</Label>
              <div className="text-4xl font-mono font-bold bg-background border-2 border-primary rounded-lg p-4 text-foreground">
                {character.dodge}
              </div>
              <p className="text-base text-muted-foreground font-semibold">DES ÷ 2</p>
            </div>

            <div className="text-center space-y-3 p-4 rounded-lg bg-muted/30 border border-border/50">
              <Label className="text-lg font-bold">Dano Extra</Label>
              <div className="text-4xl font-mono font-bold bg-background border-2 border-primary rounded-lg p-4 text-foreground">
                {character.damageBonus}
              </div>
              <p className="text-base text-muted-foreground font-semibold">FOR + TAM</p>
            </div>

            <div className="text-center space-y-3 p-4 rounded-lg bg-muted/30 border border-border/50">
              <Label className="text-lg font-bold">Corpo</Label>
              <div className="text-4xl font-mono font-bold bg-background border-2 border-primary rounded-lg p-4 text-foreground">
                {character.build}
              </div>
              <p className="text-base text-muted-foreground font-semibold">FOR + TAM</p>
            </div>

            <div className="text-center space-y-3 p-4 rounded-lg bg-muted/30 border border-border/50">
              <Label className="text-lg font-bold">Taxa Movimento</Label>
              <div className="text-4xl font-mono font-bold bg-background border-2 border-primary rounded-lg p-4 text-foreground">
                {character.movementRate}
              </div>
              <p className="text-base text-muted-foreground font-semibold">Base 8 + modificadores</p>
            </div>

            <div className="text-center space-y-3 p-4 rounded-lg bg-muted/30 border border-border/50">
              <Label className="text-lg font-bold">PV Máximo</Label>
              <div className="text-4xl font-mono font-bold bg-background border-2 border-primary rounded-lg p-4 text-foreground">
                {character.maxHitPoints}
              </div>
              <p className="text-base text-muted-foreground font-semibold">(CON + TAM) ÷ 10</p>
            </div>

            <div className="text-center space-y-3 p-4 rounded-lg bg-muted/30 border border-border/50">
              <Label className="text-lg font-bold">PM Máximo</Label>
              <div className="text-4xl font-mono font-bold bg-background border-2 border-primary rounded-lg p-4 text-foreground">
                {character.maxMagicPoints}
              </div>
              <p className="text-base text-muted-foreground font-semibold">POD ÷ 5</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
