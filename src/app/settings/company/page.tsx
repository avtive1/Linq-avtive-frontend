"use client"

import {
  CreditCard,
  Download, ArrowLeftRight, Mail, Phone, MapPin, User, Share2, Building2, Upload
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ResponsiveAppShell } from "@/components/layout/ResponsiveAppShell"
import { renderSettingsTopTabs } from "@/components/layout/settingsTopTabs"

const menuItems = [
  { icon: User, label: "User Info", active: true },
  { icon: MapPin, label: "Contact Information" },
  { icon: Share2, label: "Social Links" },
]

export default function CompanySettingsPage() {
  return (
    <ResponsiveAppShell topTabs={renderSettingsTopTabs("company")}>
      <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)_360px]">
          {/* Left: Side Menu */}
          <div className="w-full min-w-0 lg:w-[220px]">
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                SELECT MENU
              </p>
              <nav className="flex flex-col gap-1">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={
                      item.label === "User Info"
                        ? "/settings/company"
                        : item.label === "Contact Information"
                          ? "/settings/company/contact"
                          : "/settings/company/social"
                    }
                    className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm ${
                      item.active
                        ? "bg-blue-50 font-medium text-[#4361ee]"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="size-4" />
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Center: Main Form */}
          <div className="min-w-0">
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
          <div className="w-full min-w-0 lg:w-[360px]">
            <div className="lg:sticky lg:top-8 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
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
    </ResponsiveAppShell>
  )
}
