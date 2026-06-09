"use client"

import {
  Star, Settings, Crown, Diamond, Download, ArrowLeftRight, Mail, Phone,
  LayoutDashboard, CreditCard, Clock, FolderKanban, Users, Puzzle, Gift,
  FileText, HelpCircle, CheckCircle2, ChevronDown, Search, Bell, Eye, Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
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

const themes = [
  { icon: Star, label: "Basic", selected: true },
  { icon: Settings, label: "Standard", selected: false },
  { icon: Crown, label: "Premium", selected: false },
  { icon: Diamond, label: "Platinum", selected: false },
]

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#F9FAFB]">
      {/* Left Sidebar */}
      <aside className="flex w-[250px] flex-col justify-between border-r border-gray-100 bg-white py-5">
        <div>
          <div className="mb-6 flex items-center gap-2 px-5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#4361ee] text-xs font-bold text-white">S</div>
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
          <a href="/settings" className="flex items-center gap-3 rounded-lg bg-blue-50 px-3 py-2.5 text-sm font-medium text-[#4361ee]">
            <Settings className="size-[18px]" /> Settings
          </a>
          <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50">
            <HelpCircle className="size-[18px]" /> Support
          </a>
          <div className="mt-3 flex items-center gap-3 rounded-lg bg-gray-50 p-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-purple-500 text-xs font-bold text-white">SW</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800">Sophia Williams</p>
              <p className="truncate text-xs text-gray-400">sophia@avtive.com</p>
            </div>
            <CheckCircle2 className="size-4 text-blue-500" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
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
            <Button variant="outline" className="gap-1.5 rounded-lg text-xs font-medium"><Eye className="size-4" /> Preview</Button>
            <Button className="gap-1.5 rounded-lg bg-[#4361ee] text-xs font-medium text-white hover:bg-[#3a56d4]"><Plus className="size-4" /> New</Button>
          </div>
        </header>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-100 bg-white px-8 py-3 text-sm">
          <a href="/settings" className="font-medium text-[#4361ee] border-b-2 border-[#4361ee] pb-2">
            General Settings
          </a>
          <a href="/settings/profile" className="text-gray-400 pb-2">
            Profile Settings
          </a>
          <a href="/settings/company" className="text-gray-400 pb-2">
            Company Settings
          </a>
          <a href="/sharing/create-badge" className="text-gray-400 pb-2">
            Sharing
          </a>
          <a href="/leads-follow-up" className="text-gray-400 pb-2">
            Leads Follow up
          </a>
        </div>

        <div className="flex flex-1 gap-8 p-8">
          {/* Left: Settings Form */}
          <div className="flex-1">
            {/* Select Menu */}
            <div className="mb-6 rounded-xl border border-gray-100 bg-white p-5">
              <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Select Menu</h3>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 rounded-lg bg-blue-50 px-4 py-3 text-sm font-medium text-[#4361ee]">Subscription Theme</div>
                <a href="/settings/v-card" className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-600 hover:bg-gray-50">V-Card</a>
              </div>
            </div>

            {/* Language */}
            <div className="mb-6 rounded-xl border border-gray-100 bg-white p-5">
              <label className="mb-2 block text-sm font-medium text-gray-700">Language</label>
              <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-700">
                <span>🇺🇸 English (US)</span>
                <ChevronDown className="size-4 text-gray-400" />
              </div>
            </div>

            {/* Subscription Theme */}
            <div className="rounded-xl border border-gray-100 bg-white p-5">
              <h3 className="mb-1 text-sm font-semibold text-gray-800">Pick theme to personalize experience.</h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {themes.map((theme) => (
                  <div
                    key={theme.label}
                    className={`flex items-center gap-3 rounded-lg border p-3.5 cursor-pointer transition-colors ${
                      theme.selected ? "border-[#4361ee] bg-blue-50/50" : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <theme.icon className={`size-5 ${theme.selected ? "text-[#4361ee]" : "text-gray-400"}`} />
                    <span className="text-sm font-medium text-gray-700">{theme.label}</span>
                    <div className={`ml-auto size-4 rounded-full border-2 flex items-center justify-center ${
                      theme.selected ? "border-[#4361ee] bg-[#4361ee]" : "border-gray-300"
                    }`}>
                      {theme.selected && <div className="size-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex gap-3">
                <Button variant="outline" className="rounded-lg px-6 text-sm">Discard</Button>
                <Button className="rounded-lg bg-[#4361ee] px-6 text-sm text-white hover:bg-[#3a56d4]">Apply Changes</Button>
              </div>
            </div>
          </div>

          {/* Right: Card Live Preview */}
          <div className="w-[340px]">
            <div className="rounded-xl border border-gray-100 bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800">Card Live Preview</h3>
                <Button className="rounded-lg bg-[#4361ee] px-4 text-xs font-medium text-white hover:bg-[#3a56d4]">View Card</Button>
              </div>
              {/* Card with dark overlay + photo */}
              <div className="overflow-hidden rounded-2xl shadow-md">
                {/* Dark photo header */}
                <div className="relative flex items-end bg-gradient-to-br from-gray-800 to-gray-900 px-5 pb-5 pt-6">
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-20 bg-[url('/next.svg')] bg-cover" />
                  <div className="relative flex w-full items-end gap-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white">Syed Mesum Raza</h4>
                      <p className="text-xs text-white/70">Creative Designer at Avtive Private Limited</p>
                    </div>
                    <PersonPhoto className="size-16 shrink-0 rounded-xl border-2 border-white/30" />
                  </div>
                </div>
                {/* Action buttons */}
                <div className="flex gap-2 border-b border-gray-100 bg-white px-5 py-3">
                  <Button variant="outline" className="flex-1 gap-1.5 rounded-lg text-xs font-medium">
                    <Download className="size-3.5" /> Save Contact
                  </Button>
                  <Button variant="outline" className="flex-1 gap-1.5 rounded-lg text-xs font-medium">
                    <ArrowLeftRight className="size-3.5" /> Exchange Contact
                  </Button>
                </div>
                {/* About */}
                <div className="bg-white px-5 py-4">
                  <h5 className="mb-1.5 text-xs font-semibold text-gray-800">About</h5>
                  <p className="text-xs leading-relaxed text-gray-500">
                    I am a strategy-based artist with over 10 years of experience, dedicated to creating compelling design solutions that help brands stand out in today&apos;s competitive market. My expertise spans custom brand identities, visual communication design, animation, photography &amp; video productions.
                  </p>
                </div>
                {/* Contact Info */}
                <div className="bg-white px-5 pb-5 pt-1">
                  <h5 className="mb-2 text-xs font-semibold text-gray-800">Contact Info</h5>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Mail className="size-3.5 text-gray-400" />
                      <span className="text-xs text-gray-600">mesumrza@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="size-3.5 text-gray-400" />
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
