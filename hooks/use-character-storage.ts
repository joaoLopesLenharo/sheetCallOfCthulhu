"use client"

import { useState, useCallback, useEffect } from "react"

export interface CharacterData {
  name: string
  player: string
  occupation: string
  age: string
  sex: string
  residence: string
  birthplace: string
  str: number
  con: number
  siz: number
  dex: number
  app: number
  edu: number
  int: number
  pow: number
  luck: number
  sanity: number
  magicPoints: number
  hitPoints: number
  dodge: number
  damageBonus: string
  build: number
  movementRate: number
  maxHitPoints: number
  maxSanity: number
  maxMagicPoints: number
  mythosCthulhu: number
  temporaryInsanity: number
  indefiniteInsanity: number
  ideology: string
  significantPeople: string
  meaningfulLocations: string
  treasuredPossessions: string
  traits: string
  injuriesScars: string
  phobiasManias: string
  arcaneTomes: string
  encounters: string
  photo?: string // base64 encoded image
  photoZoom?: number // zoom level (1.0 = 100%)
  photoX?: number // horizontal position offset
  photoY?: number // vertical position offset
  weapons?: Array<{
    id: number
    name: string
    regular: number
    hard: number
    extreme: number
    damage: string
    range: string
    attacks: string
    ammo: string
    malfunction: string
  }>
  // Perícias Acadêmicas
  anthropology: number
  archaeology: number
  history: number
  library: number
  occultism: number
  science_astronomy: number
  science_biology: number
  science_botany: number
  science_chemistry: number
  science_cryptography: number
  science_engineering: number
  science_forensics: number
  science_geology: number
  science_mathematics: number
  science_meteorology: number
  science_pharmacy: number
  science_physics: number
  science_zoology: number
  law: number
  accounting: number
  knowledge_cthulhu_mythos: number
  // Perícias de Combate
  firearms_handgun: number
  firearms_rifle: number
  firearms_shotgun: number
  firearms_submachine: number
  firearms_machine: number
  firearms_heavy: number
  firearms_flamethrower: number
  bow: number
  artillery: number
  fighting_brawl: number
  fighting_sword: number
  fighting_axe: number
  fighting_spear: number
  fighting_whip: number
  fighting_flail: number
  fighting_garrote: number
  fighting_chainsaw: number
  throw: number
  // Perícias Técnicas
  electrical_repair: number
  mechanical_repair: number
  electronics: number
  computer_use: number
  drive_auto: number
  pilot_aircraft: number
  pilot_boat: number
  operate_machinery: number
  locksmith: number
  demolitions: number
  art_craft_acting: number
  art_craft_fine_art: number
  art_craft_forgery: number
  art_craft_photography: number
  appraise: number
  sleight_of_hand: number
  // Perícias Sociais
  charm: number
  fast_talk: number
  intimidate: number
  persuade: number
  psychology: number
  psychoanalysis: number
  disguise: number
  credit_rating: number
  // Perícias de Percepção e Movimento
  spot_hidden: number
  listen: number
  stealth: number
  track: number
  climb: number
  jump: number
  swim: number
  ride: number
  navigate: number
  natural_world: number
  survival_arctic: number
  survival_desert: number
  survival_sea: number
  // Perícias Especializadas
  medicine: number
  first_aid: number
  hypnosis: number
  lip_reading: number
  diving: number
  animal_handling: number
  language_own: number
  language_other: number
  customSkills?: Array<{
    id: string
    name: string
    value: number
  }>
  [key: string]: string | number | undefined | Array<any>
}

const calculateDodge = (dex: number) => Math.floor(dex / 2)

const calculateDamageBonus = (str: number, siz: number) => {
  const total = str + siz
  if (total <= 64) return "-2"
  if (total <= 84) return "-1"
  if (total <= 124) return "0"
  if (total <= 164) return "+1d4"
  if (total <= 204) return "+1d6"
  if (total <= 284) return "+2d6"
  if (total <= 364) return "+3d6"
  if (total <= 444) return "+4d6"
  return "+5d6"
}

const calculateBuild = (str: number, siz: number) => {
  const total = str + siz
  if (total <= 64) return -2
  if (total <= 84) return -1
  if (total <= 124) return 0
  if (total <= 164) return 1
  if (total <= 204) return 2
  if (total <= 284) return 3
  if (total <= 364) return 4
  if (total <= 444) return 5
  return 6
}

const calculateMovementRate = (str: number, dex: number, siz: number, age: number) => {
  let mov = 8

  // Age adjustments
  if (age >= 40 && age < 50) mov = 7
  else if (age >= 50 && age < 60) mov = 6
  else if (age >= 60 && age < 70) mov = 5
  else if (age >= 70 && age < 80) mov = 4
  else if (age >= 80) mov = 3

  // STR and DEX vs SIZ comparison
  if (str < siz && dex < siz) mov -= 1
  if (str > siz && dex > siz) mov += 1

  return Math.max(mov, 1)
}

const calculateMaxHitPoints = (con: number, siz: number) => Math.floor((con + siz) / 10)

const calculateMaxSanity = (pow: number, mythos = 0) => 99 - mythos

const calculateMaxMagicPoints = (pow: number) => Math.floor(pow / 5)

const calculateDerivedValues = (character: CharacterData) => {
  const ageNum = Number(character.age) || 0

  return {
    dodge: calculateDodge(character.dex),
    damageBonus: calculateDamageBonus(character.str, character.siz),
    build: calculateBuild(character.str, character.siz),
    movementRate: calculateMovementRate(character.str, character.dex, character.siz, ageNum),
    maxHitPoints: calculateMaxHitPoints(character.con, character.siz),
    maxSanity: calculateMaxSanity(character.pow, character.mythosCthulhu || 0),
    maxMagicPoints: calculateMaxMagicPoints(character.pow),
  }
}

const defaultCharacter: CharacterData = {
  name: "",
  player: "",
  occupation: "",
  age: "",
  sex: "",
  residence: "",
  birthplace: "",
  str: 0,
  con: 0,
  siz: 0,
  dex: 0,
  app: 0,
  edu: 0,
  int: 0,
  pow: 0,
  luck: 0,
  sanity: 0,
  magicPoints: 0,
  hitPoints: 0,
  dodge: 0,
  damageBonus: "0",
  build: 0,
  movementRate: 8,
  maxHitPoints: 0,
  maxSanity: 0,
  maxMagicPoints: 0,
  mythosCthulhu: 0,
  temporaryInsanity: 0,
  indefiniteInsanity: 0,
  ideology: "",
  significantPeople: "",
  meaningfulLocations: "",
  treasuredPossessions: "",
  traits: "",
  injuriesScars: "",
  phobiasManias: "",
  arcaneTomes: "",
  encounters: "",
  photo: undefined,
  photoZoom: 1.0,
  photoX: 0,
  photoY: 0,
  weapons: [
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
  ],
  // Perícias Acadêmicas
  anthropology: 1,
  archaeology: 1,
  history: 20,
  library: 20,
  occultism: 5,
  science_astronomy: 1,
  science_biology: 1,
  science_botany: 1,
  science_chemistry: 1,
  science_cryptography: 1,
  science_engineering: 1,
  science_forensics: 1,
  science_geology: 1,
  science_mathematics: 1,
  science_meteorology: 1,
  science_pharmacy: 1,
  science_physics: 1,
  science_zoology: 1,
  law: 5,
  accounting: 5,
  knowledge_cthulhu_mythos: 0,
  // Perícias de Combate
  firearms_handgun: 20,
  firearms_rifle: 25,
  firearms_shotgun: 25,
  firearms_submachine: 15,
  firearms_machine: 10,
  firearms_heavy: 10,
  firearms_flamethrower: 10,
  bow: 15,
  artillery: 1,
  fighting_brawl: 25,
  fighting_sword: 20,
  fighting_axe: 15,
  fighting_spear: 20,
  fighting_whip: 5,
  fighting_flail: 10,
  fighting_garrote: 15,
  fighting_chainsaw: 10,
  throw: 20,
  // Perícias Técnicas
  electrical_repair: 10,
  mechanical_repair: 10,
  electronics: 1,
  computer_use: 5,
  drive_auto: 20,
  pilot_aircraft: 1,
  pilot_boat: 1,
  operate_machinery: 1,
  locksmith: 1,
  demolitions: 1,
  art_craft_acting: 5,
  art_craft_fine_art: 5,
  art_craft_forgery: 5,
  art_craft_photography: 5,
  appraise: 5,
  sleight_of_hand: 10,
  // Perícias Sociais
  charm: 15,
  fast_talk: 5,
  intimidate: 15,
  persuade: 10,
  psychology: 10,
  psychoanalysis: 1,
  disguise: 5,
  credit_rating: 0,
  // Perícias de Percepção e Movimento
  spot_hidden: 25,
  listen: 20,
  stealth: 20,
  track: 10,
  climb: 20,
  jump: 20,
  swim: 20,
  ride: 5,
  navigate: 10,
  natural_world: 10,
  survival_arctic: 10,
  survival_desert: 10,
  survival_sea: 10,
  // Perícias Especializadas
  medicine: 1,
  first_aid: 30,
  hypnosis: 1,
  lip_reading: 1,
  diving: 1,
  animal_handling: 5,
  language_own: 0,
  language_other: 1,
  customSkills: [],
}

export function useCharacterStorage() {
  const [character, setCharacter] = useState<CharacterData>(() => {
    const derivedValues = calculateDerivedValues(defaultCharacter)
    return { ...defaultCharacter, ...derivedValues }
  })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && !isLoaded) {
      try {
        const savedCharacter = localStorage.getItem("cthulhu-character")
        if (savedCharacter) {
          const parsed = JSON.parse(savedCharacter)
          const characterWithDefaults = { ...defaultCharacter, ...parsed }
          const derivedValues = calculateDerivedValues(characterWithDefaults)
          const result = { ...characterWithDefaults, ...derivedValues }
          setCharacter(result)
        }
      } catch (error) {
        console.error("Erro ao carregar personagem:", error)
        // Limpar localStorage corrompido
        localStorage.removeItem("cthulhu-character")
      }
      setIsLoaded(true)
    }
  }, [isLoaded])

  const updateCharacter = useCallback((field: string, value: string | number | undefined) => {
    setCharacter((prev) => {
      const updated = { ...prev, [field]: value }

      if (field === "mythosCthulhu") {
        updated.knowledge_cthulhu_mythos = value as number
      } else if (field === "knowledge_cthulhu_mythos") {
        updated.mythosCthulhu = value as number
      }

      const derivedValues = calculateDerivedValues(updated)
      const newCharacter = { ...updated, ...derivedValues }

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("cthulhu-character", JSON.stringify(newCharacter))
        } catch (error) {
          console.error("Erro ao salvar personagem:", error)
        }
      }

      return newCharacter
    })
  }, [])

  const exportCharacter = useCallback(() => {
    try {
      const dataStr = JSON.stringify(character, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${character.name || "investigador"}-ficha.json`
      link.style.display = "none"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Erro ao exportar:", error)
      throw new Error("Erro ao exportar ficha")
    }
  }, [character])

  const importCharacter = useCallback((file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error("Nenhum arquivo selecionado"))
        return
      }

      if (!file.name.toLowerCase().endsWith(".json")) {
        reject(new Error("Arquivo deve ter extensão .json"))
        return
      }

      if (file.size > 2 * 1024 * 1024) {
        reject(new Error("Arquivo muito grande (máximo 2MB)"))
        return
      }

      const reader = new FileReader()

      reader.onload = (event) => {
        try {
          const content = event.target?.result as string

          if (!content || content.trim() === "") {
            throw new Error("Arquivo vazio")
          }

          let imported: any
          try {
            imported = JSON.parse(content)
          } catch {
            throw new Error("Arquivo JSON inválido")
          }

          if (!imported || typeof imported !== "object") {
            throw new Error("Formato de dados inválido")
          }

          const characterWithDefaults = JSON.parse(JSON.stringify(defaultCharacter))

          Object.keys(imported).forEach((key) => {
            if (imported[key] !== undefined && imported[key] !== null) {
              if (Array.isArray(imported[key])) {
                characterWithDefaults[key] = [...imported[key]]
              } else if (typeof imported[key] === "object") {
                characterWithDefaults[key] = { ...imported[key] }
              } else {
                characterWithDefaults[key] = typeof imported[key] === "number" ? imported[key] : imported[key]
              }
            }
          })

          if (imported.weapons && Array.isArray(imported.weapons)) {
            characterWithDefaults.weapons = imported.weapons.map((weapon: any, index: number) => ({
              id: weapon.id || Date.now() + index,
              name: weapon.name || "",
              regular: Number(weapon.regular) || 0,
              hard: Number(weapon.hard) || 0,
              extreme: Number(weapon.extreme) || 0,
              damage: weapon.damage || "",
              range: weapon.range || "",
              attacks: weapon.attacks || "1",
              ammo: weapon.ammo || "",
              malfunction: weapon.malfunction || "",
            }))
          }

          if (imported.customSkills && Array.isArray(imported.customSkills)) {
            characterWithDefaults.customSkills = imported.customSkills.map((skill: any, index: number) => ({
              id: skill.id || `custom_${Date.now()}_${index}`,
              name: skill.name || "",
              value: Number(skill.value) || 0,
            }))
          }

          const derivedValues = calculateDerivedValues(characterWithDefaults)

          if (imported.dodge !== undefined) derivedValues.dodge = Number(imported.dodge)
          if (imported.damageBonus !== undefined) derivedValues.damageBonus = imported.damageBonus
          if (imported.build !== undefined) derivedValues.build = Number(imported.build)
          if (imported.movementRate !== undefined) derivedValues.movementRate = Number(imported.movementRate)
          if (imported.maxHitPoints !== undefined) derivedValues.maxHitPoints = Number(imported.maxHitPoints)
          if (imported.maxSanity !== undefined) derivedValues.maxSanity = Number(imported.maxSanity)
          if (imported.maxMagicPoints !== undefined) derivedValues.maxMagicPoints = Number(imported.maxMagicPoints)

          const newCharacter = { ...characterWithDefaults, ...derivedValues }

          setCharacter(newCharacter)

          if (typeof window !== "undefined") {
            try {
              localStorage.setItem("cthulhu-character", JSON.stringify(newCharacter))
            } catch (error) {
              console.error("Erro ao salvar após importação:", error)
            }
          }

          resolve()
        } catch (error) {
          reject(error instanceof Error ? error : new Error("Erro ao processar arquivo"))
        }
      }

      reader.onerror = () => {
        reject(new Error("Erro ao ler arquivo"))
      }

      reader.readAsText(file, "utf-8")
    })
  }, [])

  const resetCharacter = useCallback(() => {
    const derivedValues = calculateDerivedValues(defaultCharacter)
    const resetChar = { ...defaultCharacter, ...derivedValues }
    setCharacter(resetChar)

    if (typeof window !== "undefined") {
      localStorage.removeItem("cthulhu-character")
    }
  }, [])

  const saveCharacter = useCallback(async () => {
    return new Promise<void>((resolve, reject) => {
      try {
        if (typeof window !== "undefined") {
          localStorage.setItem("cthulhu-character", JSON.stringify(character))
          resolve()
        } else {
          reject(new Error("Ambiente não suporta localStorage"))
        }
      } catch (error) {
        reject(error)
      }
    })
  }, [character])

  return {
    character,
    updateCharacter,
    exportCharacter,
    importCharacter,
    resetCharacter,
    saveCharacter, // Exportando nova função
  }
}
