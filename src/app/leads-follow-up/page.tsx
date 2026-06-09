"use client"

import { useState } from "react"
import {
  LayoutDashboard, CreditCard, Clock, FolderKanban, Users, Puzzle, Gift,
  FileText, Settings, HelpCircle, CheckCircle2, ChevronDown, Search, Bell, Eye, Plus,
  Mail, MessageSquare, UserPlus, ChevronUp, Clock3, Paperclip
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  { icon: MessageSquare, label: "Follow Up Message", active: true },
  { icon: UserPlus, label: "Lead Capture" },
  { icon: Mail, label: "Follow Up Email" },
]

export default function LeadsFollowUpPage() {
  const [enabled, setEnabled] = useState(true)
  const [platform, setPlatform] = useState("WhatsApp")
  const [header, setHeader] = useState("")
  const [message, setMessage] = useState("")
  const [cta, setCta] = useState("WhatsApp/Call")
  const [scheduleOpen, setScheduleOpen] = useState(false)
  const [contactTone, setContactTone] = useState("Casual - Medium")
  const [contactStyle, setContactStyle] = useState("Personal")

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
          <a href="/sharing/create-badge" className="text-gray-400 pb-2">Sharing</a>
          <span className="font-medium text-[#4361ee] border-b-2 border-[#4361ee] pb-2">Leads Follow up</span>
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

          {/* Center: Form */}
          <div className="flex-1 max-w-xl">
            {/* Toggle */}
            <div className="mb-6 flex items-start gap-3">
              <button
                onClick={() => setEnabled(!enabled)}
                className={`relative mt-0.5 flex h-6 w-11 items-center rounded-full transition-colors ${
                  enabled ? "bg-[#4361ee]" : "bg-gray-300"
                }`}
              >
                <div className={`size-5 rounded-full bg-white shadow-md transition-transform ${
                  enabled ? "translate-x-5.5" : "translate-x-0.5"
                }`} />
              </button>
              <div>
                <p className="text-sm font-semibold text-gray-900">Follow Up Social Media</p>
                <p className="text-xs text-gray-500 mt-0.5">When enabled, a follow-up email is sent automatically after a new lead connects. Edit the message and timing below.</p>
              </div>
            </div>

            <div className="mb-6 h-px bg-gray-100" />

            {/* Platform */}
            <div className="mb-5">
              <Label className="mb-2 block text-sm font-semibold text-gray-900">Platform<span className="text-red-500">*</span></Label>
              <div className="relative">
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 pr-10 text-sm text-gray-700 focus:border-[#4361ee] focus:outline-none focus:ring-1 focus:ring-[#4361ee]/20"
                >
                  <option>WhatsApp</option>
                  <option>Email</option>
                  <option>SMS</option>
                  <option>LinkedIn</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* From Header */}
            <div className="mb-5">
              <Label className="mb-2 block text-sm font-semibold text-gray-900">From Header<span className="text-red-500">*</span></Label>
              <Input placeholder="Header" value={header} onChange={(e) => setHeader(e.target.value)} className="h-11 rounded-lg border-gray-200 bg-white" />
            </div>

            {/* Message */}
            <div className="mb-5">
              <Label className="mb-2 block text-sm font-semibold text-gray-900">Message</Label>
              <div className="relative">
                <textarea
                  placeholder="Write your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={200}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 focus:border-[#4361ee] focus:outline-none focus:ring-1 focus:ring-[#4361ee]/20 min-h-[100px] resize-none"
                />
                <span className="absolute bottom-2 right-3 text-[10px] text-gray-400">{message.length}/200</span>
              </div>
            </div>

            {/* Call to action */}
            <div className="mb-5">
              <Label className="mb-2 block text-sm font-semibold text-gray-900">Call to action<span className="text-red-500">*</span></Label>
              <div className="relative">
                <select
                  value={cta}
                  onChange={(e) => setCta(e.target.value)}
                  className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 pr-10 text-sm text-gray-700 focus:border-[#4361ee] focus:outline-none focus:ring-1 focus:ring-[#4361ee]/20"
                >
                  <option>WhatsApp/Call</option>
                  <option>Book a Meeting</option>
                  <option>Visit Website</option>
                  <option>Reply to Email</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Schedule Follow Up Delay */}
            <div className="mb-5 rounded-xl border border-gray-200 bg-white overflow-hidden">
              <button
                onClick={() => setScheduleOpen(!scheduleOpen)}
                className="flex w-full items-center justify-between px-4 py-3 text-left"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900">Schedule Follow Up Delay</p>
                  <p className="text-xs text-gray-500">Insert time or description here</p>
                </div>
                <ChevronDown className={`size-4 text-gray-400 transition-transform ${scheduleOpen ? "rotate-180" : ""}`} />
              </button>
              {scheduleOpen && (
                <div className="border-t border-gray-100 px-4 py-3">
                  <div className="flex items-center gap-3 rounded-lg bg-gray-50 px-3 py-2">
                    <Clock3 className="size-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Hours : Minutes</span>
                    <span className="ml-auto text-sm text-gray-800 font-medium">00:00</span>
                  </div>
                </div>
              )}
            </div>

            {/* Add Field */}
            <button className="mb-5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-50 py-2.5 text-sm font-medium text-[#4361ee] hover:bg-blue-100">
              <Plus className="size-4" /> Add Field
            </button>

            {/* Contact Button Text */}
            <div className="mb-5">
              <Label className="mb-2 block text-sm font-semibold text-gray-900">Contact Button Text<span className="text-red-500">*</span></Label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <select
                    value={contactTone}
                    onChange={(e) => setContactTone(e.target.value)}
                    className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 pr-10 text-sm text-gray-700 focus:border-[#4361ee] focus:outline-none focus:ring-1 focus:ring-[#4361ee]/20"
                  >
                    <option>Casual - Medium</option>
                    <option>Formal</option>
                    <option>Friendly</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative flex-1">
                  <select
                    value={contactStyle}
                    onChange={(e) => setContactStyle(e.target.value)}
                    className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 pr-10 text-sm text-gray-700 focus:border-[#4361ee] focus:outline-none focus:ring-1 focus:ring-[#4361ee]/20"
                  >
                    <option>Personal</option>
                    <option>Professional</option>
                    <option>Sales</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Add Attachment */}
            <div className="mb-6 rounded-xl border border-dashed border-gray-300 bg-gray-50/50 p-6 text-center">
              <Paperclip className="mx-auto mb-2 size-5 text-gray-400" />
              <p className="text-sm font-medium text-gray-700">Add Attachment</p>
              <p className="text-xs text-gray-500 mb-3">Click Or Drop Files Here</p>
              <Button variant="outline" className="h-9 rounded-lg text-xs">Upload</Button>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-3">
              <Button variant="outline" className="h-10 rounded-lg px-8 text-sm">Cancel</Button>
              <Button className="h-10 rounded-lg bg-[#4361ee] px-8 text-sm hover:bg-[#3a56d4]">Update</Button>
            </div>
          </div>

          {/* Right: Preview */}
          <div className="w-[280px] shrink-0 space-y-4">
            {/* From Preview */}
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="mb-3 text-xs font-medium text-gray-400 uppercase tracking-wider">From</p>
              <p className="text-sm font-bold text-gray-900 mb-4">SYED MESUM RAZA</p>
              <div className="h-px bg-gray-100 mb-4" />
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Message</p>
              <div className="space-y-3 text-sm text-gray-700">
                <p>Hi SYED MESUM RAZA and MUZNA,</p>
                <p>You both connected via Avtive and this is an automatic whatsapp intro.</p>
                <p>Reply to this message to continue the conversation.</p>
              </div>
              <Button className="mt-4 h-9 rounded-lg bg-[#4361ee] px-5 text-xs hover:bg-[#3a56d4]">Send Message</Button>
            </div>

            {/* Scheduled Follow Up */}
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Scheduled Follow Up Message</p>
                <ChevronDown className="size-4 text-gray-400" />
              </div>
              <div className="flex items-center justify-between rounded-lg bg-green-50 px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-green-500" />
                  <span className="text-sm font-medium text-gray-700">Today</span>
                </div>
                <span className="text-sm font-medium text-green-600">3:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}