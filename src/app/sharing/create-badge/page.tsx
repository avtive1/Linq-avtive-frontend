"use client"

import { useState } from "react"
import { QrCode, Upload, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { PersonPhoto } from "@/components/avtive"
import { ResponsiveAppShell } from "@/components/layout/ResponsiveAppShell"
import { renderSettingsTopTabs } from "@/components/layout/settingsTopTabs"
import { SharingSideMenu } from "@/components/sharing/SharingSideMenu"

type BadgeType = "badge" | "name-tag" | "square"

interface BadgeFields {
  profilePhoto: boolean
  name: boolean
  jobTitle: boolean
  company: boolean
  callToAction: boolean
  location: boolean
  qrCodeLogo: boolean
  qrCode: boolean
  socialMedia: boolean
}

export default function CreateEventBadgePage() {
  const [badgeType, setBadgeType] = useState<BadgeType>("name-tag")
  const [ctaText, setCtaText] = useState("Scan to connect")
  const [fields, setFields] = useState<BadgeFields>({
    profilePhoto: true,
    name: true,
    jobTitle: false,
    company: false,
    callToAction: false,
    location: true,
    qrCodeLogo: true,
    qrCode: false,
    socialMedia: false,
  })

  const toggleField = (key: keyof BadgeFields) => {
    setFields((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <ResponsiveAppShell topTabs={renderSettingsTopTabs("sharing")}>
      <div className="grid min-w-0 gap-4 lg:grid-cols-[220px_minmax(0,1fr)_320px] lg:gap-6">
        <div className="min-w-0">
          <SharingSideMenu active="create-badge" />
        </div>

        <div className="min-w-0">
          <div className="mx-auto w-full max-w-xl">
            <div className="mb-6 space-y-3">
              {(["badge", "name-tag", "square"] as BadgeType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setBadgeType(type)}
                  className={`flex w-full items-center justify-between rounded-xl border-2 px-4 py-3.5 text-sm font-medium transition-colors ${
                    badgeType === type
                      ? "border-[#4361ee] bg-blue-50 text-[#4361ee]"
                      : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span>{type === "badge" ? "Badge" : type === "name-tag" ? "Name Tag" : "Square"}</span>
                  <div className={`flex size-5 items-center justify-center rounded-full ${badgeType === type ? "bg-[#4361ee]" : "border-2 border-gray-300"}`}>
                    {badgeType === type && <div className="size-2 rounded-full bg-white" />}
                  </div>
                </button>
              ))}
            </div>

            <div className="mb-6 h-px bg-gray-100" />
            <div className="mb-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {[
                ["profile", "profilePhoto", "Profile Photo"],
                ["location", "location", "Location"],
                ["name", "name", "Name"],
                ["qr-logo", "qrCodeLogo", "QR Code Logo"],
                ["job", "jobTitle", "Job Title"],
                ["qr", "qrCode", "QR Code"],
                ["company", "company", "Company"],
                ["social", "socialMedia", "Social media"],
                ["cta", "callToAction", "Call to Action"],
              ].map(([id, key, label]) => (
                <div className="flex items-center gap-2.5" key={id}>
                  <Checkbox id={id} checked={fields[key as keyof BadgeFields]} onCheckedChange={() => toggleField(key as keyof BadgeFields)} className="data-[state=checked]:border-[#4361ee] data-[state=checked]:bg-[#4361ee]" />
                  <Label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</Label>
                </div>
              ))}
            </div>

            <div className="mb-6 h-px bg-gray-100" />
            <div className="mb-6">
              <Label htmlFor="cta-text" className="mb-2 block text-sm font-semibold text-gray-900">
                Call to action text<span className="text-red-500">*</span>
              </Label>
              <Input id="cta-text" value={ctaText} onChange={(e) => setCtaText(e.target.value)} className="h-11 rounded-lg border-gray-200 bg-white" />
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3">
              <Button variant="outline" className="h-10 rounded-lg px-6 text-sm sm:px-8">Cancel</Button>
              <Button className="h-10 rounded-lg bg-[#4361ee] px-6 text-sm hover:bg-[#3a56d4] sm:px-8">Download</Button>
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <div className="mx-auto w-full max-w-[320px]">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
                <span className="truncate text-sm text-gray-700">avtive.co/syedmesumraza</span>
              </div>
              <button className="flex size-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50">
                <Upload className="size-4" />
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="p-5">
                <div className="mb-4 flex items-center justify-center gap-4">
                  {fields.profilePhoto && <PersonPhoto className="size-20 rounded-full sm:size-24" />}
                  {(fields.qrCode || fields.qrCodeLogo) && (
                    <div className="relative flex size-24 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm sm:size-28">
                      <QrCode className="size-16 text-gray-800 sm:size-20" />
                    </div>
                  )}
                </div>
                <div className="space-y-1 text-center">
                  {fields.name && <h3 className="text-lg font-bold text-gray-900">Syed Mesum Raza</h3>}
                  {(fields.jobTitle || fields.company) && <p className="text-sm text-gray-600">Creative Director {fields.company && <span className="text-[#4361ee]">Avtive</span>}</p>}
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600"><Mail className="size-3.5 shrink-0 text-gray-400" /><span className="text-xs">syedmesum@gmail.com</span></div>
                  <div className="flex items-center gap-2 text-sm text-gray-600"><Phone className="size-3.5 shrink-0 text-gray-400" /><span className="text-xs">+380 93 781 8425</span></div>
                </div>
                {fields.location && <p className="mt-2 text-[10px] text-gray-400">Islamabad, Pakistan</p>}
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-[10px] font-medium text-gray-500">{fields.callToAction ? ctaText : ""}</span>
                  <span className="text-[10px] uppercase text-gray-400">{badgeType}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveAppShell>
  )
}