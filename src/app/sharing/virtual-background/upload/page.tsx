"use client"

import { QrCode, Copy, ImageIcon, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ResponsiveAppShell } from "@/components/layout/ResponsiveAppShell"
import { renderSettingsTopTabs } from "@/components/layout/settingsTopTabs"
import { SharingSideMenu } from "@/components/sharing/SharingSideMenu"

const colors = ["#4361ee", "#ef4444", "#ec4899", "#06b6d4", "#10b981", "#6b7280", "#f97316"]

export default function VirtualBackgroundUploadPage() {
  return (
    <ResponsiveAppShell topTabs={renderSettingsTopTabs("sharing")}>
      <div className="grid min-w-0 gap-4 lg:grid-cols-[220px_minmax(0,1fr)_280px] lg:gap-6">
        <div className="min-w-0">
          <SharingSideMenu active="virtual-background" />
        </div>
        <div className="min-w-0">
          <div className="mx-auto w-full max-w-3xl">
            <div className="mb-6">
              <Label className="mb-3 block text-sm font-semibold text-gray-900">Choose color</Label>
              <div className="flex flex-wrap gap-2">
                <button className="size-8 rounded-full border-2 border-gray-300 bg-white hover:border-gray-400"><ImageIcon className="mx-auto size-4 text-gray-600" /></button>
                {colors.map((color) => <button key={color} className="size-8 rounded-full transition-transform hover:scale-110" style={{ backgroundColor: color }} />)}
              </div>
            </div>
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-2"><Checkbox id="condensed" defaultChecked className="data-[state=checked]:bg-[#4361ee]" /><Label htmlFor="condensed" className="text-sm font-medium text-gray-700">Condensed View</Label></div>
              <div className="flex items-center gap-2"><Checkbox id="location2" defaultChecked className="data-[state=checked]:bg-[#4361ee]" /><Label htmlFor="location2" className="text-sm font-medium text-gray-700">Location</Label></div>
            </div>
            <div className="mb-6 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-12 text-center sm:py-16">
              <Upload className="mb-4 size-12 text-gray-400" />
              <p className="mb-1 text-sm font-semibold text-gray-900">Select image to upload</p>
              <p className="mb-4 text-xs text-gray-500">Select or drag a file here</p>
              <Button className="bg-[#4361ee] hover:bg-[#3a56d4]">Upload</Button>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-3">
              <Button variant="outline" className="px-6">Cancel</Button>
              <Button className="bg-[#4361ee] px-6 hover:bg-[#3a56d4]">Download</Button>
            </div>
          </div>
        </div>
        <div className="min-w-0">
          <div className="mx-auto w-full max-w-[280px]">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex min-w-0 items-center gap-2 text-sm text-gray-600"><Copy className="size-4" /><span className="truncate">avtive.co/syedmesumraza</span></div>
              <button className="text-[#4361ee] hover:text-[#3a56d4]"><Copy className="size-4" /></button>
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop" alt="Background" className="h-48 w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 right-4 rounded-xl bg-white p-3 shadow-lg"><QrCode className="size-16 text-black" /></div>
            </div>
            <Button className="mt-4 w-full bg-[#4361ee] hover:bg-[#3a56d4]">Download Background</Button>
          </div>
        </div>
      </div>
    </ResponsiveAppShell>
  )
}
