"use client"

import { useState } from "react"
import {
  LayoutDashboard, CreditCard, Clock, FolderKanban, Users, Puzzle, Gift,
  FileText, Settings, HelpCircle, CheckCircle2, ChevronDown, Search, Bell, Eye, Plus,
  QrCode, BadgeCheck, ImageIcon, Mail, Copy, Upload
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
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
  { icon: ImageIcon, label: "Virtual Background", active: true },
  { icon: Mail, label: "Email Signature" },
]

const colors = ["#4361ee", "#ef4444", "#ec4899", "#06b6d4", "#10b981", "#6b7280", "#f97316", "#8b5cf6", "#14b8a6"]

export default function VirtualBackgroundPage() {
  const [qrDialogOpen, setQrDialogOpen] = useState(false)

  return (
    <div className="flex min-h-screen w-full bg-[#F9FAFB]">
      <QRCodeDialog open={qrDialogOpen} onOpenChange={setQrDialogOpen} />
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

        <div className="flex gap-6 border-b border-gray-100 bg-white px-8 py-3 text-sm">
          <a href="/settings" className="text-gray-400 pb-2">General Settings</a>
          <a href="/settings/profile" className="text-gray-400 pb-2">Profile Settings</a>
          <a href="/settings/company" className="text-gray-400 pb-2">Company Settings</a>
          <span className="font-medium text-[#4361ee] border-b-2 border-[#4361ee] pb-2">Sharing</span>
          <a href="/leads-follow-up" className="text-gray-400 pb-2">Leads Follow up</a>
        </div>

        <div className="flex flex-1 gap-6 p-8">
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

          <div className="flex-1 max-w-3xl">
            <div className="mb-6">
              <Label className="mb-3 block text-sm font-semibold text-gray-900">Choose color</Label>
              <div className="flex gap-2">
                <button className="size-8 rounded-full border-2 border-gray-300 bg-white hover:border-gray-400">
                  <ImageIcon className="size-4 mx-auto text-gray-600" />
                </button>
                {colors.map((color) => (
                  <button key={color} className="size-8 rounded-full hover:scale-110 transition-transform" style={{ backgroundColor: color }} />
                ))}
              </div>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Checkbox id="condensed" defaultChecked className="data-[state=checked]:bg-[#4361ee]" />
                <Label htmlFor="condensed" className="text-sm font-medium text-gray-700">Condensed View</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="location2" defaultChecked className="data-[state=checked]:bg-[#4361ee]" />
                <Label htmlFor="location2" className="text-sm font-medium text-gray-700">Location</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="qr2" defaultChecked className="data-[state=checked]:bg-[#4361ee]" />
                <Label htmlFor="qr2" className="text-sm font-medium text-gray-700">QR Code</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="company2" defaultChecked className="data-[state=checked]:bg-[#4361ee]" />
                <Label htmlFor="company2" className="text-sm font-medium text-gray-700">Company</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="name2" className="data-[state=checked]:bg-[#4361ee]" />
                <Label htmlFor="name2" className="text-sm font-medium text-gray-700">Name</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="qr-logo2" className="data-[state=checked]:bg-[#4361ee]" />
                <Label htmlFor="qr-logo2" className="text-sm font-medium text-gray-700">QR Code Logo</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="job2" className="data-[state=checked]:bg-[#4361ee]" />
                <Label htmlFor="job2" className="text-sm font-medium text-gray-700">Job Title</Label>
              </div>
            </div>

            <div className="mb-6 flex gap-3">
              <Button variant="outline" className="flex-1">Browse Library</Button>
              <Button variant="outline" className="flex-1">Upload Image</Button>
            </div>

            <div className="mb-6">
              <p className="mb-3 text-sm font-semibold text-gray-900">Browse Library</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop" alt="Office" className="h-full w-full object-cover" />
                </div>
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop" alt="Plants" className="h-full w-full object-cover" />
                </div>
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop" alt="Meeting" className="h-full w-full object-cover" />
                </div>
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop" alt="Workspace" className="h-full w-full object-cover" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button variant="outline" className="px-6">Cancel</Button>
              <Button className="bg-[#4361ee] px-6 hover:bg-[#3a56d4]">Update</Button>
            </div>
          </div>

          <div className="w-[280px] shrink-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Copy className="size-4" />
                avtive.co/syedmesumraza
              </div>
              <button className="text-[#4361ee] hover:text-[#3a56d4]">
                <Copy className="size-4" />
              </button>
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop" alt="Background" className="h-48 w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 right-4 rounded-xl bg-white p-3 shadow-lg">
                <QrCode className="size-16 text-black" />
              </div>
            </div>
            <Button className="mt-4 w-full bg-[#4361ee] hover:bg-[#3a56d4]">Download Background</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
