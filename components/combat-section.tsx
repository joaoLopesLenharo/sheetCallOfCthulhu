"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Sword, Shield, Plus, Trash2 } from "lucide-react"

interface CombatSectionProps {
  character: any
  updateCharacter: (field: string, value: string | number | any) => void
}

export function CombatSection({ character, updateCharacter }: CombatSectionProps) {
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

  return (
    <div className="space-y-6">
      {/* Status de Combate */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Status de Combate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="damageBonus">Dano Extra</Label>
              <Input
                id="damageBonus"
                value={character.damageBonus || ""}
                onChange={(e) => updateCharacter("damageBonus", e.target.value)}
                placeholder="Ex: +1d4"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="build">Corpo</Label>
              <Input
                id="build"
                type="number"
                value={character.build || 0}
                onChange={(e) => updateCharacter("build", Number.parseInt(e.target.value) || 0)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="dodge">Esquivar</Label>
              <Input
                id="dodge"
                type="number"
                value={character.dodge || Math.floor((character.dex || 0) / 2)}
                onChange={(e) => updateCharacter("dodge", Number.parseInt(e.target.value) || 0)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="movementRate">Taxa de Movimento</Label>
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
              Armas
            </CardTitle>
            <Button onClick={addWeapon} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-1" />
              Adicionar Arma
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
                    <Label className="text-sm font-semibold">Regular</Label>
                    <Input
                      type="number"
                      value={weapon.regular}
                      onChange={(e) => updateWeapon(weapon.id, "regular", Number.parseInt(e.target.value) || 0)}
                      className="text-center text-base font-mono"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Sólido</Label>
                    <Input
                      type="number"
                      value={weapon.hard}
                      onChange={(e) => updateWeapon(weapon.id, "hard", Number.parseInt(e.target.value) || 0)}
                      className="text-center text-base font-mono"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Extremo</Label>
                    <Input
                      type="number"
                      value={weapon.extreme}
                      onChange={(e) => updateWeapon(weapon.id, "extreme", Number.parseInt(e.target.value) || 0)}
                      className="text-center text-base font-mono"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Dano</Label>
                    <Input
                      value={weapon.damage}
                      onChange={(e) => updateWeapon(weapon.id, "damage", e.target.value)}
                      className="text-center text-base font-mono"
                      placeholder="1d6"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Alcance</Label>
                    <Input
                      value={weapon.range}
                      onChange={(e) => updateWeapon(weapon.id, "range", e.target.value)}
                      className="text-center text-base font-mono"
                      placeholder="10m"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Ataques</Label>
                    <Input
                      value={weapon.attacks}
                      onChange={(e) => updateWeapon(weapon.id, "attacks", e.target.value)}
                      className="text-center text-base font-mono"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Munição</Label>
                    <Input
                      value={weapon.ammo}
                      onChange={(e) => updateWeapon(weapon.id, "ammo", e.target.value)}
                      className="text-center text-base font-mono"
                      placeholder="6"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Defeito</Label>
                    <Input
                      value={weapon.malfunction}
                      onChange={(e) => updateWeapon(weapon.id, "malfunction", e.target.value)}
                      className="text-center text-base font-mono"
                      placeholder="100"
                    />
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
