"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Upload, RotateCcw, FileText, Save, Camera, Edit } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CharacterActionsProps {
  onExport: () => void
  onImport: (file: File) => Promise<void>
  onReset: () => void
  onSave?: () => void
  onPhotoUpload?: (file: File) => void
  onPhotoEdit?: () => void
}

export function CharacterActions({
  onExport,
  onImport,
  onReset,
  onSave,
  onPhotoUpload,
  onPhotoEdit,
}: CharacterActionsProps) {
  const [isImporting, setIsImporting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const photoInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsImporting(true)
    try {
      await onImport(file)
      toast({
        title: "Ficha importada!",
        description: "Os dados foram carregados com sucesso.",
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro desconhecido ao importar"
      toast({
        title: "Erro ao importar",
        description: message,
        variant: "destructive",
      })
    } finally {
      setIsImporting(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !onPhotoUpload) return

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um arquivo de imagem válido.",
        variant: "destructive",
      })
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      toast({
        title: "Erro",
        description: "A imagem deve ter no máximo 5MB.",
        variant: "destructive",
      })
      return
    }

    try {
      onPhotoUpload(file)
      toast({
        title: "Foto carregada!",
        description: "A foto foi adicionada com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro ao carregar foto",
        description: "Não foi possível processar a imagem.",
        variant: "destructive",
      })
    } finally {
      if (photoInputRef.current) {
        photoInputRef.current.value = ""
      }
    }
  }

  const handleReset = () => {
    try {
      if (typeof window !== "undefined" && window.confirm("Resetar toda a ficha? Esta ação não pode ser desfeita.")) {
        onReset()
        toast({
          title: "Ficha resetada",
          description: "Todos os dados foram limpos.",
        })
      }
    } catch (error) {
      toast({
        title: "Erro ao resetar",
        description: "Não foi possível resetar a ficha.",
        variant: "destructive",
      })
    }
  }

  const handleExport = () => {
    try {
      onExport()
      toast({
        title: "Ficha exportada!",
        description: "Download iniciado com sucesso.",
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro desconhecido ao exportar"
      toast({
        title: "Erro ao exportar",
        description: message,
        variant: "destructive",
      })
    }
  }

  const handleSave = async () => {
    if (!onSave) return

    setIsSaving(true)
    try {
      await onSave()
      toast({
        title: "Ficha salva!",
        description: "Todos os dados foram salvos localmente.",
      })
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar a ficha.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
      setTimeout(() => {
        fileInputRef.current?.click()
      }, 0)
    }
  }

  const triggerPhotoInput = () => {
    if (photoInputRef.current) {
      photoInputRef.current.value = ""
      setTimeout(() => {
        photoInputRef.current?.click()
      }, 0)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Gerenciar Ficha
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {onSave && (
          <Button onClick={handleSave} disabled={isSaving} className="w-full" variant="default">
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Salvando..." : "Salvar Ficha"}
          </Button>
        )}

        <Button onClick={handleExport} className="w-full bg-transparent" variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Exportar Ficha JSON
        </Button>

        <div className="relative">
          <Input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            disabled={isImporting}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            id="import-file"
          />
          <Button
            onClick={triggerFileInput}
            disabled={isImporting}
            className="w-full relative z-0 bg-transparent"
            variant="outline"
            type="button"
          >
            <Upload className="w-4 h-4 mr-2" />
            {isImporting ? "Importando..." : "Importar Ficha JSON"}
          </Button>
        </div>

        <div className="border-t pt-3 space-y-2">
          <h4 className="text-sm font-semibold text-muted-foreground">Foto do Personagem</h4>

          <div className="relative">
            <Input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              id="photo-upload"
            />
            <Button
              onClick={triggerPhotoInput}
              className="w-full relative z-0 bg-transparent"
              variant="outline"
              type="button"
            >
              <Camera className="w-4 h-4 mr-2" />
              Carregar Nova Foto
            </Button>
          </div>

          {onPhotoEdit && (
            <Button onClick={onPhotoEdit} className="w-full bg-transparent" variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Editar Foto
            </Button>
          )}
        </div>

        <Button onClick={handleReset} className="w-full" variant="destructive">
          <RotateCcw className="w-4 h-4 mr-2" />
          Resetar Ficha
        </Button>
      </CardContent>
    </Card>
  )
}
