"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Eye, Skull, Heart } from "lucide-react"
import { CharacterAttributes } from "@/components/character-attributes"
import { SkillsSection } from "@/components/skills-section"
import { CombatSection } from "@/components/combat-section"
import { PersonalInfo } from "@/components/personal-info"
import { DiceRoller } from "@/components/dice-roller"
import { AnimatedThemeToggler } from "@/components/animated-theme-toggler"
import { CharacterActions } from "@/components/character-actions"
import { useCharacterStorage } from "@/hooks/use-character-storage"
import { SanitySection } from "@/components/sanity-section"

export default function CharacterSheet() {
  const { character, updateCharacter, exportCharacter, importCharacter, resetCharacter } = useCharacterStorage()

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 font-sans">
      {/* Header */}
      <header className="bg-card border-b border-border py-6 px-4 shadow-lg transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-center flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">Call of Cthulhu</h1>
            <p className="text-muted-foreground mt-2 text-pretty font-medium">Ficha de Investigador da Era Moderna</p>
          </div>
          <div className="flex items-center gap-2">
            <AnimatedThemeToggler className="p-2 rounded-md hover:bg-muted transition-colors text-foreground" />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Informações Básicas */}
        <Card className="transition-colors duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-semibold">
              <Eye className="w-5 h-5" />
              Informações do Investigador
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PersonalInfo character={character} updateCharacter={updateCharacter} />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="attributes" className="w-full">
              <TabsList className="grid w-full grid-cols-5 transition-colors duration-300">
                <TabsTrigger value="attributes" className="font-medium">
                  Atributos
                </TabsTrigger>
                <TabsTrigger value="skills" className="font-medium">
                  Perícias
                </TabsTrigger>
                <TabsTrigger value="combat" className="font-medium">
                  Combate
                </TabsTrigger>
                <TabsTrigger value="sanity" className="font-medium">
                  Sanidade
                </TabsTrigger>
                <TabsTrigger value="background" className="font-medium">
                  História
                </TabsTrigger>
              </TabsList>

              <TabsContent value="attributes" className="space-y-4">
                <CharacterAttributes character={character} updateCharacter={updateCharacter} />
              </TabsContent>

              <TabsContent value="skills" className="space-y-4">
                <SkillsSection character={character} updateCharacter={updateCharacter} />
              </TabsContent>

              <TabsContent value="combat" className="space-y-4">
                <CombatSection character={character} updateCharacter={updateCharacter} />
              </TabsContent>

              <TabsContent value="sanity" className="space-y-4">
                <SanitySection character={character} updateCharacter={updateCharacter} />
              </TabsContent>

              <TabsContent value="background" className="space-y-4">
                <Card className="transition-colors duration-300">
                  <CardHeader>
                    <CardTitle className="font-semibold">História Pessoal</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="ideology">Ideologia/Crenças</Label>
                        <Textarea
                          id="ideology"
                          value={character.ideology}
                          onChange={(e) => updateCharacter("ideology", e.target.value)}
                          placeholder="Suas crenças e ideologias..."
                          className="mt-1 transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="significantPeople">Pessoas Significativas</Label>
                        <Textarea
                          id="significantPeople"
                          value={character.significantPeople}
                          onChange={(e) => updateCharacter("significantPeople", e.target.value)}
                          placeholder="Pessoas importantes na sua vida..."
                          className="mt-1 transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="meaningfulLocations">Locais Importantes</Label>
                        <Textarea
                          id="meaningfulLocations"
                          value={character.meaningfulLocations}
                          onChange={(e) => updateCharacter("meaningfulLocations", e.target.value)}
                          placeholder="Lugares que têm significado especial..."
                          className="mt-1 transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="treasuredPossessions">Pertences Queridos</Label>
                        <Textarea
                          id="treasuredPossessions"
                          value={character.treasuredPossessions}
                          onChange={(e) => updateCharacter("treasuredPossessions", e.target.value)}
                          placeholder="Objetos preciosos e importantes..."
                          className="mt-1 transition-colors duration-300"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="transition-colors duration-300">
                  <CardHeader>
                    <CardTitle className="font-semibold">Características & Traumas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="traits">Características</Label>
                        <Textarea
                          id="traits"
                          value={character.traits}
                          onChange={(e) => updateCharacter("traits", e.target.value)}
                          placeholder="Traços de personalidade..."
                          className="mt-1 transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="injuriesScars">Ferimentos & Cicatrizes</Label>
                        <Textarea
                          id="injuriesScars"
                          value={character.injuriesScars}
                          onChange={(e) => updateCharacter("injuriesScars", e.target.value)}
                          placeholder="Marcas físicas e ferimentos..."
                          className="mt-1 transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phobiasManias">Fobias & Manias</Label>
                        <Textarea
                          id="phobiasManias"
                          value={character.phobiasManias}
                          onChange={(e) => updateCharacter("phobiasManias", e.target.value)}
                          placeholder="Medos e obsessões..."
                          className="mt-1 transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="encounters">Encontros com Entidades Estranhas</Label>
                        <Textarea
                          id="encounters"
                          value={character.encounters}
                          onChange={(e) => updateCharacter("encounters", e.target.value)}
                          placeholder="Experiências sobrenaturais..."
                          className="mt-1 transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="arcaneTomes">Tomos Arcanos</Label>
                        <Textarea
                          id="arcaneTomes"
                          value={character.arcaneTomes}
                          onChange={(e) => updateCharacter("arcaneTomes", e.target.value)}
                          placeholder="Livros místicos..."
                          className="mt-1 transition-colors duration-300"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Vital */}
            <Card className="transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-semibold">
                  <Heart className="w-5 h-5 text-destructive" />
                  Status Vital
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hitPoints">Pontos de Vida</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        id="hitPoints"
                        type="number"
                        value={character.hitPoints}
                        onChange={(e) => updateCharacter("hitPoints", Number.parseInt(e.target.value) || 0)}
                        className="transition-colors duration-300"
                      />
                      <Badge variant="outline" className="text-xs">
                        /{character.maxHitPoints}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="sanity">Sanidade</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        id="sanity"
                        type="number"
                        value={character.sanity}
                        onChange={(e) => updateCharacter("sanity", Number.parseInt(e.target.value) || 0)}
                        className="transition-colors duration-300"
                      />
                      <Badge
                        variant={
                          character.sanity <= Math.floor(character.maxSanity / 5)
                            ? "destructive"
                            : character.sanity <= Math.floor(character.maxSanity / 2)
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        /{character.maxSanity}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="magicPoints">Pontos de Magia</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        id="magicPoints"
                        type="number"
                        value={character.magicPoints}
                        onChange={(e) => updateCharacter("magicPoints", Number.parseInt(e.target.value) || 0)}
                        className="transition-colors duration-300"
                      />
                      <Badge variant="outline" className="text-xs">
                        /{character.maxMagicPoints}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="luck">Sorte</Label>
                    <Input
                      id="luck"
                      type="number"
                      value={character.luck}
                      onChange={(e) => updateCharacter("luck", Number.parseInt(e.target.value) || 0)}
                      className="mt-1 transition-colors duration-300"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Character Actions */}
            <CharacterActions onExport={exportCharacter} onImport={importCharacter} onReset={resetCharacter} />

            {/* Rolagem de Dados */}
            <DiceRoller />

            {/* Referências Rápidas */}
            <Card className="transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-semibold">
                  <Skull className="w-5 h-5" />
                  Referências Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2 leading-relaxed">
                  <div>
                    <Badge variant="outline" className="mb-1 font-medium">
                      Níveis de Sucesso
                    </Badge>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Crítico (01) • Extremo (1/5) • Sólido (1/2) • Regular (&lt;=Perícia) • Falha (&gt;Perícia) •
                      Desastre (96+)
                    </p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-1 font-medium">
                      Ferimentos
                    </Badge>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Lesão Grave: ≥½ PV máximo em um ataque
                    </p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-1 font-medium">
                      Cura
                    </Badge>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Primeiros Socorros: 1PV • Medicina: +1d3 PVs
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
