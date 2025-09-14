"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Brain, Minus, Plus, Dice6 } from "lucide-react"
import { useState } from "react"
import { WaveText } from "./wave-text"

interface SanityProps {
  character: any
  updateCharacter: (field: string, value: any) => void
  insanityLevel: number
  waveEnabled: boolean // Added waveEnabled prop
}

export function SanitySection({ character, updateCharacter, insanityLevel, waveEnabled }: SanityProps) {
  const [sanityLoss, setSanityLoss] = useState("")
  const [sanityGain, setSanityGain] = useState("")
  const [lastRoll, setLastRoll] = useState<any>(null)

  const applySanityLoss = () => {
    const loss = Number.parseInt(sanityLoss) || 0
    if (loss > 0) {
      const newSanity = Math.max(0, character.sanity - loss)
      updateCharacter("sanity", newSanity)

      // Check for temporary insanity (5+ points lost in one go)
      if (loss >= 5) {
        const currentTempInsanity = character.temporaryInsanity || 0
        updateCharacter("temporaryInsanity", currentTempInsanity + 1)
      }

      // Check for indefinite insanity (sanity drops to 1/5 of max or below)
      const insanityThreshold = Math.floor(character.maxSanity / 5)
      if (newSanity <= insanityThreshold && character.sanity > insanityThreshold) {
        const currentIndefiniteInsanity = character.indefiniteInsanity || 0
        updateCharacter("indefiniteInsanity", currentIndefiniteInsanity + 1)
      }

      setSanityLoss("")
    }
  }

  const applySanityGain = () => {
    const gain = Number.parseInt(sanityGain) || 0
    if (gain > 0) {
      const newSanity = Math.min(character.maxSanity, character.sanity + gain)
      updateCharacter("sanity", newSanity)
      setSanityGain("")
    }
  }

  const rollSanityCheck = () => {
    const roll = Math.floor(Math.random() * 100) + 1
    const success = roll <= character.sanity

    return {
      roll,
      success,
      level:
        roll === 1
          ? "Crítico"
          : roll <= Math.floor(character.sanity / 5)
            ? "Extremo"
            : roll <= Math.floor(character.sanity / 2)
              ? "Sólido"
              : roll <= character.sanity
                ? "Regular"
                : "Falha",
    }
  }

  const handleSanityRoll = () => {
    const result = rollSanityCheck()
    setLastRoll(result)
  }

  const handleSanityChange = (value: number) => {
    const clampedValue = Math.min(Math.max(0, value), character.maxSanity)
    updateCharacter("sanity", clampedValue)
  }

  return (
    <Card className="transition-colors duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
            Sistema de Sanidade
          </WaveText>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Atual */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="currentSanity">
              <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                Sanidade Atual
              </WaveText>
            </Label>
            <div className="flex items-center gap-2 mt-1">
              <Input
                id="currentSanity"
                type="number"
                value={character.sanity}
                onChange={(e) => handleSanityChange(Number.parseInt(e.target.value) || 0)}
                className="transition-colors duration-300"
                min="0"
                max={character.maxSanity}
              />
              <Badge variant="outline" className="text-xs">
                <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                  /{character.maxSanity}
                </WaveText>
              </Badge>
            </div>
          </div>

          <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
            <p className="font-medium">
              <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                Valor atual de Mythos: {character.mythosCthulhu || 0}
              </WaveText>
            </p>
            <p className="text-xs mt-1">
              <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                Este valor é editável apenas na aba de Perícias
              </WaveText>
            </p>
          </div>
        </div>

        {/* Insanidade */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="temporaryInsanity">
              <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                Insanidade Temporária
              </WaveText>
            </Label>
            <Input
              id="temporaryInsanity"
              type="number"
              value={character.temporaryInsanity || 0}
              onChange={(e) => updateCharacter("temporaryInsanity", Number.parseInt(e.target.value) || 0)}
              className="mt-1 transition-colors duration-300"
            />
          </div>
          <div>
            <Label htmlFor="indefiniteInsanity">
              <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                Insanidade Indefinida
              </WaveText>
            </Label>
            <Input
              id="indefiniteInsanity"
              type="number"
              value={character.indefiniteInsanity || 0}
              onChange={(e) => updateCharacter("indefiniteInsanity", Number.parseInt(e.target.value) || 0)}
              className="mt-1 transition-colors duration-300"
            />
          </div>
        </div>

        {/* Controles de Sanidade */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Perda"
              value={sanityLoss}
              onChange={(e) => setSanityLoss(e.target.value)}
              className="w-20"
            />
            <Button onClick={applySanityLoss} variant="destructive" size="sm">
              <Minus className="w-4 h-4 mr-1" />
              <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                Perder Sanidade
              </WaveText>
            </Button>

            <Input
              type="number"
              placeholder="Ganho"
              value={sanityGain}
              onChange={(e) => setSanityGain(e.target.value)}
              className="w-20"
            />
            <Button onClick={applySanityGain} variant="default" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                Recuperar
              </WaveText>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={handleSanityRoll} variant="outline" size="sm">
              <Dice6 className="w-4 h-4 mr-1" />
              <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                Teste de Sanidade
              </WaveText>
            </Button>
            {lastRoll && (
              <Badge variant={lastRoll.success ? "default" : "destructive"}>
                <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                  {lastRoll.roll} - {lastRoll.level} ({lastRoll.success ? "Sucesso" : "Falha"})
                </WaveText>
              </Badge>
            )}
          </div>
        </div>

        {/* Fobias e Manias */}
        <div>
          <Label htmlFor="phobiasManias">
            <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
              Fobias & Manias
            </WaveText>
          </Label>
          <Textarea
            id="phobiasManias"
            value={character.phobiasManias || ""}
            onChange={(e) => updateCharacter("phobiasManias", e.target.value)}
            placeholder="Medos irracionais, obsessões e comportamentos compulsivos desenvolvidos..."
            className="mt-1 transition-colors duration-300"
            rows={3}
          />
        </div>

        {/* Indicadores Visuais */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>
              <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                Estado Mental:
              </WaveText>
            </span>
            <Badge
              variant={
                character.sanity <= Math.floor(character.maxSanity / 5)
                  ? "destructive"
                  : character.sanity <= Math.floor(character.maxSanity / 2)
                    ? "secondary"
                    : "default"
              }
            >
              <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                {character.sanity <= Math.floor(character.maxSanity / 5)
                  ? "Insano"
                  : character.sanity <= Math.floor(character.maxSanity / 2)
                    ? "Perturbado"
                    : "Estável"}
              </WaveText>
            </Badge>
          </div>

          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                character.sanity <= Math.floor(character.maxSanity / 5)
                  ? "bg-destructive"
                  : character.sanity <= Math.floor(character.maxSanity / 2)
                    ? "bg-yellow-500"
                    : "bg-green-500"
              }`}
              style={{ width: `${Math.max(0, (character.sanity / character.maxSanity) * 100)}%` }}
            />
          </div>
        </div>

        {/* Referências */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>
            <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
              <strong>Insanidade Temporária:</strong> Perda de 5+ pontos de uma vez
            </WaveText>
          </p>
          <p>
            <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
              <strong>Insanidade Indefinida:</strong> Sanidade cai para 1/5 do máximo ou menos
            </WaveText>
          </p>
          <p>
            <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
              <strong>Mythos:</strong> Conhecimento proibido que reduz sanidade máxima
            </WaveText>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
