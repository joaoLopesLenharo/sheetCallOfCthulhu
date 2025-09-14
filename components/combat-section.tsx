"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sword, Shield, Plus, Trash2, Dice6, Zap } from "lucide-react"
import { useState } from "react"
import { WaveText } from "./wave-text"

interface CombatSectionProps {
  character: any
  updateCharacter: (field: string, value: string | number | any) => void
  insanityLevel: number
  waveEnabled: boolean // Added waveEnabled prop
}

export function CombatSection({ character, updateCharacter, insanityLevel, waveEnabled }: CombatSectionProps) {
  const [rollResults, setRollResults] = useState<{ [key: number]: any }>({})

  const weapons = character.weapons || [
    {
      id: 1,
      name: "Desarmado",
      regular: 25,
      hard: 12,
      extreme: 5,
      damage: "1d3 + DE",
      range: "-",
      attacks: "1",
      ammo: "-",
      malfunction: "-",
    },
  ]

  const addWeapon = () => {
    const newWeapon = {
      id: Date.now(),
      name: "",
      regular: 0,
      hard: 0,
      extreme: 0,
      damage: "",
      range: "",
      attacks: "1",
      ammo: "",
      malfunction: "",
    }
    updateCharacter("weapons", [...weapons, newWeapon])
  }

  const removeWeapon = (id: number) => {
    updateCharacter(
      "weapons",
      weapons.filter((weapon: any) => weapon.id !== id),
    )
  }

  const updateWeapon = (id: number, field: string, value: string | number) => {
    const updatedWeapons = weapons.map((weapon: any) => (weapon.id === id ? { ...weapon, [field]: value } : weapon))
    updateCharacter("weapons", updatedWeapons)
  }

  const rollAttack = (weapon: any) => {
    const roll = Math.floor(Math.random() * 100) + 1
    const success = roll <= weapon.regular
    const hard = roll <= weapon.hard
    const extreme = roll <= weapon.extreme
    const critical = roll === 1
    const fumble = roll >= 96

    let level = "Falha"
    if (critical) level = "Crítico"
    else if (extreme) level = "Extremo"
    else if (hard) level = "Sólido"
    else if (success) level = "Regular"
    else if (fumble) level = "Desastre"

    const result = {
      roll,
      success: success || critical,
      level,
      critical,
      fumble,
    }

    setRollResults((prev) => ({ ...prev, [`attack_${weapon.id}`]: result }))
    return result
  }

  const rollDamage = (weapon: any) => {
    const damageFormula = weapon.damage.toLowerCase()
    let total = 0
    const rolls: number[] = []

    // Parse básico de fórmulas de dano (ex: 1d6+2, 2d4, 1d3+DE)
    const diceMatch = damageFormula.match(/(\d+)d(\d+)/g)
    const bonusMatch = damageFormula.match(/[+-]\s*(\d+)/g)
    const hasDE = damageFormula.includes("de") || damageFormula.includes("dano extra")

    if (diceMatch) {
      diceMatch.forEach((dice) => {
        const [count, sides] = dice.split("d").map(Number)
        for (let i = 0; i < count; i++) {
          const roll = Math.floor(Math.random() * sides) + 1
          rolls.push(roll)
          total += roll
        }
      })
    }

    if (bonusMatch) {
      bonusMatch.forEach((bonus) => {
        const value = Number.parseInt(bonus.replace(/\s/g, ""))
        total += value
      })
    }

    if (hasDE && character.damageBonus) {
      // Simular dano extra básico
      const deMatch = character.damageBonus.match(/([+-]?\d+)d(\d+)/g)
      if (deMatch) {
        deMatch.forEach((dice) => {
          const [count, sides] = dice.replace(/[+-]/, "").split("d").map(Number)
          const sign = dice.startsWith("-") ? -1 : 1
          for (let i = 0; i < count; i++) {
            const roll = Math.floor(Math.random() * sides) + 1
            rolls.push(roll * sign)
            total += roll * sign
          }
        })
      } else if (character.damageBonus.match(/[+-]?\d+/)) {
        const bonus = Number.parseInt(character.damageBonus)
        total += bonus
      }
    }

    const result = {
      total: Math.max(1, total),
      rolls,
      formula: weapon.damage,
    }

    setRollResults((prev) => ({ ...prev, [`damage_${weapon.id}`]: result }))
    return result
  }

  return (
    <div className="space-y-6">
      {/* Status de Combate */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
              Status de Combate
            </WaveText>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="damageBonus">
                <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                  Dano Extra
                </WaveText>
              </Label>
              <Input
                id="damageBonus"
                value={character.damageBonus || ""}
                onChange={(e) => updateCharacter("damageBonus", e.target.value)}
                placeholder="Ex: +1d4"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="build">
                <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                  Corpo
                </WaveText>
              </Label>
              <Input
                id="build"
                type="number"
                value={character.build || 0}
                onChange={(e) => updateCharacter("build", Number.parseInt(e.target.value) || 0)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="dodge">
                <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                  Esquivar
                </WaveText>
              </Label>
              <Input
                id="dodge"
                type="number"
                value={character.dodge || Math.floor((character.dex || 0) / 2)}
                onChange={(e) => updateCharacter("dodge", Number.parseInt(e.target.value) || 0)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="movementRate">
                <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                  Taxa de Movimento
                </WaveText>
              </Label>
              <Input
                id="movementRate"
                type="number"
                value={character.movementRate || 0}
                onChange={(e) => updateCharacter("movementRate", Number.parseInt(e.target.value) || 0)}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Armas */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Sword className="w-5 h-5" />
              <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                Armas
              </WaveText>
            </CardTitle>
            <Button onClick={addWeapon} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-1" />
              <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                Adicionar Arma
              </WaveText>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weapons.map((weapon: any) => (
              <div key={weapon.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <Input
                    value={weapon.name}
                    onChange={(e) => updateWeapon(weapon.id, "name", e.target.value)}
                    placeholder="Nome da arma"
                    className="font-semibold text-lg"
                  />
                  {weapon.id !== 1 && (
                    <Button onClick={() => removeWeapon(weapon.id)} size="sm" variant="destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
                  <div>
                    <Label className="text-sm font-semibold">
                      <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                        Regular
                      </WaveText>
                    </Label>
                    <Input
                      type="number"
                      value={weapon.regular}
                      onChange={(e) => updateWeapon(weapon.id, "regular", Number.parseInt(e.target.value) || 0)}
                      className="text-center text-base font-mono"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">
                      <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                        Sólido
                      </WaveText>
                    </Label>
                    <Input
                      type="number"
                      value={weapon.hard}
                      onChange={(e) => updateWeapon(weapon.id, "hard", Number.parseInt(e.target.value) || 0)}
                      className="text-center text-base font-mono"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">
                      <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                        Extremo
                      </WaveText>
                    </Label>
                    <Input
                      type="number"
                      value={weapon.extreme}
                      onChange={(e) => updateWeapon(weapon.id, "extreme", Number.parseInt(e.target.value) || 0)}
                      className="text-center text-base font-mono"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">
                      <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                        Dano
                      </WaveText>
                    </Label>
                    <Input
                      value={weapon.damage}
                      onChange={(e) => updateWeapon(weapon.id, "damage", e.target.value)}
                      className="text-center text-base font-mono"
                      placeholder="1d6"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">
                      <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                        Alcance
                      </WaveText>
                    </Label>
                    <Input
                      value={weapon.range}
                      onChange={(e) => updateWeapon(weapon.id, "range", e.target.value)}
                      className="text-center text-base font-mono"
                      placeholder="10m"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">
                      <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                        Ataques
                      </WaveText>
                    </Label>
                    <Input
                      value={weapon.attacks}
                      onChange={(e) => updateWeapon(weapon.id, "attacks", e.target.value)}
                      className="text-center text-base font-mono"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">
                      <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                        Munição
                      </WaveText>
                    </Label>
                    <Input
                      value={weapon.ammo}
                      onChange={(e) => updateWeapon(weapon.id, "ammo", e.target.value)}
                      className="text-center text-base font-mono"
                      placeholder="6"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">
                      <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                        Defeito
                      </WaveText>
                    </Label>
                    <Input
                      value={weapon.malfunction}
                      onChange={(e) => updateWeapon(weapon.id, "malfunction", e.target.value)}
                      className="text-center text-base font-mono"
                      placeholder="100"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t">
                  <Button
                    onClick={() => rollAttack(weapon)}
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    <Dice6 className="w-3 h-3" />
                    <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                      Teste de Ataque
                    </WaveText>
                  </Button>

                  <Button
                    onClick={() => rollDamage(weapon)}
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1"
                    disabled={!weapon.damage}
                  >
                    <Zap className="w-3 h-3" />
                    <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                      Rolar Dano
                    </WaveText>
                  </Button>

                  {/* Resultados dos testes */}
                  <div className="flex flex-wrap gap-2 ml-auto">
                    {rollResults[`attack_${weapon.id}`] && (
                      <Badge
                        variant={rollResults[`attack_${weapon.id}`].success ? "default" : "destructive"}
                        className="text-xs"
                      >
                        <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                          Ataque: {rollResults[`attack_${weapon.id}`].roll} - {rollResults[`attack_${weapon.id}`].level}
                        </WaveText>
                      </Badge>
                    )}

                    {rollResults[`damage_${weapon.id}`] && (
                      <Badge variant="secondary" className="text-xs">
                        <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                          Dano: {rollResults[`damage_${weapon.id}`].total}
                        </WaveText>
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
