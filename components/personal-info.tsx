"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { WaveText } from "./wave-text"
import { ImageField } from "./image-field"

interface PersonalInfoProps {
  character: any
  updateCharacter: (field: string, value: string | number) => void
  insanityLevel: number
  waveEnabled?: boolean
}

export function PersonalInfo({ character, updateCharacter, insanityLevel, waveEnabled = true }: PersonalInfoProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Imagem à esquerda */}
        <div className="lg:w-1/3">
          <ImageField
            label="Imagem do Investigador"
            value={character.additionalImage}
            onChange={(value) => updateCharacter("additionalImage", value)}
            insanityLevel={insanityLevel}
            waveEnabled={waveEnabled}
          />
        </div>

        {/* Informações à direita */}
        <div className="lg:w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">
                <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                  Nome
                </WaveText>
              </Label>
              <Input
                id="name"
                value={character.name}
                onChange={(e) => updateCharacter("name", e.target.value)}
                placeholder="Nome do investigador"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="player">
                <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                  Jogador
                </WaveText>
              </Label>
              <Input
                id="player"
                value={character.player}
                onChange={(e) => updateCharacter("player", e.target.value)}
                placeholder="Nome do jogador"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="occupation">
                <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                  Ocupação
                </WaveText>
              </Label>
              <Input
                id="occupation"
                value={character.occupation}
                onChange={(e) => updateCharacter("occupation", e.target.value)}
                placeholder="Profissão"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="age">
                <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                  Idade
                </WaveText>
              </Label>
              <Input
                id="age"
                value={character.age}
                onChange={(e) => updateCharacter("age", e.target.value)}
                placeholder="Idade"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="sex">
                <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                  Sexo
                </WaveText>
              </Label>
              <Input
                id="sex"
                value={character.sex}
                onChange={(e) => updateCharacter("sex", e.target.value)}
                placeholder="Sexo"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="residence">
                <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                  Residência
                </WaveText>
              </Label>
              <Input
                id="residence"
                value={character.residence}
                onChange={(e) => updateCharacter("residence", e.target.value)}
                placeholder="Local de residência"
                className="mt-1"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="birthplace">
                <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                  Local de Nascimento
                </WaveText>
              </Label>
              <Input
                id="birthplace"
                value={character.birthplace}
                onChange={(e) => updateCharacter("birthplace", e.target.value)}
                placeholder="Local de nascimento"
                className="mt-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
