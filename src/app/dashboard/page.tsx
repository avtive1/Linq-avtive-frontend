"use client"

import {
  Search, Bell, Eye, Plus, LayoutDashboard, CreditCard, Clock,
  FolderKanban, Users, Puzzle, Gift, FileText, Settings, HelpCircle,
  CheckCircle2, ChevronDown, ChevronRight, ArrowRight, Pencil, Volume2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { AvtiveLogo, PersonPhoto } from "@/components/avtive"

import SharingIcon from "@/assets/share.svg";
import CardScanner from "@/assets/card.svg";
import SmartNotes from "@/assets/notes.svg";
import Chatbot from "@/assets/chat.svg";
import AutoReminderIcon from "@/assets/noti.svg";
import LinkedAccountsIcon from "@/assets/linked.svg";
const sidebarTools = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
  { icon: CreditCard, label: "My Card", href: "/settings/v-card" },
  { icon: Clock, label: "Time Off", href: "#" },
  { icon: FolderKanban, label: "Projects", href: "#" },
  { icon: Users, label: "Teams", href: "#" },
  { icon: Puzzle, label: "Integrations", href: "#" },
  { icon: Gift, label: "Benefits", href: "#" },
  { icon: FileText, label: "Documents", href: "#" },
]

const meetings = [
  { name: "Rameel Malik", time: "8:00 – 8:45 AM (UTC)", platform: "On Google Meet", status: "Confirmed" },
  { name: "Abdul Haseeb", time: "9:00 – 9:45 AM (UTC)", platform: "At EMRCHAINS", status: "Confirmed" },
  { name: "Arthur Taylor", time: "10:00 – 11:00 AM (UTC)", platform: "On LinkedIn", status: "Pending" },
]



const toolItems = [
  { label: "Effortless Sharing", Icon: SharingIcon, bg: "bg-orange-50" },
  { label: "Smart Notes", Icon: SmartNotes, bg: "bg-blue-50" },
  { label: "Card Scanner", Icon: CardScanner, bg: "bg-yellow-50" },
  { label: "Chatbot", Icon: Chatbot, bg: "bg-green-50" },
  { label: "Auto-Reminder", Icon: AutoReminderIcon, bg: "bg-amber-50" },
  { label: "Linked Accounts", Icon: LinkedAccountsIcon, bg: "bg-red-50" },
]

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#F7F8FA]">
      {/* ── Left Sidebar ── */}
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
              <a key={tool.label} href={tool.href} className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${tool.active ? "bg-gray-100 font-medium text-gray-800" : "text-gray-600 hover:bg-gray-50"}`}>
                {tool.active && <div className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[#4361ee]" />}
                <tool.icon className="size-[18px]" />
                {tool.label}
                {tool.active && <ChevronRight className="ml-auto size-3.5 text-gray-500" />}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-1 px-3">
          <a href="/settings" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50"><Settings className="size-[18px]" /> Settings</a>
          <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50"><HelpCircle className="size-[18px]" /> Support</a>
          <div className="mt-3 flex items-center gap-3 rounded-xl bg-gray-50 p-3">
            {/* Sophia avatar */}
            <PersonPhoto className="size-10 rounded-full" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <p className="text-sm font-medium text-gray-800">Sophia Williams</p>
                <CheckCircle2 className="size-3.5 text-blue-500" />
              </div>
              <p className="truncate text-[11px] text-gray-400">sophia@alignui.com</p>
            </div>
            <ChevronRight className="size-3.5 text-gray-400" />
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
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
              <div className="h-1.5 w-28 overflow-hidden rounded-full bg-gray-200"><div className="h-full w-full rounded-full bg-[#4361ee]" /></div>
              <span className="text-xs font-medium text-gray-500">100%</span>
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-green-600"><CheckCircle2 className="size-4" /> Profile Completed</span>
            <div className="mx-2 h-5 w-px bg-gray-200" />
            <button className="text-gray-400 hover:text-gray-600"><Search className="size-5" /></button>
            <button className="text-gray-400 hover:text-gray-600"><Bell className="size-5" /></button>
            <Button variant="outline" className="gap-1.5 rounded-lg text-xs font-medium"><Eye className="size-4" /> Preview</Button>
            <Button className="gap-1.5 rounded-lg bg-[#4361ee] text-xs font-medium text-white hover:bg-[#3a56d4]"><Plus className="size-4" /> New</Button>
          </div>
        </header>

        {/* ── Dashboard Body ── */}
        <div className="flex flex-1 gap-5 p-6">
          {/* Left column: My Cards + V-Card + Tools */}
          <div className="flex flex-1 flex-col gap-5">
            {/* Row 1: My Cards + V-Card */}
            <div className="grid grid-cols-2 gap-5">
              {/* My Cards */}
              <div className="rounded-xl border border-gray-100 bg-white p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="size-4 text-gray-400" />
                    <h3 className="text-sm font-semibold text-gray-800">My Cards</h3>
                  </div>
                  <Button size="sm" className="h-7 rounded-md bg-[#4361ee] px-3 text-[11px] font-medium text-white hover:bg-[#3a56d4]">+ Upgrade</Button>
                </div>
                {/* Active card */}
                <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#4361ee] to-[#7c3aed] p-4">
                  <PersonPhoto className="size-11 shrink-0 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">Syeed Mesum Raza</p>
                    <div className="mt-0.5 flex items-center gap-1.5">
                      <span className="flex size-4 items-center justify-center rounded-full bg-green-400"><CheckCircle2 className="size-3 text-white" /></span>
                      <span className="text-[10px] text-white/80">Active</span>
                    </div>
                  </div>
                  <Volume2 className="size-4 text-white/50" />
                </div>
                {/* Tabs */}
                <div className="mt-3 flex gap-1 rounded-lg bg-gray-100 p-1">
                  {["Daily", "Weekly", "Monthly"].map((tab) => (
                    <button key={tab} className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-colors ${tab === "Weekly" ? "bg-white text-gray-800 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}>{tab}</button>
                  ))}
                </div>
                {/* Connection stat */}
                <div className="mt-4 flex items-center gap-3">
                  <div className="relative flex size-12 items-center justify-center">
                    <svg className="size-12 -rotate-90" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15.5" fill="none" stroke="#E5E7EB" strokeWidth="2.5" /><circle cx="18" cy="18" r="15.5" fill="none" stroke="#4361ee" strokeWidth="2.5" strokeDasharray="97.4" strokeDashoffset="25" strokeLinecap="round" /></svg>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-800">20 <span className="text-xs font-normal text-gray-400">/ week</span></p>
                    <p className="text-[11px] text-gray-500">Connection</p>
                  </div>
                  <ArrowRight className="ml-auto size-5 text-gray-300" />
                </div>
              </div>

              {/* V-Card */}
              <div className="rounded-xl border border-gray-100 bg-white p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-800">V-Card</h3>
                  <a href="#" className="text-xs font-medium text-[#4361ee]">See More &gt;</a>
                </div>
                <div className="flex items-center gap-4">
                  {/* Pink circle avatar */}
                  <PersonPhoto className="size-14 shrink-0 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">Syed Mesum Raza</p>
                    <p className="text-xs text-gray-500">Founder, Avtive</p>
                  </div>
                  <Button variant="outline" className="gap-1.5 rounded-lg border-[#4361ee]/30 bg-[#4361ee]/5 text-xs font-medium text-[#4361ee] hover:bg-[#4361ee]/10">
                    <Pencil className="size-3" /> Edit Your Profile
                  </Button>
                </div>
                {/* Tabs */}
                <div className="mt-4 flex gap-0 rounded-lg border border-gray-100">
                  {["Profile", "Invite", "Share"].map((tab) => (
                    <button key={tab} className={`flex-1 py-2 text-xs font-medium ${tab === "Profile" ? "bg-white text-gray-800 shadow-sm" : "text-gray-400"}`}>{tab}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 2: Tools Grid */}
            <div className="rounded-xl border border-gray-100 bg-white p-5">
              <h3 className="mb-4 text-sm font-semibold text-gray-800">Tools</h3>
              <div className="grid grid-cols-3 gap-4">
                {toolItems.map((tool) => (
                  <div key={tool.label} className="flex items-center gap-3 rounded-xl border border-gray-50 p-3.5 hover:shadow-sm cursor-pointer transition-shadow">
                    <div className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${tool.bg}`}>
                      <tool.Icon />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{tool.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: Connection History */}
          <div className="w-[320px] shrink-0">
            <div className="rounded-xl border border-gray-100 bg-white p-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800">Connection History</h3>
                <a href="#" className="text-xs font-medium text-[#4361ee]">See All</a>
              </div>
              {/* Month */}
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-700">Aug, 2023</span>
                <ChevronDown className="size-3.5 text-gray-400" />
              </div>
              {/* Days */}
              <div className="mb-3 flex gap-1">
                {[
                  { day: "Fri", date: "31" },
                  { day: "Sat", date: "01" },
                  { day: "Sun", date: "02", active: true },
                  { day: "Mon", date: "03" },
                  { day: "Tue", date: "04" },
                ].map((d) => (
                  <div key={d.date} className={`flex flex-1 flex-col items-center rounded-lg py-1.5 ${d.active ? "bg-[#4361ee] text-white" : "text-gray-400 hover:bg-gray-50"}`}>
                    <span className="text-[9px]">{d.day}</span>
                    <span className="text-[11px] font-semibold">{d.date}</span>
                  </div>
                ))}
              </div>
              {/* Tabs */}
              <div className="mb-3 flex gap-4 border-b border-gray-100 pb-2 text-xs">
                <span className="font-semibold text-[#4361ee] border-b-2 border-[#4361ee] pb-1">History</span>
                <span className="text-gray-400 pb-1">Status</span>
                <span className="text-gray-400 pb-1">Follow-up</span>
              </div>
              {/* Meeting cards */}
              <div className="flex flex-col gap-3">
                {meetings.map((m) => (
                  <div key={m.name} className="rounded-lg border border-gray-100 p-3">
                    <p className="text-xs font-semibold text-gray-800">Meeting with {m.name}</p>
                    <p className="mt-0.5 text-[10px] text-gray-400">{m.time}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {/* Overlapping attendee avatars */}
                        <div className="flex -space-x-2">
                          <PersonPhoto className="size-6 rounded-full border-2 border-white" />
                          <PersonPhoto className="size-6 rounded-full border-2 border-white" />
                          <div className="flex size-6 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-[8px] font-semibold text-gray-500">+2</div>
                        </div>
                        <span className="text-[10px] text-gray-500">{m.platform}</span>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${m.status === "Confirmed" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"}`}>
                        {m.status === "Confirmed" ? "✅" : "⏳"} {m.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
