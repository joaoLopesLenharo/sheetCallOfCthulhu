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
import { WaveText } from "@/components/wave-text"
import { SettingsSection } from "@/components/settings-section"
import { useState } from "react"

export default function CharacterSheet() {
  const { character, updateCharacter, exportCharacter, importCharacter, resetCharacter, saveCharacter } =
    useCharacterStorage()

  const [waveEnabled, setWaveEnabled] = useState(true)

  const handlePhotoUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      updateCharacter("photo", result)
    }
    reader.readAsDataURL(file)
  }

  const sanityRatio = character.sanity / character.maxSanity
  const insanityLevel = Math.max(0, 1 - sanityRatio * 2) // 0 a 1, onde 1 é completamente insano

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 font-sans">
      {/* Header */}
      <header className="bg-card border-b border-border py-6 px-4 shadow-lg transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-center flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                Call of Cthulhu
              </WaveText>
            </h1>
            <p className="text-muted-foreground mt-2 text-pretty font-medium">
              <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                Ficha de Investigador da Era Moderna
              </WaveText>
            </p>
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
              <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                Informações do Investigador
              </WaveText>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PersonalInfo
              character={character}
              updateCharacter={updateCharacter}
              insanityLevel={insanityLevel}
              waveEnabled={waveEnabled}
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="attributes" className="w-full">
              <TabsList className="grid w-full grid-cols-6 transition-colors duration-300">
                <TabsTrigger value="attributes" className="font-medium">
                  <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                    Atributos
                  </WaveText>
                </TabsTrigger>
                <TabsTrigger value="skills" className="font-medium">
                  <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                    Perícias
                  </WaveText>
                </TabsTrigger>
                <TabsTrigger value="combat" className="font-medium">
                  <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                    Combate
                  </WaveText>
                </TabsTrigger>
                <TabsTrigger value="sanity" className="font-medium">
                  <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                    Sanidade
                  </WaveText>
                </TabsTrigger>
                <TabsTrigger value="background" className="font-medium">
                  <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                    História
                  </WaveText>
                </TabsTrigger>
                <TabsTrigger value="settings" className="font-medium">
                  <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                    Config
                  </WaveText>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="attributes" className="space-y-4">
                <CharacterAttributes
                  character={character}
                  updateCharacter={updateCharacter}
                  insanityLevel={insanityLevel}
                  waveEnabled={waveEnabled}
                />
              </TabsContent>

              <TabsContent value="skills" className="space-y-4">
                <SkillsSection
                  character={character}
                  updateCharacter={updateCharacter}
                  insanityLevel={insanityLevel}
                  waveEnabled={waveEnabled}
                />
              </TabsContent>

              <TabsContent value="combat" className="space-y-4">
                <CombatSection
                  character={character}
                  updateCharacter={updateCharacter}
                  insanityLevel={insanityLevel}
                  waveEnabled={waveEnabled}
                />
              </TabsContent>

              <TabsContent value="sanity" className="space-y-4">
                <SanitySection
                  character={character}
                  updateCharacter={updateCharacter}
                  insanityLevel={insanityLevel}
                  waveEnabled={waveEnabled}
                />
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <SettingsSection
                  waveEnabled={waveEnabled}
                  onWaveToggle={setWaveEnabled}
                  insanityLevel={insanityLevel}
                />
              </TabsContent>

              <TabsContent value="background" className="space-y-4">
                <Card className="transition-colors duration-300">
                  <CardHeader>
                    <CardTitle className="font-semibold">
                      <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                        História Pessoal
                      </WaveText>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="ideology">
                          <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                            Ideologia/Crenças
                          </WaveText>
                        </Label>
                        <Textarea
                          id="ideology"
                          value={character.ideology}
                          onChange={(e) => updateCharacter("ideology", e.target.value)}
                          placeholder="Suas crenças e ideologias..."
                          className="mt-1 transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="significantPeople">
                          <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                            Pessoas Significativas
                          </WaveText>
                        </Label>
                        <Textarea
                          id="significantPeople"
                          value={character.significantPeople}
                          onChange={(e) => updateCharacter("significantPeople", e.target.value)}
                          placeholder="Pessoas importantes na sua vida..."
                          className="mt-1 transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="meaningfulLocations">
                          <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                            Locais Importantes
                          </WaveText>
                        </Label>
                        <Textarea
                          id="meaningfulLocations"
                          value={character.meaningfulLocations}
                          onChange={(e) => updateCharacter("meaningfulLocations", e.target.value)}
                          placeholder="Lugares que têm significado especial..."
                          className="mt-1 transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="treasuredPossessions">
                          <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                            Pertences Queridos
                          </WaveText>
                        </Label>
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
                    <CardTitle className="font-semibold">
                      <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                        Características & Traumas
                      </WaveText>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="traits">
                          <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                            Características
                          </WaveText>
                        </Label>
                        <Textarea
                          id="traits"
                          value={character.traits}
                          onChange={(e) => updateCharacter("traits", e.target.value)}
                          placeholder="Traços de personalidade..."
                          className="mt-1 transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="injuriesScars">
                          <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                            Ferimentos & Cicatrizes
                          </WaveText>
                        </Label>
                        <Textarea
                          id="injuriesScars"
                          value={character.injuriesScars}
                          onChange={(e) => updateCharacter("injuriesScars", e.target.value)}
                          placeholder="Marcas físicas e ferimentos..."
                          className="mt-1 transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phobiasManias">
                          <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                            Fobias & Manias
                          </WaveText>
                        </Label>
                        <Textarea
                          id="phobiasManias"
                          value={character.phobiasManias}
                          onChange={(e) => updateCharacter("phobiasManias", e.target.value)}
                          placeholder="Medos e obsessões..."
                          className="mt-1 transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="encounters">
                          <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                            Encontros com Entidades Estranhas
                          </WaveText>
                        </Label>
                        <Textarea
                          id="encounters"
                          value={character.encounters}
                          onChange={(e) => updateCharacter("encounters", e.target.value)}
                          placeholder="Experiências sobrenaturais..."
                          className="mt-1 transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="arcaneTomes">
                          <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                            Tomos Arcanos
                          </WaveText>
                        </Label>
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
                  <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                    Status Vital
                  </WaveText>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hitPoints">
                      <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                        Pontos de Vida
                      </WaveText>
                    </Label>
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
                    <div className="w-full bg-muted rounded-full h-2 mt-2">
                      <div
                        className="h-2 rounded-full transition-all duration-300 bg-red-500"
                        style={{
                          width: `${Math.max(0, Math.min(100, (character.hitPoints / character.maxHitPoints) * 100))}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="sanity">
                      <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                        Sanidade
                      </WaveText>
                    </Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        id="sanity"
                        type="number"
                        value={character.sanity}
                        onChange={(e) =>
                          updateCharacter("sanity", Math.min(character.maxSanity, Number.parseInt(e.target.value) || 0))
                        }
                        className="transition-colors duration-300"
                        max={character.maxSanity}
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
                    <Label htmlFor="magicPoints">
                      <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                        Pontos de Magia
                      </WaveText>
                    </Label>
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
                    <Label htmlFor="luck">
                      <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                        Sorte
                      </WaveText>
                    </Label>
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
            <CharacterActions
              onExport={exportCharacter}
              onImport={importCharacter}
              onReset={resetCharacter}
              onSave={saveCharacter}
              onPhotoUpload={handlePhotoUpload}
            />

            {/* Rolagem de Dados */}
            <DiceRoller insanityLevel={insanityLevel} waveEnabled={waveEnabled} />

            {/* Referências Rápidas */}
            <Card className="transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-semibold">
                  <Skull className="w-5 h-5" />
                  <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                    Referências Rápidas
                  </WaveText>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2 leading-relaxed">
                  <div>
                    <Badge variant="outline" className="mb-1 font-medium">
                      <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                        Níveis de Sucesso
                      </WaveText>
                    </Badge>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                        Crítico (01) • Extremo (1/5) • Sólido (1/2) • Regular (&lt;=Perícia) • Falha (&gt;Perícia) •
                        Desastre (96+)
                      </WaveText>
                    </p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-1 font-medium">
                      <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                        Ferimentos
                      </WaveText>
                    </Badge>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                        Lesão Grave: ≥½ PV máximo em um ataque
                      </WaveText>
                    </p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-1 font-medium">
                      <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                        Cura
                      </WaveText>
                    </Badge>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <WaveText insanityLevel={insanityLevel} waveEnabled={waveEnabled}>
                        Primeiros Socorros: 1PV • Medicina: +1d3 PVs
                      </WaveText>
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
