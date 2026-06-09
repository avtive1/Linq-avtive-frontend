"use client"

import {
  LayoutDashboard, CreditCard, Clock, FolderKanban, Users, Puzzle, Gift,
  FileText, Settings, HelpCircle, CheckCircle2, ChevronDown, Search, Bell, Eye, Plus,
  Download, ArrowLeftRight, Mail, Phone, MapPin, User, Share2, Building2, Upload
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AvtiveLogo, PersonPhoto } from "@/components/avtive"

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
  { icon: User, label: "User Info", active: true },
  { icon: MapPin, label: "Contact Information" },
  { icon: Share2, label: "Social Links" },
]

export default function CompanySettingsPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#F9FAFB]">
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
              <a
                key={tool.label}
                href={tool.href}
                className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                  tool.active
                    ? "bg-blue-50 font-medium text-[#4361ee]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tool.active && (
                  <div className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[#4361ee]" />
                )}
                <tool.icon className="size-[18px]" />
                {tool.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-1 px-3">
          <a
            href="/settings"
            className="flex items-center gap-3 rounded-lg bg-blue-50 px-3 py-2.5 text-sm font-medium text-[#4361ee]"
          >
            <Settings className="size-[18px]" /> Settings
          </a>
          <a
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
          >
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
            <button className="text-gray-400 hover:text-gray-600">
              <Search className="size-5" />
            </button>
            <button className="text-gray-400 hover:text-gray-600">
              <Bell className="size-5" />
            </button>
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
          <a href="/settings" className="text-gray-400 pb-2">
            General Settings
          </a>
          <a href="/settings/profile" className="text-gray-400 pb-2">
            Profile Settings
          </a>
          <span className="font-medium text-[#4361ee] border-b-2 border-[#4361ee] pb-2">
            Company Settings
          </span>
          <span className="text-gray-400 pb-2">Sharing</span>
          <a href="/leads-follow-up" className="text-gray-400 pb-2">Leads Follow up</a>
        </div>

        <div className="flex flex-1 gap-6 p-8">
          {/* Left: Side Menu */}
          <div className="w-[220px] shrink-0">
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                SELECT MENU
              </p>
              <nav className="flex flex-col gap-1">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm ${
                      item.active
                        ? "bg-blue-50 font-medium text-[#4361ee]"
                        : "text-gray-600 hover:bg-gray-50"
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
          <div className="flex-1">
            {/* Upload Image */}
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <div className="flex size-20 items-center justify-center rounded-full bg-gray-100">
                  <Building2 className="size-8 text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="mb-1 text-sm font-semibold text-gray-900">Upload Image</p>
                  <p className="mb-2 text-xs text-gray-500">Min 400x400px, PNG or JPEG</p>
                  <Button variant="outline" className="gap-2">
                    <Upload className="size-4" />
                    Upload
                  </Button>
                </div>
              </div>
            </div>

            {/* Company Name */}
            <div className="mb-6">
              <Label htmlFor="company" className="mb-2 block text-sm font-semibold text-gray-900">
                Company Name<span className="text-red-500">*</span>
              </Label>
              <Input
                id="company"
                placeholder="Avtive"
                defaultValue="Avtive"
                className="h-10"
              />
            </div>

            {/* Website URL */}
            <div className="mb-6">
              <Label htmlFor="website" className="mb-2 block text-sm font-semibold text-gray-900">
                Website URL<span className="text-red-500">*</span>
              </Label>
              <Input
                id="website"
                placeholder="www.avtive.co"
                defaultValue="www.avtive.co"
                className="h-10"
              />
            </div>

            {/* Title */}
            <div className="mb-6">
              <Label htmlFor="title" className="mb-2 block text-sm font-semibold text-gray-900">
                Title
              </Label>
              <Input
                id="title"
                placeholder="e.g. Unlocking Potential, Inspiring Growth."
                className="h-10"
              />
            </div>

            {/* Company Description */}
            <div className="mb-6">
              <Label htmlFor="description" className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">
                  Company Description<span className="text-red-500">*</span> <span className="text-gray-500 font-normal">(Optional)</span>
                </span>
                <span className="text-xs text-gray-400">0/200 ✏️</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Describe your company..."
                rows={4}
                className="min-h-[100px]"
              />
              <p className="mt-2 flex items-start gap-1 text-xs text-gray-500">
                <span className="mt-0.5">💡</span>
                You can describe your company briefly.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3">
              <Button variant="outline" className="px-6">
                Cancel
              </Button>
              <Button className="bg-[#4361ee] px-6 hover:bg-[#3a56d4]">
                Update
              </Button>
            </div>
          </div>

          {/* Right: Card Live Preview - Scrollable */}
          <div className="w-[360px] shrink-0">
            <div className="sticky top-8 max-h-[calc(100vh-6rem)] overflow-y-auto">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <CreditCard className="size-4" />
                  Card Live Preview
                </div>
                <Button className="bg-[#4361ee] text-xs hover:bg-[#3a56d4]">
                  View Card
                </Button>
              </div>

              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
                {/* Card Image Preview */}
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src="/card.png"
                    alt="Digital Card Preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 border-b border-gray-100 bg-white px-5 py-3">
                  <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-gray-50 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-100">
                    <Download className="size-3.5" />
                    Save Contact
                  </button>
                  <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-gray-50 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-100">
                    <ArrowLeftRight className="size-3.5" />
                    Exchange Contact
                  </button>
                </div>

                {/* About Section */}
                <div className="border-b border-gray-100 bg-white px-5 py-4">
                  <h5 className="mb-2 text-xs font-semibold text-gray-900">About</h5>
                  <p className="text-xs leading-relaxed text-gray-600">
                    I am a strategy-based artist with over 10 years of experience, dedicated to
                    creating compelling design solutions that help brands stand out in today&apos;s
                    competitive market. My expertise spans custom brand identities, visual
                    communication design, animation, photography & video productions.
                  </p>
                </div>

                {/* Company Overview Section */}
                <div className="border-b border-gray-100 bg-white px-5 py-4">
                  <h5 className="mb-2 text-xs font-semibold text-gray-900">Company Overview</h5>
                  <p className="text-xs leading-relaxed text-gray-600">
                    Avtive is an AI-powered digital networking platform that makes connecting,
                    sharing, and following up effortless.No apps or scans required.Turn every
                    interaction into a meaningful opportunity with smarter, faster, and more
                    sustainable networking.
                  </p>
                </div>

                {/* Contact Info Section */}
                <div className="bg-white px-5 py-4">
                  <h5 className="mb-3 text-xs font-semibold text-gray-900">Contact Info</h5>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-2">
                      <Mail className="size-4 text-gray-400" />
                      <span className="text-xs text-gray-600">mesumraza@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="size-4 text-gray-400" />
                      <span className="text-xs text-gray-600">(406) 555-0120</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
