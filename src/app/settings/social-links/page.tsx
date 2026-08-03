"use client"

import {
  CreditCard, Plus,
  Download, ArrowLeftRight, Mail, Phone, MapPin, User, Share2, Award
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ResponsiveAppShell } from "@/components/layout/ResponsiveAppShell"
import { renderSettingsTopTabs } from "@/components/layout/settingsTopTabs"

const menuItems = [
  { icon: User, label: "User Info" },
  { icon: MapPin, label: "Contact Information" },
  { icon: Share2, label: "Social Links", active: true },
  { icon: Award, label: "Expertise & Skills" },
]

export default function SocialLinksPage() {
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
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Social Links</h2>
              <p className="text-sm text-gray-500">Manage your social media connections.</p>
            </div>

            {/* Facebook */}
            <div className="mb-5">
              <Label htmlFor="facebook" className="mb-2 block text-sm font-semibold text-gray-900">
                Facebook
              </Label>
              <div className="flex gap-2">
                <Input
                  value="facebook.com/"
                  readOnly
                  className="h-10 w-36 bg-gray-50"
                />
                <Input
                  id="facebook"
                  placeholder="username"
                  className="h-10 flex-1"
                />
              </div>
            </div>

            {/* Instagram */}
            <div className="mb-5">
              <Label htmlFor="instagram" className="mb-2 block text-sm font-semibold text-gray-900">
                Instagram
              </Label>
              <div className="flex gap-2">
                <Input
                  value="instagram.com/"
                  readOnly
                  className="h-10 w-36 bg-gray-50"
                />
                <Input
                  id="instagram"
                  placeholder="username"
                  className="h-10 flex-1"
                />
              </div>
            </div>

            {/* Behance */}
            <div className="mb-6">
              <Label htmlFor="behance" className="mb-2 block text-sm font-semibold text-gray-900">
                Behance
              </Label>
              <div className="flex gap-2">
                <Input
                  value="linkedin.com"
                  readOnly
                  className="h-10 w-36 bg-gray-50"
                />
                <Input
                  id="behance"
                  placeholder="username"
                  className="h-10 flex-1"
                />
              </div>
            </div>

            {/* Add Social Link Button */}
            <button className="mb-6 flex items-center gap-2 text-sm font-medium text-[#4361ee] hover:text-[#3a56d4]">
              <Plus className="size-4" />
              Add Social Link
            </button>

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
                <div className="border-b border-gray-100 bg-white px-5 py-4">
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

                {/* Social Section */}
                <div className="bg-white px-5 py-4">
                  <h5 className="mb-3 text-xs font-semibold text-gray-900">Social</h5>
                  <div className="flex items-center gap-3">
                    {/* Instagram */}
                    <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]">
                      <svg className="size-5" viewBox="0 0 24 24" fill="white">
                        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                      </svg>
                    </div>
                    {/* LinkedIn */}
                    <div className="flex size-9 items-center justify-center rounded bg-[#0A66C2]">
                      <svg className="size-5" viewBox="0 0 24 24" fill="white">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                      </svg>
                    </div>
                    {/* X/Twitter */}
                    <div className="flex size-9 items-center justify-center rounded bg-black">
                      <svg className="size-4" viewBox="0 0 24 24" fill="white">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </div>
                    {/* Pinterest */}
                    <div className="flex size-9 items-center justify-center rounded-full bg-[#E60023]">
                      <svg className="size-5" viewBox="0 0 24 24" fill="white">
                        <path d="M9.04 21.54c.96.29 1.93.46 2.96.46a10 10 0 0 0 10-10A10 10 0 0 0 12 2 10 10 0 0 0 2 12c0 4.25 2.67 7.9 6.44 9.34c-.09-.78-.18-2.07 0-2.96l1.15-4.94s-.29-.58-.29-1.5c0-1.38.86-2.41 1.84-2.41c.86 0 1.26.63 1.26 1.44c0 .86-.57 2.09-.86 3.27c-.17.98.52 1.84 1.52 1.84c1.78 0 3.16-1.9 3.16-4.58c0-2.4-1.72-4.04-4.19-4.04c-2.82 0-4.48 2.1-4.48 4.31c0 .86.28 1.73.74 2.3c.09.06.09.14.06.29l-.29 1.09c0 .17-.11.23-.28.11c-1.28-.56-2.02-2.38-2.02-3.85c0-3.16 2.24-6.03 6.56-6.03c3.44 0 6.12 2.47 6.12 5.75c0 3.44-2.13 6.2-5.18 6.2c-.97 0-1.92-.52-2.26-1.13l-.67 2.37c-.23.86-.86 2.01-1.29 2.7v-.03z"/>
                      </svg>
                    </div>
                    {/* Facebook */}
                    <div className="flex size-9 items-center justify-center rounded-full bg-[#1877F2]">
                      <svg className="size-5" viewBox="0 0 24 24" fill="white">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    {/* Snapchat */}
                    <div className="flex size-9 items-center justify-center rounded-full bg-[#FFFC00]">
                      <svg className="size-5" viewBox="0 0 24 24" fill="black">
                        <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.12-.055-.18-.015-.226.156-.451.416-.495 3.236-.556 4.716-3.909 4.776-4.043l.017-.029c.164-.345.193-.645.104-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z"/>
                      </svg>
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
