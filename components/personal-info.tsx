"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CharacterPhoto } from "./character-photo"

interface PersonalInfoProps {
  character: any
  updateCharacter: (field: string, value: string | number) => void
}

export function PersonalInfo({ character, updateCharacter }: PersonalInfoProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <CharacterPhoto
          character={character}
          updateCharacter={updateCharacter}
          className="w-32 h-32 rounded-full border-4 border-border shadow-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            value={character.name}
            onChange={(e) => updateCharacter("name", e.target.value)}
            placeholder="Nome do investigador"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="player">Jogador</Label>
          <Input
            id="player"
            value={character.player}
            onChange={(e) => updateCharacter("player", e.target.value)}
            placeholder="Nome do jogador"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="occupation">Ocupação</Label>
          <Input
            id="occupation"
            value={character.occupation}
            onChange={(e) => updateCharacter("occupation", e.target.value)}
            placeholder="Profissão"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="age">Idade</Label>
          <Input
            id="age"
            value={character.age}
            onChange={(e) => updateCharacter("age", e.target.value)}
            placeholder="Idade"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="sex">Sexo</Label>
          <Input
            id="sex"
            value={character.sex}
            onChange={(e) => updateCharacter("sex", e.target.value)}
            placeholder="Sexo"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="residence">Residência</Label>
          <Input
            id="residence"
            value={character.residence}
            onChange={(e) => updateCharacter("residence", e.target.value)}
            placeholder="Local de residência"
            className="mt-1"
          />
        </div>
        <div className="md:col-span-2 lg:col-span-3">
          <Label htmlFor="birthplace">Local de Nascimento</Label>
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
  )
}
