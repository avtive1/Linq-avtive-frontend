"use client"

import {
  Star, Settings, Crown, Diamond, Download, ArrowLeftRight, Mail, Phone, ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { PersonPhoto } from "@/components/avtive"
import { ResponsiveAppShell } from "@/components/layout/ResponsiveAppShell"
import { renderSettingsTopTabs } from "@/components/layout/settingsTopTabs"

const themes = [
  { icon: Star, label: "Basic", selected: true },
  { icon: Settings, label: "Standard", selected: false },
  { icon: Crown, label: "Premium", selected: false },
  { icon: Diamond, label: "Platinum", selected: false },
]

export default function SettingsPage() {
  return (
    <ResponsiveAppShell topTabs={renderSettingsTopTabs("general")}>
      <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)_340px] lg:gap-7">
        <aside className="min-w-0 lg:pt-1">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Select Menu
            </h3>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3 rounded-lg bg-gray-100 px-3.5 py-2.5 text-sm font-medium text-gray-800">
                Subscription Theme
              </div>
              <a
                href="/settings/v-card"
                className="flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
              >
                V-Card
              </a>
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">Language*</label>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700">
              <span>🇺🇸 English (US)</span>
              <ChevronDown className="size-4 text-gray-400" />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800">Subscription Theme</h3>
            <p className="mb-5 mt-1 text-sm text-gray-500">Pick theme to personalize experience.</p>
            <div className="grid grid-cols-1 gap-3">
              {themes.map((theme) => (
                <div
                  key={theme.label}
                  className={`flex items-center gap-3 rounded-xl border bg-white p-3.5 transition-colors ${
                    theme.selected
                      ? "border-[#4361ee] shadow-[0_0_0_2px_rgba(67,97,238,0.08)]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <theme.icon className={`size-5 ${theme.selected ? "text-[#4361ee]" : "text-gray-400"}`} />
                  <div>
                    <span className="block text-sm font-medium text-gray-800">{theme.label}</span>
                    <span className="text-xs text-gray-500">Select a theme</span>
                  </div>
                  <div
                    className={`ml-auto flex size-4 items-center justify-center rounded-full border-2 ${
                      theme.selected ? "border-[#4361ee]" : "border-gray-300"
                    }`}
                  >
                    {theme.selected ? <div className="size-1.5 rounded-full bg-[#4361ee]" /> : null}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:justify-end">
              <Button variant="outline" className="h-10 rounded-lg px-8 text-sm">
                Discard
              </Button>
              <Button className="h-10 rounded-lg bg-[#4361ee] px-8 text-sm text-white hover:bg-[#3a56d4]">
                Apply Changes
              </Button>
            </div>
          </div>
        </div>

          {/* Right: Card Live Preview */}
          <div className="w-full min-w-0 lg:w-[340px]">
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
    </ResponsiveAppShell>
  )
}
