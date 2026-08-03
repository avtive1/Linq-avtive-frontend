"use client"

import { Mail, Upload, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { PersonPhoto } from "@/components/avtive"
import { ResponsiveAppShell } from "@/components/layout/ResponsiveAppShell"
import { renderSettingsTopTabs } from "@/components/layout/settingsTopTabs"
import { SharingSideMenu } from "@/components/sharing/SharingSideMenu"

export default function EmailSignaturePage() {
  return (
    <ResponsiveAppShell topTabs={renderSettingsTopTabs("sharing")}>
      <div className="grid min-w-0 gap-4 lg:grid-cols-[220px_minmax(0,1fr)_320px] lg:gap-6">
          <div className="min-w-0">
            <SharingSideMenu active="email-signature" />
          </div>

          <div className="min-w-0">
            <div className="mx-auto w-full max-w-2xl">
            {/* Profile Picture Upload */}
            <div className="mb-6">
              <Label className="mb-2 block text-sm font-semibold text-gray-900">Profile Picture</Label>
              <div className="flex items-center gap-4">
                <div className="flex size-20 items-center justify-center rounded-full bg-gray-100">
                  <User className="size-8 text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="mb-2 text-xs text-gray-500">Select file or drag and drop one here</p>
                  <Button variant="outline" className="gap-2">
                    <Upload className="size-4" />
                    Upload
                  </Button>
                </div>
              </div>
            </div>

            {/* Banner Upload */}
            <div className="mb-6">
              <Label className="mb-2 block text-sm font-semibold text-gray-900">Banner</Label>
              <div className="mb-2">
                <p className="text-xs text-gray-500">Select file or drag and drop one here</p>
              </div>
              <Button variant="outline" className="gap-2">
                <Upload className="size-4" />
                Upload
              </Button>
            </div>

            {/* Include a Link */}
            <div className="mb-6">
              <Label htmlFor="link" className="mb-2 block text-sm font-semibold text-gray-900">
                Include a Link<span className="text-red-500">*</span>
              </Label>
              <Input id="link" placeholder="Enter your name" className="h-10" />
            </div>

            {/* Checkboxes Grid */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <Checkbox id="name-sig" defaultChecked className="data-[state=checked]:bg-[#4361ee]" />
                <Label htmlFor="name-sig" className="text-sm font-medium text-gray-700">Name</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="job-sig" defaultChecked className="data-[state=checked]:bg-[#4361ee]" />
                <Label htmlFor="job-sig" className="text-sm font-medium text-gray-700">Job Title</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="company-sig" defaultChecked className="data-[state=checked]:bg-[#4361ee]" />
                <Label htmlFor="company-sig" className="text-sm font-medium text-gray-700">Company</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="phone-sig" defaultChecked className="data-[state=checked]:bg-[#4361ee]" />
                <Label htmlFor="phone-sig" className="text-sm font-medium text-gray-700">Phone Number</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="location-sig" className="data-[state=checked]:bg-[#4361ee]" />
                <Label htmlFor="location-sig" className="text-sm font-medium text-gray-700">Location</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="qr-sig" className="data-[state=checked]:bg-[#4361ee]" />
                <Label htmlFor="qr-sig" className="text-sm font-medium text-gray-700">Include QR Code</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="website-sig" className="data-[state=checked]:bg-[#4361ee]" />
                <Label htmlFor="website-sig" className="text-sm font-medium text-gray-700">Website</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="social-sig" className="data-[state=checked]:bg-[#4361ee]" />
                <Label htmlFor="social-sig" className="text-sm font-medium text-gray-700">Social media</Label>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mb-6">
              <Label htmlFor="disclaimer" className="mb-2 block text-sm font-semibold text-gray-900">
                Disclaimer
              </Label>
              <Textarea
                id="disclaimer"
                placeholder="Disclaimer"
                rows={3}
                className="min-h-[80px]"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-end gap-3">
              <Button variant="outline" className="px-6">Cancel</Button>
              <Button className="bg-[#4361ee] px-6 hover:bg-[#3a56d4]">Update</Button>
            </div>
          </div>
          </div>

          <div className="min-w-0">
            <div className="mx-auto w-full max-w-[320px]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                avtive.co/syedmesumraza
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-start gap-4">
                <div className="relative">
                  <div className="size-20 overflow-hidden rounded-full bg-gradient-to-br from-blue-400 to-purple-600">
                    <PersonPhoto className="size-full" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">Syed Mesum Smith</h3>
                  <p className="text-sm text-gray-600">UX UI Designer</p>
                  <p className="text-sm text-gray-600">Avtive.co</p>
                  <div className="mt-2 flex gap-2">
                    <div className="flex size-5 items-center justify-center rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]">
                      <svg className="size-3" viewBox="0 0 24 24" fill="white">
                        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                      </svg>
                    </div>
                    <div className="flex size-5 items-center justify-center rounded bg-[#0A66C2]">
                      <svg className="size-3" viewBox="0 0 24 24" fill="white">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                      </svg>
                    </div>
                    <div className="flex size-5 items-center justify-center rounded bg-black">
                      <svg className="size-3" viewBox="0 0 24 24" fill="white">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-1 text-xs text-gray-600">
                <p className="flex items-center gap-2">
                  <Mail className="size-3" />
                  smith@gmail.com
                </p>
                <p className="flex items-center gap-2">
                  <span className="size-3">📱</span>
                  +1(415) 000 00 0000
                </p>
                <p className="flex items-center gap-2">
                  <span className="size-3">🌐</span>
                  317 Road, Suite 23, California 02
                </p>
              </div>

              <Button className="mt-4 w-full bg-[#4361ee] hover:bg-[#3a56d4]">
                Download Background
              </Button>
            </div>
          </div>
          </div>
        </div>
    </ResponsiveAppShell>
  )
}
