"use client"

import { useState } from "react"
import { Copy, ExternalLink, Pipette, Upload, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ResponsiveAppShell } from "@/components/layout/ResponsiveAppShell"
import { renderSettingsTopTabs } from "@/components/layout/settingsTopTabs"
import { SharingSideMenu } from "@/components/sharing/SharingSideMenu"
import { StylizedQrPreview } from "@/components/sharing/StylizedQrPreview"

const colors = [
  "#4361ee",
  "#ef4444",
  "#ec4899",
  "#06b6d4",
  "#10b981",
  "#6b7280",
  "#f97316",
  "#8b5cf6",
  "#14b8a6",
]

type QrStyle = "square" | "rounded" | "circle"

const profileUrl = "avtive.co/syedmesumraza"

const styleOptions: { id: QrStyle; label: string }[] = [
  { id: "square", label: "Rectangle" },
  { id: "rounded", label: "Rounded rectangle" },
  { id: "circle", label: "Circle" },
]

function QrShapeIcon({ variant }: { variant: QrStyle }) {
  if (variant === "circle") {
    return (
      <svg viewBox="0 0 24 24" className="size-6 text-gray-700" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    )
  }

  if (variant === "rounded") {
    return (
      <svg viewBox="0 0 24 24" className="size-6 text-gray-700" fill="none" aria-hidden>
        <rect x="5" y="6" width="14" height="12" rx="3" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="size-6 text-gray-700" fill="none" aria-hidden>
      <rect x="5" y="6" width="14" height="12" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  )
}

export default function GenerateQrCodePage() {
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [selectedStyle, setSelectedStyle] = useState<QrStyle>("square")
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(profileUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <ResponsiveAppShell topTabs={renderSettingsTopTabs("sharing")}>
      <div className="grid min-w-0 gap-4 lg:grid-cols-[220px_minmax(0,1fr)_320px] lg:gap-6">
        <div className="min-w-0">
          <SharingSideMenu active="qr-code" />
        </div>

        <div className="min-w-0">
          <div className="mx-auto w-full max-w-xl">
            <div className="mb-6">
              <Label className="mb-3 block text-sm font-semibold text-gray-900">Custom logo</Label>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-gray-100">
                  <User className="size-7 text-gray-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="mb-2 text-xs text-gray-500">
                    Add custom logo to be displayed in the middle of the QR Code.
                  </p>
                  <Button variant="outline" className="gap-2">
                    <Upload className="size-4" />
                    Upload
                  </Button>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <Label htmlFor="qr-url" className="mb-2 block text-sm font-semibold text-gray-900">
                URL
              </Label>
              <div className="flex min-w-0 items-center gap-2">
                <Input
                  id="qr-url"
                  readOnly
                  value={profileUrl}
                  className="h-11 min-w-0 flex-1 rounded-lg border-gray-200 bg-white"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex size-11 shrink-0 items-center justify-center rounded-lg text-[#4361ee] hover:bg-blue-50"
                  aria-label="Copy URL"
                >
                  <Copy className="size-4" />
                </button>
              </div>
              {copied ? <p className="mt-1 text-xs text-[#4361ee]">Copied!</p> : null}
            </div>

            <div className="mb-6">
              <Label className="mb-3 block text-sm font-semibold text-gray-900">Choose color</Label>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
                  aria-label="Custom color"
                >
                  <Pipette className="size-4" />
                </button>
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`size-8 shrink-0 rounded-full transition-transform hover:scale-110 ${
                      selectedColor === color ? "ring-2 ring-[#4361ee] ring-offset-2" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <Label className="mb-3 block text-sm font-semibold text-gray-900">Choose a style</Label>
              <div className="flex flex-wrap gap-3">
                {styleOptions.map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setSelectedStyle(style.id)}
                    className={`flex size-12 flex-col items-center justify-center gap-1 rounded-lg border-2 bg-white px-1.5 transition-colors sm:size-14 ${
                      selectedStyle === style.id
                        ? "border-[#4361ee] bg-blue-50/30"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    aria-label={style.label}
                    title={style.label}
                  >
                    <QrShapeIcon variant={style.id} />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3">
              <Button variant="outline" className="h-10 rounded-lg px-6 text-sm sm:px-8">
                Cancel
              </Button>
              <Button className="h-10 rounded-lg bg-[#4361ee] px-6 text-sm hover:bg-[#3a56d4] sm:px-8">
                Update
              </Button>
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <div className="mx-auto w-full max-w-[320px]">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
                <span className="truncate text-sm text-gray-700">{profileUrl}</span>
              </div>
              <button
                type="button"
                className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
                aria-label="Open profile link"
              >
                <ExternalLink className="size-4" />
              </button>
            </div>

            <div
              className="overflow-hidden rounded-2xl p-6 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${selectedColor} 0%, #312e81 100%)`,
              }}
            >
              <div
                className={`relative mx-auto ${
                  selectedStyle === "circle"
                    ? "size-48 sm:size-52"
                    : selectedStyle === "rounded"
                      ? "size-48 sm:size-52"
                      : "h-48 w-52 sm:h-52 sm:w-56"
                }`}
              >
                <StylizedQrPreview
                  color={selectedColor}
                  shape={selectedStyle}
                  value={profileUrl}
                />
              </div>
              <p className="mt-5 text-center text-sm font-medium text-white">Scan to Connect</p>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveAppShell>
  )
}
