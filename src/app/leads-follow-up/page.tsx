"use client"

import { useState } from "react"
import { Mail, MessageSquare, UserPlus, ChevronDown, Clock3, Paperclip, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ResponsiveAppShell } from "@/components/layout/ResponsiveAppShell"
import { renderSettingsTopTabs } from "@/components/layout/settingsTopTabs"

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

  return (
    <ResponsiveAppShell topTabs={renderSettingsTopTabs("leads")}>
      <div className="grid min-w-0 gap-4 lg:grid-cols-[220px_minmax(0,1fr)_280px] lg:gap-6">
        <div className="min-w-0">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">SELECT MENU</p>
            <nav className="flex flex-col gap-1">
              {menuItems.map((item) => (
                <button key={item.label} className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm ${item.active ? "bg-blue-50 font-medium text-[#4361ee]" : "text-gray-600 hover:bg-gray-50"}`}>
                  <item.icon className="size-4" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="min-w-0">
          <div className="mx-auto w-full max-w-xl">
            <div className="mb-6 flex items-start gap-3">
              <button onClick={() => setEnabled(!enabled)} className={`relative mt-0.5 flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${enabled ? "bg-[#4361ee]" : "bg-gray-300"}`}>
                <div className={`size-5 rounded-full bg-white shadow-md transition-transform ${enabled ? "translate-x-5.5" : "translate-x-0.5"}`} />
              </button>
              <div>
                <p className="text-sm font-semibold text-gray-900">Follow Up Social Media</p>
                <p className="mt-0.5 text-xs text-gray-500">When enabled, a follow-up message is sent automatically after a new lead connects.</p>
              </div>
            </div>
            <div className="mb-6 h-px bg-gray-100" />
            <div className="mb-5">
              <Label className="mb-2 block text-sm font-semibold text-gray-900">Platform<span className="text-red-500">*</span></Label>
              <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="h-11 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm text-gray-700 focus:border-[#4361ee] focus:outline-none">
                <option>WhatsApp</option><option>Email</option><option>SMS</option><option>LinkedIn</option>
              </select>
            </div>
            <div className="mb-5">
              <Label className="mb-2 block text-sm font-semibold text-gray-900">From Header<span className="text-red-500">*</span></Label>
              <Input placeholder="Header" value={header} onChange={(e) => setHeader(e.target.value)} className="h-11 rounded-lg border-gray-200 bg-white" />
            </div>
            <div className="mb-5">
              <Label className="mb-2 block text-sm font-semibold text-gray-900">Message</Label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} maxLength={200} className="min-h-[100px] w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 focus:border-[#4361ee] focus:outline-none" />
            </div>
            <div className="mb-5">
              <Label className="mb-2 block text-sm font-semibold text-gray-900">Call to action<span className="text-red-500">*</span></Label>
              <select value={cta} onChange={(e) => setCta(e.target.value)} className="h-11 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm text-gray-700 focus:border-[#4361ee] focus:outline-none">
                <option>WhatsApp/Call</option><option>Book a Meeting</option><option>Visit Website</option>
              </select>
            </div>
            <div className="mb-5 overflow-hidden rounded-xl border border-gray-200 bg-white">
              <button onClick={() => setScheduleOpen(!scheduleOpen)} className="flex w-full items-center justify-between px-4 py-3 text-left">
                <div><p className="text-sm font-semibold text-gray-900">Schedule Follow Up Delay</p><p className="text-xs text-gray-500">Insert time or description here</p></div>
                <ChevronDown className={`size-4 text-gray-400 transition-transform ${scheduleOpen ? "rotate-180" : ""}`} />
              </button>
              {scheduleOpen && <div className="border-t border-gray-100 px-4 py-3"><div className="flex items-center gap-3 rounded-lg bg-gray-50 px-3 py-2"><Clock3 className="size-4 text-gray-500" /><span className="text-sm text-gray-600">Hours : Minutes</span><span className="ml-auto text-sm font-medium text-gray-800">00:00</span></div></div>}
            </div>
            <button className="mb-5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-50 py-2.5 text-sm font-medium text-[#4361ee] hover:bg-blue-100"><Plus className="size-4" /> Add Field</button>
            <div className="mb-6 rounded-xl border border-dashed border-gray-300 bg-gray-50/50 p-6 text-center">
              <Paperclip className="mx-auto mb-2 size-5 text-gray-400" />
              <p className="text-sm font-medium text-gray-700">Add Attachment</p>
              <p className="mb-3 text-xs text-gray-500">Click Or Drop Files Here</p>
              <Button variant="outline" className="h-9 rounded-lg text-xs">Upload</Button>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-3">
              <Button variant="outline" className="h-10 rounded-lg px-8 text-sm">Cancel</Button>
              <Button className="h-10 rounded-lg bg-[#4361ee] px-8 text-sm hover:bg-[#3a56d4]">Update</Button>
            </div>
          </div>
        </div>

        <div className="min-w-0 space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400">From</p>
            <p className="mb-4 text-sm font-bold text-gray-900">SYED MESUM RAZA</p>
            <div className="mb-4 h-px bg-gray-100" />
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-400">Message</p>
            <div className="space-y-3 text-sm text-gray-700">
              <p>Hi SYED MESUM RAZA and MUZNA,</p>
              <p>You both connected via Avtive and this is an automatic whatsapp intro.</p>
            </div>
            <Button className="mt-4 h-9 rounded-lg bg-[#4361ee] px-5 text-xs hover:bg-[#3a56d4]">Send Message</Button>
          </div>
        </div>
      </div>
    </ResponsiveAppShell>
  )
}
