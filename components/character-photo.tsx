"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Upload, RotateCcw, X } from "lucide-react"

interface CharacterPhotoProps {
  character: any
  updateCharacter: (field: string, value: any) => void
  className?: string
}

const compressImage = (file: File, maxWidth = 400, quality = 0.8): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")!
    const img = new Image()

    img.onload = () => {
      // Calculate new dimensions maintaining aspect ratio
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height)
      canvas.width = img.width * ratio
      canvas.height = img.height * ratio

      // Draw and compress
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      const compressedDataUrl = canvas.toDataURL("image/jpeg", quality)
      resolve(compressedDataUrl)
    }

    img.src = URL.createObjectURL(file)
  })
}

export function CharacterPhoto({ character, updateCharacter, className = "" }: CharacterPhotoProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [showControls, setShowControls] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)

  const { photo, photoZoom = 1.0, photoX = 0, photoY = 0 } = character

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      try {
        const compressedImage = await compressImage(file)
        updateCharacter("photo", compressedImage)
        updateCharacter("photoZoom", 1.0)
        updateCharacter("photoX", 0)
        updateCharacter("photoY", 0)
      } catch (error) {
        console.error("Error compressing image:", error)
      }
    }
  }

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!photo) return
      setIsDragging(true)
      setDragStart({ x: e.clientX - photoX, y: e.clientY - photoY })
    },
    [photo, photoX, photoY],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return
      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y
      updateCharacter("photoX", newX)
      updateCharacter("photoY", newY)
    },
    [isDragging, dragStart, updateCharacter],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const resetPhoto = () => {
    updateCharacter("photoZoom", 1.0)
    updateCharacter("photoX", 0)
    updateCharacter("photoY", 0)
  }

  const removePhoto = () => {
    updateCharacter("photo", undefined)
    updateCharacter("photoZoom", 1.0)
    updateCharacter("photoX", 0)
    updateCharacter("photoY", 0)
  }

  return (
    <div className="relative group">
      <div
        className={`relative overflow-hidden cursor-pointer ${className}`}
        onClick={() => !photo && fileInputRef.current?.click()}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {photo ? (
          <div
            ref={photoRef}
            className="relative w-full h-full cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              src={photo || "/placeholder.svg"}
              alt="Character"
              className="absolute object-cover select-none w-full h-full"
              style={{
                transform: `translate(${photoX}px, ${photoY}px) scale(${photoZoom})`,
                transformOrigin: "center",
              }}
              draggable={false}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground bg-muted/50">
            <Upload className="w-6 h-6 mb-1" />
            <p className="text-xs text-center">
              Adicionar
              <br />
              Foto
            </p>
          </div>
        )}

        {showControls && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex gap-1">
              <Button
                variant="secondary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  fileInputRef.current?.click()
                }}
              >
                <Upload className="w-3 h-3" />
              </Button>
              {photo && (
                <>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      resetPhoto()
                    }}
                  >
                    <RotateCcw className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      removePhoto()
                    }}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <Input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />

      {photo && showControls && (
        <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-card border rounded-md shadow-lg z-10">
          <Label className="text-xs font-medium">Zoom: {Math.round(photoZoom * 100)}%</Label>
          <Slider
            value={[photoZoom]}
            onValueChange={([value]) => updateCharacter("photoZoom", value)}
            min={0.5}
            max={3.0}
            step={0.1}
            className="mt-1"
          />
          <p className="text-xs text-muted-foreground mt-1">Arraste para reposicionar</p>
        </div>
      )}
    </div>
  )
}
