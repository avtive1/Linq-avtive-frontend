"use client"

import { useState } from "react"
import { QrCode, Copy, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ResponsiveAppShell } from "@/components/layout/ResponsiveAppShell"
import { renderSettingsTopTabs } from "@/components/layout/settingsTopTabs"
import { SharingSideMenu } from "@/components/sharing/SharingSideMenu"

const colors = ["#4361ee", "#ef4444", "#ec4899", "#06b6d4", "#10b981", "#6b7280", "#f97316", "#8b5cf6", "#14b8a6"]

const libraryImages = [
  "/browselibrary/Rectangle%2025.png",
  "/browselibrary/Rectangle%2026.png",
  "/browselibrary/Rectangle%2027.png",
  "/browselibrary/Rectangle%2028.png",
  "/browselibrary/Rectangle%207151.png",
  "/browselibrary/Rectangle%207152.png",
  "/browselibrary/Rectangle%207153.png",
  "/browselibrary/Rectangle%207154.png",
  "/browselibrary/Rectangle%207155.png",
  "/browselibrary/Rectangle%207156.png"
]

export default function VirtualBackgroundPage() {
  const [selectedImage, setSelectedImage] = useState(libraryImages[0])
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
                <button className="size-8 rounded-full border-2 border-gray-300 bg-white hover:border-gray-400">
                  <ImageIcon className="size-4 mx-auto text-gray-600" />
                </button>
                {colors.map((color) => (
                  <button key={color} className="size-8 rounded-full hover:scale-110 transition-transform" style={{ backgroundColor: color }} />
                ))}
              </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
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

            <div className="mb-6 flex flex-col gap-3 sm:flex-row">
              <Button variant="outline" className="flex-1">Browse Library</Button>
              <Button variant="outline" className="flex-1">Upload Image</Button>
            </div>

            <div className="mb-6">
              <p className="mb-3 text-sm font-semibold text-gray-900">Browse Library</p>
              <div className="max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {libraryImages.map((image, index) => (
                    <button
                      key={image}
                      onClick={() => setSelectedImage(image)}
                      className={`relative aspect-video overflow-hidden rounded-lg transition-all duration-200 cursor-pointer ${
                        selectedImage === image
                          ? "ring-4 ring-[#4361ee] ring-offset-2 scale-[0.98]"
                          : "border border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img src={image} alt={`Library image ${index + 1}`} className="h-full w-full object-cover" />
                      {selectedImage === image && (
                        <div className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-[#4361ee] text-white shadow-md animate-in fade-in zoom-in duration-200">
                          <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar {
                  width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                  background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background-color: #cbd5e1;
                  border-radius: 9999px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                  background-color: #94a3b8;
                }
              `}} />
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3">
              <Button variant="outline" className="px-6">Cancel</Button>
              <Button className="bg-[#4361ee] px-6 hover:bg-[#3a56d4]">Update</Button>
            </div>
          </div>
          </div>

          <div className="min-w-0">
            <div className="mx-auto w-full max-w-[280px]">
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
              <img src={selectedImage} alt="Background" className="h-48 w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 right-4 rounded-xl bg-white p-3 shadow-lg">
                <QrCode className="size-16 text-black" />
              </div>
            </div>
            <Button className="mt-4 w-full bg-[#4361ee] hover:bg-[#3a56d4]">Download Background</Button>
          </div>
          </div>
        </div>
    </ResponsiveAppShell>
  )
}
