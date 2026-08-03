"use client"

import Image from "next/image"
import QRCode from "qrcode"
import { useEffect, useState, type ReactNode } from "react"

type QrShape = "square" | "rounded" | "circle"

type StylizedQrPreviewProps = {
  color: string
  shape: QrShape
  value?: string
  logoSrc?: string
  logo?: ReactNode
}

function containerShape(shape: QrShape) {
  if (shape === "circle") return "rounded-full"
  if (shape === "rounded") return "rounded-2xl"
  return "rounded-none"
}

function logoIslandShape(shape: QrShape) {
  if (shape === "circle") return "rounded-full"
  if (shape === "rounded") return "rounded-lg"
  return "rounded-sm"
}

function toQrUrl(value: string) {
  return value.startsWith("http") ? value : `https://${value}`
}

export function StylizedQrPreview({
  color,
  shape,
  value = "https://avtive.co/syedmesumraza",
  logoSrc = "/avtive.png",
  logo,
}: StylizedQrPreviewProps) {
  const [qrSvg, setQrSvg] = useState("")

  useEffect(() => {
    let cancelled = false

    QRCode.toString(toQrUrl(value), {
      type: "svg",
      errorCorrectionLevel: "H",
      margin: 1,
      color: { dark: color, light: "#FFFFFF" },
      width: 280,
    }).then((svg) => {
      if (!cancelled) setQrSvg(svg)
    })

    return () => {
      cancelled = true
    }
  }, [color, value])

  return (
    <div
      className={`relative size-full overflow-hidden bg-white p-2.5 sm:p-3 ${containerShape(shape)}`}
    >
      <div className="relative size-full">
        {qrSvg ? (
          <div
            className="size-full [&_svg]:block [&_svg]:h-full [&_svg]:w-full"
            dangerouslySetInnerHTML={{ __html: qrSvg }}
          />
        ) : (
          <div className="size-full animate-pulse rounded bg-gray-100" />
        )}

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`flex items-center justify-center bg-white p-1.5 ${logoIslandShape(shape)}`}
          >
            {logo ?? (
              <Image
                src={logoSrc}
                alt="Avtive"
                width={64}
                height={64}
                className="h-11 w-auto object-contain sm:h-12"
                priority
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
