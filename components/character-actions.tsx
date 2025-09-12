"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Upload, RotateCcw, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CharacterActionsProps {
  onExport: () => void
  onImport: (file: File) => Promise<void>
  onReset: () => void
}

export function CharacterActions({ onExport, onImport, onReset }: CharacterActionsProps) {
  const [isImporting, setIsImporting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
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

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      // Reset do input antes de abrir
      fileInputRef.current.value = ""
      // Usar setTimeout para garantir que o click funcione em todos os navegadores
      setTimeout(() => {
        fileInputRef.current?.click()
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

        <Button onClick={handleReset} className="w-full" variant="destructive">
          <RotateCcw className="w-4 h-4 mr-2" />
          Resetar Ficha
        </Button>
      </CardContent>
    </Card>
  )
}
