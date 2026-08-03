"use client"

import {
  CreditCard, ChevronDown, Download, ArrowLeftRight, Mail, Phone, MapPin, User, Share2, Award
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ResponsiveAppShell } from "@/components/layout/ResponsiveAppShell"
import { renderSettingsTopTabs } from "@/components/layout/settingsTopTabs"

const menuItems = [
  { icon: User, label: "User Info" },
  { icon: MapPin, label: "Contact Information", active: true },
  { icon: Share2, label: "Social Links" },
  { icon: Award, label: "Expertise & Skills" },
]

export default function ContactInformationPage() {
  return (
    <ResponsiveAppShell topTabs={renderSettingsTopTabs("profile")}>
      <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)_360px]">
          {/* Left: Side Menu */}
          <div className="w-full min-w-0 lg:w-[220px]">
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                SELECT MENU
              </p>
              <nav className="flex flex-col gap-1">
                {menuItems.map((item) => {
                  const href = 
                    item.label === "User Info" ? "/settings/profile" :
                    item.label === "Contact Information" ? "/settings/contact-information" :
                    item.label === "Social Links" ? "/settings/social-links" :
                    item.label === "Expertise & Skills" ? "/settings/expertise-skills" :
                    "#";
                  
                  return (
                    <a
                      key={item.label}
                      href={href}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm ${
                        item.active
                          ? "bg-blue-50 font-medium text-[#4361ee]"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <item.icon className="size-4" />
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Center: Main Form */}
          <div className="min-w-0">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Contact Information</h2>
              <p className="text-sm text-gray-500">Enter your contact details for communication.</p>
            </div>

            {/* Email Address */}
            <div className="mb-6">
              <Label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-900">
                Email Address<span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="mesum@avtive.com"
                defaultValue="mesum@avtive.com"
                className="h-10"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-6">
              <Label htmlFor="phone" className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
                Phone Number <span className="text-gray-500 font-normal">(Optional)</span>
                <span className="text-gray-400">ℹ</span>
              </Label>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 rounded-lg border border-input bg-white px-3 py-2 w-24">
                  <span className="text-xl">🇺🇸</span>
                  <span className="text-sm font-medium text-gray-700">+1</span>
                  <ChevronDown className="size-4 text-gray-400" />
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(000) 000-0000"
                  className="h-10 flex-1"
                />
              </div>
            </div>

            {/* Address */}
            <div className="mb-6">
              <Label htmlFor="address" className="mb-2 block text-sm font-semibold text-gray-900">
                Address
              </Label>
              <Textarea
                id="address"
                placeholder="Enter your full address here..."
                rows={4}
                className="min-h-[100px]"
              />
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

          {/* Right: Card Live Preview */}
          <div className="w-full min-w-0 lg:w-[360px]">
            <div className="sticky top-8">
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
                    <div className="flex items-start gap-2">
                      <MapPin className="size-4 text-gray-400 mt-0.5" />
                      <span className="text-xs text-gray-600">321 W. Main St, Suite 5, Pennsylvania 57867</span>
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
