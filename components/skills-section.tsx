"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Target, Wrench, Users, Brain, Eye, Plus, Trash2 } from "lucide-react"
import { useState } from "react"

interface SkillsSectionProps {
  character: any
  updateCharacter: (field: string, value: string | number) => void
}

export function SkillsSection({ character, updateCharacter }: SkillsSectionProps) {
  const skillCategories = [
    {
      title: "Perícias Acadêmicas",
      icon: BookOpen,
      skills: [
        { key: "anthropology", name: "Antropologia", base: 1 },
        { key: "archaeology", name: "Arqueologia", base: 1 },
        { key: "history", name: "História", base: 20 },
        { key: "library", name: "Usar Bibliotecas", base: 20 },
        { key: "occultism", name: "Ocultismo", base: 5 },
        { key: "science_astronomy", name: "Ciência (Astronomia)", base: 1 },
        { key: "science_biology", name: "Ciência (Biologia)", base: 1 },
        { key: "science_botany", name: "Ciência (Botânica)", base: 1 },
        { key: "science_chemistry", name: "Ciência (Química)", base: 1 },
        { key: "science_cryptography", name: "Ciência (Criptografia)", base: 1 },
        { key: "science_engineering", name: "Ciência (Engenharia)", base: 1 },
        { key: "science_forensics", name: "Ciência (Forense)", base: 1 },
        { key: "science_geology", name: "Ciência (Geologia)", base: 1 },
        { key: "science_mathematics", name: "Ciência (Matemática)", base: 1 },
        { key: "science_meteorology", name: "Ciência (Meteorologia)", base: 1 },
        { key: "science_pharmacy", name: "Ciência (Farmácia)", base: 1 },
        { key: "science_physics", name: "Ciência (Física)", base: 1 },
        { key: "science_zoology", name: "Ciência (Zoologia)", base: 1 },
        { key: "law", name: "Direito", base: 5 },
        { key: "accounting", name: "Contabilidade", base: 5 },
        { key: "knowledge_cthulhu_mythos", name: "Mythos de Cthulhu", base: 0 },
      ],
    },
    {
      title: "Perícias de Combate",
      icon: Target,
      skills: [
        { key: "firearms_handgun", name: "Armas de Fogo (Pistolas)", base: 20 },
        { key: "firearms_rifle", name: "Armas de Fogo (Rifles/Espingardas)", base: 25 },
        { key: "firearms_shotgun", name: "Armas de Fogo (Espingardas)", base: 25 },
        { key: "firearms_submachine", name: "Armas de Fogo (Submetralhadoras)", base: 15 },
        { key: "firearms_machine", name: "Armas de Fogo (Metralhadoras)", base: 10 },
        { key: "firearms_heavy", name: "Armas Pesadas", base: 10 },
        { key: "firearms_flamethrower", name: "Lança-Chamas", base: 10 },
        { key: "bow", name: "Arcos", base: 15 },
        { key: "artillery", name: "Artilharia", base: 1 },
        { key: "fighting_brawl", name: "Lutar (Briga)", base: 25 },
        { key: "fighting_sword", name: "Lutar (Espadas)", base: 20 },
        { key: "fighting_axe", name: "Lutar (Machados)", base: 15 },
        { key: "fighting_spear", name: "Lutar (Lanças)", base: 20 },
        { key: "fighting_whip", name: "Lutar (Chicotes)", base: 5 },
        { key: "fighting_flail", name: "Lutar (Manguais)", base: 10 },
        { key: "fighting_garrote", name: "Lutar (Garrote)", base: 15 },
        { key: "fighting_chainsaw", name: "Lutar (Motosserras)", base: 10 },
        { key: "dodge", name: "Esquivar", base: 0 },
        { key: "throw", name: "Arremessar", base: 20 },
      ],
    },
    {
      title: "Perícias Técnicas",
      icon: Wrench,
      skills: [
        { key: "electrical_repair", name: "Consertos Elétricos", base: 10 },
        { key: "mechanical_repair", name: "Consertos Mecânicos", base: 10 },
        { key: "electronics", name: "Eletrônica", base: 1 },
        { key: "computer_use", name: "Usar Computadores", base: 5 },
        { key: "drive_auto", name: "Dirigir Automóveis", base: 20 },
        { key: "pilot_aircraft", name: "Pilotar (Aeronave)", base: 1 },
        { key: "pilot_boat", name: "Pilotar (Barco)", base: 1 },
        { key: "operate_machinery", name: "Operar Maquinário Pesado", base: 1 },
        { key: "locksmith", name: "Chaveiro", base: 1 },
        { key: "demolitions", name: "Demolições", base: 1 },
        { key: "art_craft_acting", name: "Arte e Ofício (Atuação)", base: 5 },
        { key: "art_craft_fine_art", name: "Arte e Ofício (Belas Artes)", base: 5 },
        { key: "art_craft_forgery", name: "Arte e Ofício (Falsificação)", base: 5 },
        { key: "art_craft_photography", name: "Arte e Ofício (Fotografia)", base: 5 },
        { key: "appraise", name: "Avaliação", base: 5 },
        { key: "sleight_of_hand", name: "Prestidigitação", base: 10 },
      ],
    },
    {
      title: "Perícias Sociais",
      icon: Users,
      skills: [
        { key: "charm", name: "Charme", base: 15 },
        { key: "fast_talk", name: "Lábia", base: 5 },
        { key: "intimidate", name: "Intimidação", base: 15 },
        { key: "persuade", name: "Persuasão", base: 10 },
        { key: "psychology", name: "Psicologia", base: 10 },
        { key: "psychoanalysis", name: "Psicanálise", base: 1 },
        { key: "disguise", name: "Disfarce", base: 5 },
        { key: "credit_rating", name: "Nível de Crédito", base: 0 },
      ],
    },
    {
      title: "Perícias de Percepção e Movimento",
      icon: Eye,
      skills: [
        { key: "spot_hidden", name: "Encontrar", base: 25 },
        { key: "listen", name: "Escutar", base: 20 },
        { key: "stealth", name: "Furtividade", base: 20 },
        { key: "track", name: "Rastrear", base: 10 },
        { key: "climb", name: "Escalar", base: 20 },
        { key: "jump", name: "Saltar", base: 20 },
        { key: "swim", name: "Natação", base: 20 },
        { key: "ride", name: "Cavalgar", base: 5 },
        { key: "navigate", name: "Navegação", base: 10 },
        { key: "natural_world", name: "Mundo Natural", base: 10 },
        { key: "survival_arctic", name: "Sobrevivência (Ártico)", base: 10 },
        { key: "survival_desert", name: "Sobrevivência (Deserto)", base: 10 },
        { key: "survival_sea", name: "Sobrevivência (Mar)", base: 10 },
      ],
    },
    {
      title: "Perícias Especializadas",
      icon: Brain,
      skills: [
        { key: "medicine", name: "Medicina", base: 1 },
        { key: "first_aid", name: "Primeiros Socorros", base: 30 },
        { key: "hypnosis", name: "Hipnose", base: 1 },
        { key: "lip_reading", name: "Leitura Labial", base: 1 },
        { key: "diving", name: "Mergulho", base: 1 },
        { key: "animal_handling", name: "Treinar Animais", base: 5 },
        { key: "language_own", name: "Língua (Nativa)", base: 0 },
        { key: "language_other", name: "Língua (Outra)", base: 1 },
      ],
    },
  ]

  const [newCustomSkill, setNewCustomSkill] = useState({ name: "", value: 0 })

  const customSkills = character.customSkills || []

  const addCustomSkill = () => {
    if (newCustomSkill.name.trim()) {
      const updatedCustomSkills = [
        ...customSkills,
        {
          id: Date.now().toString(),
          name: newCustomSkill.name.trim(),
          value: newCustomSkill.value || 0,
        },
      ]
      updateCharacter("customSkills", updatedCustomSkills)
      setNewCustomSkill({ name: "", value: 0 })
    }
  }

  const removeCustomSkill = (id: string) => {
    const updatedCustomSkills = customSkills.filter((skill: any) => skill.id !== id)
    updateCharacter("customSkills", updatedCustomSkills)
  }

  const updateCustomSkill = (id: string, field: string, value: any) => {
    const updatedCustomSkills = customSkills.map((skill: any) =>
      skill.id === id ? { ...skill, [field]: value } : skill,
    )
    updateCharacter("customSkills", updatedCustomSkills)
  }

  const getHalfValue = (value: number) => Math.floor(value / 2)
  const getFifthValue = (value: number) => Math.floor(value / 5)

  return (
    <div className="space-y-8">
      {skillCategories.map(({ title, icon: Icon, skills }) => (
        <Card key={title}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Icon className="w-6 h-6" />
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map(({ key, name, base }) => {
                const value = character[key] || base
                return (
                  <div key={key} className="space-y-3 p-4 rounded-lg bg-muted/30 border border-border/50">
                    <div className="flex items-center justify-between">
                      <Label className="text-lg font-bold text-foreground">{name}</Label>
                      <Badge variant="outline" className="text-base font-semibold px-3 py-1">
                        Base: {base}%
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        value={value}
                        onChange={(e) => updateCharacter(key, Number.parseInt(e.target.value) || base)}
                        className="text-center font-mono text-2xl font-bold h-14 border-2"
                        min={base}
                        max="100"
                      />
                      <div className="flex flex-col gap-2">
                        <Badge variant="secondary" className="text-base font-bold px-3 py-2">
                          ½: {getHalfValue(value)}
                        </Badge>
                        <Badge variant="outline" className="text-base font-bold px-3 py-2">
                          ⅕: {getFifthValue(value)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Plus className="w-6 h-6" />
            Perícias Personalizadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Formulário para adicionar nova perícia */}
            <div className="flex gap-3 p-4 rounded-lg bg-muted/30 border border-border/50">
              <Input
                placeholder="Nome da perícia (ex: Ofício - Carpintaria)"
                value={newCustomSkill.name}
                onChange={(e) => setNewCustomSkill({ ...newCustomSkill, name: e.target.value })}
                className="flex-1"
              />
              <Input
                type="number"
                placeholder="Valor base"
                value={newCustomSkill.value}
                onChange={(e) => setNewCustomSkill({ ...newCustomSkill, value: Number.parseInt(e.target.value) || 0 })}
                className="w-24"
                min="0"
                max="100"
              />
              <Button onClick={addCustomSkill} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Lista de perícias personalizadas */}
            {customSkills.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {customSkills.map((skill: any) => (
                  <div key={skill.id} className="space-y-3 p-4 rounded-lg bg-muted/30 border border-border/50">
                    <div className="flex items-center justify-between">
                      <Input
                        value={skill.name}
                        onChange={(e) => updateCustomSkill(skill.id, "name", e.target.value)}
                        className="font-bold text-foreground bg-transparent border-none p-0 h-auto"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCustomSkill(skill.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        value={skill.value}
                        onChange={(e) => updateCustomSkill(skill.id, "value", Number.parseInt(e.target.value) || 0)}
                        className="text-center font-mono text-2xl font-bold h-14 border-2"
                        min="0"
                        max="100"
                      />
                      <div className="flex flex-col gap-2">
                        <Badge variant="secondary" className="text-base font-bold px-3 py-2">
                          ½: {getHalfValue(skill.value)}
                        </Badge>
                        <Badge variant="outline" className="text-base font-bold px-3 py-2">
                          ⅕: {getFifthValue(skill.value)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
