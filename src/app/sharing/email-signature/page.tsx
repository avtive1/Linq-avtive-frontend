"use client"

import { useState } from "react"
import {
  LayoutDashboard, CreditCard, Clock, FolderKanban, Users, Puzzle, Gift,
  FileText, Settings, HelpCircle, CheckCircle2, ChevronDown, Search, Bell, Eye, Plus,
  QrCode, BadgeCheck, ImageIcon, Mail, Upload, User
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
  { icon: BadgeCheck, label: "Create Event Badge" },
  { icon: ImageIcon, label: "Virtual Background" },
  { icon: Mail, label: "Email Signature", active: true },
]

export default function EmailSignaturePage() {
  const [qrDialogOpen, setQrDialogOpen] = useState(false)

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
          <div className="flex-1 max-w-2xl">
            {/* Profile Picture Upload */}
            <div className="mb-6">
              <Label className="mb-2 block text-sm font-semibold text-gray-900">Profile Picture</Label>
              <div className="flex items-center gap-4">
                <div className="flex size-20 items-center justify-center rounded-full bg-gray-100">
                  <User className="size-8 text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="mb-2 text-xs text-gray-500">Select file or drag and drop one here</p>
                  <Button variant="outline" className="gap-2">
                    <Upload className="size-4" />
                    Upload
                  </Button>
                </div>
              </div>
            </div>

            {/* Banner Upload */}
            <div className="mb-6">
              <Label className="mb-2 block text-sm font-semibold text-gray-900">Banner</Label>
              <div className="mb-2">
                <p className="text-xs text-gray-500">Select file or drag and drop one here</p>
              </div>
              <Button variant="outline" className="gap-2">
                <Upload className="size-4" />
                Upload
              </Button>
            </div>

            {/* Include a Link */}
            <div className="mb-6">
              <Label htmlFor="link" className="mb-2 block text-sm font-semibold text-gray-900">
                Include a Link<span className="text-red-500">*</span>
              </Label>
              <Input id="link" placeholder="Enter your name" className="h-10" />
            </div>

            {/* Checkboxes Grid */}
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Checkbox id="name-sig" defaultChecked className="data-[state=checked]:bg-[#4361ee]" />
                <Label htmlFor="name-sig" className="text-sm font-medium text-gray-700">Name</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="job-sig" defaultChecked className="data-[state=checked]:bg-[#4361ee]" />
                <Label htmlFor="job-sig" className="text-sm font-medium text-gray-700">Job Title</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="company-sig" defaultChecked className="data-[state=checked]:bg-[#4361ee]" />
                <Label htmlFor="company-sig" className="text-sm font-medium text-gray-700">Company</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="phone-sig" defaultChecked className="data-[state=checked]:bg-[#4361ee]" />
                <Label htmlFor="phone-sig" className="text-sm font-medium text-gray-700">Phone Number</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="location-sig" className="data-[state=checked]:bg-[#4361ee]" />
                <Label htmlFor="location-sig" className="text-sm font-medium text-gray-700">Location</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="qr-sig" className="data-[state=checked]:bg-[#4361ee]" />
                <Label htmlFor="qr-sig" className="text-sm font-medium text-gray-700">Include QR Code</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="website-sig" className="data-[state=checked]:bg-[#4361ee]" />
                <Label htmlFor="website-sig" className="text-sm font-medium text-gray-700">Website</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="social-sig" className="data-[state=checked]:bg-[#4361ee]" />
                <Label htmlFor="social-sig" className="text-sm font-medium text-gray-700">Social media</Label>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mb-6">
              <Label htmlFor="disclaimer" className="mb-2 block text-sm font-semibold text-gray-900">
                Disclaimer
              </Label>
              <Textarea
                id="disclaimer"
                placeholder="Disclaimer"
                rows={3}
                className="min-h-[80px]"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3">
              <Button variant="outline" className="px-6">Cancel</Button>
              <Button className="bg-[#4361ee] px-6 hover:bg-[#3a56d4]">Update</Button>
            </div>
          </div>

          {/* Right: Email Signature Preview */}
          <div className="w-[320px] shrink-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                avtive.co/syedmesumraza
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-start gap-4">
                <div className="relative">
                  <div className="size-20 overflow-hidden rounded-full bg-gradient-to-br from-blue-400 to-purple-600">
                    <PersonPhoto className="size-full" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">Syed Mesum Smith</h3>
                  <p className="text-sm text-gray-600">UX UI Designer</p>
                  <p className="text-sm text-gray-600">Avtive.co</p>
                  <div className="mt-2 flex gap-2">
                    <div className="flex size-5 items-center justify-center rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]">
                      <svg className="size-3" viewBox="0 0 24 24" fill="white">
                        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                      </svg>
                    </div>
                    <div className="flex size-5 items-center justify-center rounded bg-[#0A66C2]">
                      <svg className="size-3" viewBox="0 0 24 24" fill="white">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                      </svg>
                    </div>
                    <div className="flex size-5 items-center justify-center rounded bg-black">
                      <svg className="size-3" viewBox="0 0 24 24" fill="white">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-1 text-xs text-gray-600">
                <p className="flex items-center gap-2">
                  <Mail className="size-3" />
                  smith@gmail.com
                </p>
                <p className="flex items-center gap-2">
                  <span className="size-3">📱</span>
                  +1(415) 000 00 0000
                </p>
                <p className="flex items-center gap-2">
                  <span className="size-3">🌐</span>
                  317 Road, Suite 23, California 02
                </p>
              </div>

              <Button className="mt-4 w-full bg-[#4361ee] hover:bg-[#3a56d4]">
                Download Background
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
