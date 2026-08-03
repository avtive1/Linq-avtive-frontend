"use client"

import {
  Download, ArrowLeftRight, Mail, Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { PersonPhoto } from "@/components/avtive"
import { ResponsiveAppShell } from "@/components/layout/ResponsiveAppShell"
import { renderSettingsTopTabs } from "@/components/layout/settingsTopTabs"

function MiniSocial() {
  return (
    <div className="flex items-center gap-1">
      <svg className="size-2.5 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      <svg className="size-2.5 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      <svg className="size-2.5 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      <svg className="size-2.5 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
      <svg className="size-2.5 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
    </div>
  )
}

function SocialRow() {
  return (
    <div className="flex items-center gap-4">
      <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
      <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
    </div>
  )
}



function SkylineBg() {
  return (
    <div className="absolute inset-0">
      <svg className="absolute bottom-0 w-full" viewBox="0 0 400 120" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="40" width="30" height="80" className="text-slate-600/40" /><rect x="55" y="20" width="25" height="100" className="text-slate-500/30" /><rect x="85" y="50" width="20" height="70" className="text-slate-600/40" /><rect x="110" y="10" width="35" height="110" className="text-slate-500/25" /><rect x="150" y="30" width="25" height="90" className="text-slate-600/35" /><rect x="180" y="55" width="20" height="65" className="text-slate-500/30" /><rect x="205" y="15" width="40" height="105" className="text-slate-500/20" /><rect x="250" y="35" width="30" height="85" className="text-slate-600/35" /><rect x="285" y="25" width="20" height="95" className="text-slate-500/30" /><rect x="310" y="45" width="35" height="75" className="text-slate-600/40" /><rect x="350" y="30" width="25" height="90" className="text-slate-500/25" />
      </svg>
    </div>
  )
}

export default function VCardSettingsPage() {
  return (
    <ResponsiveAppShell topTabs={renderSettingsTopTabs("general")}>
      <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)_360px] lg:gap-7">
        {/* Left: Select Menu */}
        <aside className="min-w-0 lg:pt-1">
          <div className="rounded-xl border border-gray-100 bg-white p-5">
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Select Menu
            </h3>
            <div className="flex flex-col gap-1">
              <a
                href="/settings"
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-600 hover:bg-gray-50"
              >
                Subscription Theme
              </a>
              <div className="flex items-center gap-3 rounded-lg bg-blue-50 px-4 py-3 text-sm font-medium text-[#4361ee]">
                V-Card
              </div>
            </div>
          </div>
        </aside>

        {/* Center: V-Card gallery */}
        <div className="min-w-0 rounded-xl border border-gray-100 bg-white p-5">
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-900">Subscription Theme</p>
            <p className="mt-1 text-xs text-gray-500">
              Preview different card layouts and choose the one that fits your style.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Card 1 (Selected): Photo header + portrait */}
            <div className="overflow-hidden rounded-2xl border-2 border-[#4361ee] bg-white shadow-sm cursor-pointer">
              <div className="relative">
                <PersonPhoto className="h-44 w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              </div>
              <div className="px-4 pb-4 pt-3">
                <p className="text-sm font-semibold text-gray-900">Syed Mesum</p>
                <p className="mt-0.5 text-xs text-gray-500">Creative Designer at Avtive</p>
                <div className="mt-3 flex gap-2">
                  <div className="flex-1 rounded-lg border border-gray-200 py-2 text-center text-[11px] font-medium text-gray-700">
                    Save Contact
                  </div>
                  <div className="flex-1 rounded-lg border border-gray-200 py-2 text-center text-[11px] font-medium text-gray-700">
                    Exchange Contact
                  </div>
                </div>
                <div className="mt-3">
                  <MiniSocial />
                </div>
                <p className="mt-3 text-[11px] font-semibold text-gray-400">About</p>
                <p className="mt-2 text-[11px] font-semibold text-gray-400">Social</p>
                <p className="mt-2 text-[11px] font-semibold text-gray-400">Portfolio</p>
              </div>
            </div>

            {/* Card 2: Mint card with centered avatar */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm cursor-pointer hover:border-gray-300 transition-colors">
              <div className="flex flex-col items-center bg-[#7BD0BA] px-4 pb-6 pt-10">
                <PersonPhoto className="mb-3 size-16 rounded-full border-2 border-white/50" />
                <p className="text-sm font-semibold text-white">Syed Mesum Raza</p>
                <p className="mt-0.5 text-xs text-white/80">Creative Designer at Avtive Private Limited</p>
              </div>
              <div className="px-4 pb-4 pt-4">
                <div className="flex gap-2">
                  <div className="flex-1 rounded-lg border border-gray-200 py-2 text-center text-[11px] font-medium text-gray-700">
                    Save Contact
                  </div>
                  <div className="flex-1 rounded-lg border border-gray-200 py-2 text-center text-[11px] font-medium text-gray-700">
                    Exchange Contact
                  </div>
                </div>
                <p className="mt-3 text-[11px] font-semibold text-gray-400">About</p>
                <p className="mt-2 text-[11px] font-semibold text-gray-400">Social</p>
                <div className="mt-2 flex items-center justify-between">
                  <MiniSocial />
                  <div className="size-9 rounded bg-gray-100" />
                </div>
              </div>
            </div>

            {/* Card 3: Light layout with large photo */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm cursor-pointer hover:border-gray-300 transition-colors">
              <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <PersonPhoto className="h-full w-full object-cover" />
              </div>
              <div className="px-4 pb-4 pt-3">
                <p className="text-sm font-semibold text-gray-900">Syed Mesum Raza</p>
                <p className="mt-0.5 text-xs text-gray-500">Creative Designer at Avtive Private Limited</p>
                <div className="mt-3 flex gap-2">
                  <div className="flex-1 rounded-lg border border-gray-200 py-2 text-center text-[11px] font-medium text-gray-700">
                    Save Contact
                  </div>
                  <div className="flex-1 rounded-lg border border-gray-200 py-2 text-center text-[11px] font-medium text-gray-700">
                    Exchange Contact
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-6 text-[11px] text-gray-500">
                  <span>About</span>
                  <span>Social</span>
                </div>
              </div>
            </div>

            {/* Card 4: White card with left photo, social icons, portfolio row */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm cursor-pointer hover:border-gray-300 transition-colors">
              <div className="flex gap-3 px-4 pb-3 pt-4">
                <PersonPhoto className="size-14 shrink-0 rounded-xl" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900">Syed Mesum Raza</p>
                  <p className="truncate text-xs text-gray-500">Creative Designer at Avtive Private Limited</p>
                </div>
              </div>
              <div className="px-4 pb-4">
                <div className="flex gap-2">
                  <div className="flex-1 rounded-lg border border-gray-200 py-2 text-center text-[11px] font-medium text-gray-700">
                    Save Contact
                  </div>
                  <div className="flex-1 rounded-lg border border-gray-200 py-2 text-center text-[11px] font-medium text-gray-700">
                    Exchange Contact
                  </div>
                </div>
                <p className="mt-3 text-[11px] font-semibold text-gray-400">About</p>
                <p className="mt-2 text-[11px] font-semibold text-gray-400">Social</p>
                <div className="mt-2">
                  <SocialRow />
                </div>
                <p className="mt-3 text-[11px] font-semibold text-gray-400">Portfolio</p>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-[4/3] rounded-lg bg-gradient-to-br from-gray-100 to-gray-200" />
                  ))}
                </div>
              </div>
            </div>
          </div>
          </div>

        {/* Right: Card Live Preview */}
        <div className="w-full min-w-0 lg:w-[360px]">
            <div className="rounded-xl border border-gray-100 bg-white p-5">
              <div className="mb-4 flex items-center justify-between"><h3 className="text-sm font-semibold text-gray-800">Card Live Preview</h3><Button className="rounded-lg bg-[#4361ee] px-4 text-xs font-medium text-white hover:bg-[#3a56d4]">View Card</Button></div>
              <div className="overflow-hidden rounded-2xl shadow-md">
                {/* Skyline background header */}
                <div className="relative flex items-end bg-gradient-to-br from-indigo-900 via-slate-800 to-slate-900 px-5 pb-5 pt-8">
                  <SkylineBg />
                  <div className="relative flex w-full items-end gap-4"><div className="flex-1"><h4 className="text-lg font-bold text-white">Syed Mesum Raza</h4><p className="text-xs text-white/70">Creative Designer at Avtive Private Limited</p></div><PersonPhoto className="size-16 shrink-0 rounded-xl border-2 border-white/30" /></div>
                </div>
                <div className="flex gap-2 bg-white px-5 py-3">
                  <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-gray-100 py-2 text-xs font-medium text-gray-700 hover:bg-gray-200"><Download className="size-3.5" /> Save Contact</button>
                  <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-gray-100 py-2 text-xs font-medium text-gray-700 hover:bg-gray-200"><ArrowLeftRight className="size-3.5" /> Exchange Contact</button>
                </div>
                <div className="bg-white px-5 py-3"><h5 className="mb-1.5 text-xs font-semibold text-gray-800">About</h5><p className="text-xs leading-relaxed text-gray-500">I am a strategy-based artist with over 10 years of experience, dedicated to creating compelling design solutions that help brands stand out in today&apos;s competitive market. My expertise spans custom brand identities, visual communication design, animation, photography &amp; video productions.</p></div>
                <div className="bg-white px-5 py-3"><h5 className="mb-2 text-xs font-semibold text-gray-800">Contact Info</h5><div className="flex flex-col gap-2"><div className="flex items-center gap-2"><Mail className="size-3.5 text-gray-400" /><span className="text-xs text-gray-600">mesumraza@gmail.com</span></div><div className="flex items-center gap-2"><Phone className="size-3.5 text-gray-400" /><span className="text-xs text-gray-600">(498) 555-9120</span></div></div></div>
                <div className="border-t border-gray-100 bg-white px-5 py-3"><h5 className="mb-2 text-xs font-semibold text-gray-800">Social</h5><SocialRow /></div>
                <div className="border-t border-gray-100 bg-white px-5 py-3"><h5 className="mb-2 text-xs font-semibold text-gray-800">Portfolio</h5><div className="grid grid-cols-4 gap-2">{[1,2,3,4].map(i=><div key={i} className="aspect-video rounded-lg bg-gradient-to-br from-gray-100 to-gray-200" />)}</div></div>
              </div>
            </div>
          </div>
      </div>
    </ResponsiveAppShell>
  )
}
