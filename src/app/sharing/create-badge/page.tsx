"use client"

import { useState } from "react"
import {
  LayoutDashboard, CreditCard, Clock, FolderKanban, Users, Puzzle, Gift,
  FileText, Settings, HelpCircle, CheckCircle2, ChevronDown, Search, Bell, Eye, Plus,
  QrCode, BadgeCheck, ImageIcon, Mail, Copy, Upload, Phone
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { AvtiveLogo, PersonPhoto } from "@/components/avtive"
import { QRCodeDialog } from "@/components/sharing/QRCodeDialog"

const sidebarTools = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: CreditCard, label: "My Card", href: "/settings/v-card", active: true },
  { icon: Clock, label: "Time Off", href: "#" },
  { icon: FolderKanban, label: "Projects", href: "#" },
  { icon: Users, label: "Teams", href: "#" },
  { icon: Puzzle, label: "Integrations", href: "#" },
  { icon: Gift, label: "Benefits", href: "#" },
  { icon: FileText, label: "Documents", href: "#" },
]

const menuItems = [
  { icon: QrCode, label: "Generate QR Code" },
  { icon: BadgeCheck, label: "Create Event Badge", active: true },
  { icon: ImageIcon, label: "Virtual Background" },
  { icon: Mail, label: "Email Signature" },
]

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
  const [qrDialogOpen, setQrDialogOpen] = useState(false)
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
    <div className="flex min-h-screen w-full bg-[#F9FAFB]">
      <QRCodeDialog open={qrDialogOpen} onOpenChange={setQrDialogOpen} />
      {/* Sidebar */}
      <aside className="flex w-[250px] shrink-0 flex-col justify-between border-r border-gray-100 bg-white py-5">
        <div>
          <div className="mb-6 flex items-center gap-2 px-5">
            <PersonPhoto className="size-8 rounded-full" />
            <span className="text-sm font-semibold text-gray-800">Syed&apos;s Workspace</span>
            <ChevronDown className="ml-auto size-4 text-gray-400" />
          </div>
          <p className="mb-3 px-5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Tools</p>
          <nav className="flex flex-col gap-0.5 px-3">
            {sidebarTools.map((tool) => (
              <a key={tool.label} href={tool.href} className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                  tool.active ? "bg-blue-50 font-medium text-[#4361ee]" : "text-gray-600 hover:bg-gray-50"
                }`}>
                {tool.active && <div className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[#4361ee]" />}
                <tool.icon className="size-[18px]" />
                {tool.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-1 px-3">
          <a href="/settings" className="flex items-center gap-3 rounded-lg bg-blue-50 px-3 py-2.5 text-sm font-medium text-[#4361ee]">
            <Settings className="size-[18px]" /> Settings
          </a>
          <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50">
            <HelpCircle className="size-[18px]" /> Support
          </a>
          <div className="mt-3 flex items-center gap-3 rounded-xl bg-gray-50 p-3">
            <PersonPhoto className="size-10 rounded-full" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <p className="text-sm font-medium text-gray-800">Sophia Williams</p>
                <CheckCircle2 className="size-3.5 text-blue-500" />
              </div>
              <p className="truncate text-[11px] text-gray-400">sophia@alignui.com</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-auto">
        {/* Top Bar */}
        <header className="flex items-center justify-between border-b border-gray-100 bg-white px-8 py-4">
          <div className="flex items-center gap-6">
            <AvtiveLogo />
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-800">Syed Mesum Raza</span>
              <span className="text-sm text-gray-500">— Welcome to Avtive 👋</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1.5">
              <div className="h-1.5 w-28 overflow-hidden rounded-full bg-gray-200">
                <div className="h-full w-full rounded-full bg-[#4361ee]" />
              </div>
              <span className="text-xs font-medium text-gray-500">100%</span>
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-green-600">
              <CheckCircle2 className="size-4" /> Profile Completed
            </span>
            <div className="mx-2 h-5 w-px bg-gray-200" />
            <button className="text-gray-400 hover:text-gray-600"><Search className="size-5" /></button>
            <button className="text-gray-400 hover:text-gray-600"><Bell className="size-5" /></button>
            <Button variant="outline" className="gap-1.5 rounded-lg text-xs font-medium">
              <Eye className="size-4" /> Preview
            </Button>
            <Button className="gap-1.5 rounded-lg bg-[#4361ee] text-xs font-medium text-white hover:bg-[#3a56d4]">
              <Plus className="size-4" /> New
            </Button>
          </div>
        </header>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-100 bg-white px-8 py-3 text-sm">
          <a href="/settings" className="text-gray-400 pb-2">General Settings</a>
          <a href="/settings/profile" className="text-gray-400 pb-2">Profile Settings</a>
          <a href="/settings/company" className="text-gray-400 pb-2">Company Settings</a>
          <span className="font-medium text-[#4361ee] border-b-2 border-[#4361ee] pb-2">Sharing</span>
          <a href="/leads-follow-up" className="text-gray-400 pb-2">Leads Follow up</a>
        </div>

        <div className="flex flex-1 gap-6 p-8">
          {/* Left: Side Menu */}
          <div className="w-[220px] shrink-0">
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">SELECT MENU</p>
              <nav className="flex flex-col gap-1">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      if (item.label === "Generate QR Code") {
                        setQrDialogOpen(true)
                      }
                    }}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm ${
                      item.active ? "bg-blue-50 font-medium text-[#4361ee]" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="size-4" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Center: Main Form */}
          <div className="flex-1 max-w-xl">
            {/* Badge Style Selector */}
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
                  <div className={`flex size-5 items-center justify-center rounded-full ${
                    badgeType === type ? "bg-[#4361ee]" : "border-2 border-gray-300"
                  }`}>
                    {badgeType === type && <div className="size-2 rounded-full bg-white" />}
                  </div>
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="mb-6 h-px bg-gray-100" />

            {/* Options Checkboxes */}
            <div className="mb-6 grid grid-cols-2 gap-x-6 gap-y-3">
              <div className="flex items-center gap-2.5">
                <Checkbox id="profile" checked={fields.profilePhoto} onCheckedChange={() => toggleField("profilePhoto")} className="data-[state=checked]:bg-[#4361ee] data-[state=checked]:border-[#4361ee]" />
                <Label htmlFor="profile" className="text-sm font-medium text-gray-700">Profile Photo</Label>
              </div>
              <div className="flex items-center gap-2.5">
                <Checkbox id="location" checked={fields.location} onCheckedChange={() => toggleField("location")} className="data-[state=checked]:bg-[#4361ee] data-[state=checked]:border-[#4361ee]" />
                <Label htmlFor="location" className="text-sm font-medium text-gray-700">Location</Label>
              </div>
              <div className="flex items-center gap-2.5">
                <Checkbox id="name" checked={fields.name} onCheckedChange={() => toggleField("name")} className="data-[state=checked]:bg-[#4361ee] data-[state=checked]:border-[#4361ee]" />
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">Name</Label>
              </div>
              <div className="flex items-center gap-2.5">
                <Checkbox id="qr-logo" checked={fields.qrCodeLogo} onCheckedChange={() => toggleField("qrCodeLogo")} className="data-[state=checked]:bg-[#4361ee] data-[state=checked]:border-[#4361ee]" />
                <Label htmlFor="qr-logo" className="text-sm font-medium text-gray-700">QR Code Logo</Label>
              </div>
              <div className="flex items-center gap-2.5">
                <Checkbox id="job" checked={fields.jobTitle} onCheckedChange={() => toggleField("jobTitle")} className="data-[state=checked]:bg-[#4361ee] data-[state=checked]:border-[#4361ee]" />
                <Label htmlFor="job" className="text-sm font-medium text-gray-700">Job Title</Label>
              </div>
              <div className="flex items-center gap-2.5">
                <Checkbox id="qr" checked={fields.qrCode} onCheckedChange={() => toggleField("qrCode")} className="data-[state=checked]:bg-[#4361ee] data-[state=checked]:border-[#4361ee]" />
                <Label htmlFor="qr" className="text-sm font-medium text-gray-700">QR Code</Label>
              </div>
              <div className="flex items-center gap-2.5">
                <Checkbox id="company" checked={fields.company} onCheckedChange={() => toggleField("company")} className="data-[state=checked]:bg-[#4361ee] data-[state=checked]:border-[#4361ee]" />
                <Label htmlFor="company" className="text-sm font-medium text-gray-700">Company</Label>
              </div>
              <div className="flex items-center gap-2.5">
                <Checkbox id="social" checked={fields.socialMedia} onCheckedChange={() => toggleField("socialMedia")} className="data-[state=checked]:bg-[#4361ee] data-[state=checked]:border-[#4361ee]" />
                <Label htmlFor="social" className="text-sm font-medium text-gray-700">Social media</Label>
              </div>
              <div className="flex items-center gap-2.5">
                <Checkbox id="cta" checked={fields.callToAction} onCheckedChange={() => toggleField("callToAction")} className="data-[state=checked]:bg-[#4361ee] data-[state=checked]:border-[#4361ee]" />
                <Label htmlFor="cta" className="text-sm font-medium text-gray-700">Call to Action</Label>
              </div>
            </div>

            {/* Divider */}
            <div className="mb-6 h-px bg-gray-100" />

            {/* Call to Action Text */}
            <div className="mb-6">
              <Label htmlFor="cta-text" className="mb-2 block text-sm font-semibold text-gray-900">
                Call to action text<span className="text-red-500">*</span>
              </Label>
              <Input
                id="cta-text"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                className="h-11 rounded-lg border-gray-200 bg-white"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3">
              <Button variant="outline" className="h-10 rounded-lg px-8 text-sm">Cancel</Button>
              <Button className="h-10 rounded-lg bg-[#4361ee] px-8 text-sm hover:bg-[#3a56d4]">Download</Button>
            </div>
          </div>

          {/* Right: Badge Preview */}
          <div className="w-[320px] shrink-0">
            {/* URL with upload */}
            <div className="mb-4 flex items-center gap-2">
              <div className="flex flex-1 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
                <span className="flex-1 text-sm text-gray-700">avtive.co/syedmesumraza</span>
              </div>
              <button className="flex size-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50">
                <Upload className="size-4" />
              </button>
            </div>

            {/* Preview Card */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              {badgeType === "name-tag" && (
                <div className="p-5">
                  {/* Photo + QR side by side */}
                  <div className="flex items-center justify-center gap-5 mb-4">
                    {fields.profilePhoto && (
                      <PersonPhoto className="size-24 rounded-full" />
                    )}
                    {(fields.qrCode || fields.qrCodeLogo) && (
                      <div className="relative flex size-28 items-center justify-center rounded-xl bg-white border border-gray-100 shadow-sm">
                        <QrCode className="size-20 text-gray-800" />
                        {fields.qrCodeLogo && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="size-9 rounded-full bg-white p-1 shadow-sm">
                              <img src="/avtive.png" alt="Avtive" className="size-full object-contain" />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="text-center space-y-1">
                    {fields.name && <h3 className="text-lg font-bold text-gray-900">Syed Mesum Raza</h3>}
                    {(fields.jobTitle || fields.company) && (
                      <p className="text-sm text-gray-600">
                        {fields.jobTitle && "Creative Director "}
                        {fields.jobTitle && fields.company && " "}
                        {fields.company && <span className="text-[#4361ee]">Avtive</span>}
                      </p>
                    )}
                  </div>

                  {/* Contact */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="size-3.5 text-gray-400 shrink-0" />
                      <span className="text-xs">syedmesum@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="size-3.5 text-gray-400 shrink-0" />
                      <span className="text-xs">+380 93 781 8425</span>
                    </div>
                  </div>

                  {/* Location */}
                  {fields.location && (
                    <p className="mt-2 text-[10px] text-gray-400">Islamabad, Pakistan</p>
                  )}

                  {/* Social + CTA row */}
                  <div className="mt-3 flex items-center justify-between">
                    {fields.socialMedia && (
                      <div className="flex gap-1.5">
                        <div className="size-5 rounded bg-[#1877F2] flex items-center justify-center">
                          <svg className="size-3" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </div>
                        <div className="size-5 rounded bg-[#1DA1F2] flex items-center justify-center">
                          <svg className="size-3" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </div>
                        <div className="size-5 rounded bg-[#0A66C2] flex items-center justify-center">
                          <svg className="size-3" viewBox="0 0 24 24" fill="white"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                        </div>
                      </div>
                    )}
                    {fields.callToAction && ctaText && (
                      <span className="text-[10px] font-medium text-gray-500">{ctaText}</span>
                    )}
                  </div>
                </div>
              )}

              {badgeType === "square" && (
                <div className="p-5">
                  {/* Top: Photo + QR closer together */}
                  <div className="flex items-center justify-center gap-3 mb-3">
                    {fields.profilePhoto && (
                      <PersonPhoto className="size-16 rounded-full" />
                    )}
                    {(fields.qrCode || fields.qrCodeLogo) && (
                      <div className="relative flex size-20 items-center justify-center rounded-lg bg-white border border-gray-100 shadow-sm">
                        <QrCode className="size-14 text-gray-800" />
                        {fields.qrCodeLogo && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="size-7 rounded-full bg-white p-0.5 shadow-sm">
                              <img src="/avtive.png" alt="Avtive" className="size-full object-contain" />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Compact info */}
                  <div className="text-center space-y-0.5">
                    {fields.name && <h3 className="text-sm font-bold text-gray-900">Syed Mesum Raza</h3>}
                    {(fields.jobTitle || fields.company) && (
                      <p className="text-xs text-gray-600">
                        {fields.jobTitle && "Creative Director"}
                        {fields.jobTitle && fields.company && " · "}
                        {fields.company && <span className="text-[#4361ee]">Avtive</span>}
                      </p>
                    )}
                  </div>

                  {/* Compact contact */}
                  <div className="mt-3 space-y-1.5">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="size-3 text-gray-400 shrink-0" />
                      <span className="text-[11px]">syedmesum@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="size-3 text-gray-400 shrink-0" />
                      <span className="text-[11px]">+380 93 781 8425</span>
                    </div>
                  </div>

                  {/* Location */}
                  {fields.location && (
                    <p className="mt-2 text-[10px] text-gray-400">Islamabad, Pakistan</p>
                  )}

                  {/* Social + CTA row */}
                  <div className="mt-3 flex items-center justify-between">
                    {fields.socialMedia && (
                      <div className="flex gap-1.5">
                        <div className="size-5 rounded bg-[#1877F2] flex items-center justify-center">
                          <svg className="size-3" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </div>
                        <div className="size-5 rounded bg-[#1DA1F2] flex items-center justify-center">
                          <svg className="size-3" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </div>
                        <div className="size-5 rounded bg-[#0A66C2] flex items-center justify-center">
                          <svg className="size-3" viewBox="0 0 24 24" fill="white"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                        </div>
                      </div>
                    )}
                    {fields.callToAction && ctaText && (
                      <span className="text-[10px] font-medium text-gray-500">{ctaText}</span>
                    )}
                  </div>
                </div>
              )}

              {badgeType === "badge" && (
                <div className="p-5">
                  {/* Vertical: Photo on top */}
                  <div className="flex flex-col items-center gap-3 mb-4">
                    {fields.profilePhoto && (
                      <PersonPhoto className="size-20 rounded-full" />
                    )}
                    {(fields.qrCode || fields.qrCodeLogo) && (
                      <div className="relative flex size-24 items-center justify-center rounded-xl bg-white border border-gray-100 shadow-sm">
                        <QrCode className="size-16 text-gray-800" />
                        {fields.qrCodeLogo && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="size-8 rounded-full bg-white p-1 shadow-sm">
                              <img src="/avtive.png" alt="Avtive" className="size-full object-contain" />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="text-center space-y-1">
                    {fields.name && <h3 className="text-lg font-bold text-gray-900">Syed Mesum Raza</h3>}
                    {(fields.jobTitle || fields.company) && (
                      <p className="text-sm text-gray-600">
                        {fields.jobTitle && "Creative Director "}
                        {fields.jobTitle && fields.company && " "}
                        {fields.company && <span className="text-[#4361ee]">Avtive</span>}
                      </p>
                    )}
                  </div>

                  {/* Contact */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="size-3.5 text-gray-400 shrink-0" />
                      <span className="text-xs">syedmesum@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="size-3.5 text-gray-400 shrink-0" />
                      <span className="text-xs">+380 93 781 8425</span>
                    </div>
                  </div>

                  {/* Location */}
                  {fields.location && (
                    <p className="mt-2 text-[10px] text-gray-400">Islamabad, Pakistan</p>
                  )}

                  {/* Social + CTA row */}
                  <div className="mt-3 flex items-center justify-between">
                    {fields.socialMedia && (
                      <div className="flex gap-1.5">
                        <div className="size-5 rounded bg-[#1877F2] flex items-center justify-center">
                          <svg className="size-3" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </div>
                        <div className="size-5 rounded bg-[#1DA1F2] flex items-center justify-center">
                          <svg className="size-3" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </div>
                        <div className="size-5 rounded bg-[#0A66C2] flex items-center justify-center">
                          <svg className="size-3" viewBox="0 0 24 24" fill="white"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                        </div>
                      </div>
                    )}
                    {fields.callToAction && ctaText && (
                      <span className="text-[10px] font-medium text-gray-500">{ctaText}</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}