"use client"

import { Check, X, Download, ArrowLeftRight, Mail, Phone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { BackButton, LanguageSelector, PersonPhoto } from "@/components/avtive"

export default function AddDetailsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F9FAFB]">
      {/* Top bar */}
      <div className="flex w-full items-center justify-between px-8 py-4">
        <BackButton />
        <button className="text-gray-400 hover:text-gray-600">
          <X className="size-5" />
        </button>
      </div>

      {/* Progress Steps */}
      <div className="flex w-full items-center justify-center gap-6 px-8 py-4">
        {[
          { num: 1, label: "Get Started", done: true },
          { num: 2, label: "Pick Your Style", done: true },
          { num: 3, label: "Add Details", done: false, active: true },
          { num: 4, label: "Get Your Digital Card", done: false },
        ].map((step, i) => (
          <div key={step.num} className="flex items-center gap-2">
            {i > 0 && <div className="h-px w-8 bg-gray-200" />}
            <div className="flex items-center gap-2">
              <div
                className={`flex size-8 items-center justify-center rounded-full text-sm font-semibold ${
                  step.done
                    ? "bg-green-500 text-white"
                    : step.active
                    ? "bg-[#4361ee] text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {step.done ? <Check className="size-4" /> : step.num}
              </div>
              <span
                className={`text-sm ${
                  step.active ? "font-semibold text-gray-800" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main content: form + preview */}
      <div className="flex flex-1 items-start justify-center gap-12 px-8 py-6">
        {/* Left - Form */}
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-gray-800">Where do you work?</h2>
            <p className="text-sm text-gray-500">
              Add title and organization to your digital business card.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Enter your title"
                className="h-11 rounded-lg border-gray-200 bg-white text-sm focus:border-[#4361ee] focus:ring-[#4361ee]/20"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="org" className="text-sm font-medium text-gray-700">
                Organization <span className="text-red-500">*</span>
              </Label>
              <Input
                id="org"
                placeholder="Enter organization name"
                className="h-11 rounded-lg border-gray-200 bg-white text-sm focus:border-[#4361ee] focus:ring-[#4361ee]/20"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <a href="/get-started/add-details">
              <Button variant="outline" className="h-11 rounded-lg border-gray-200 px-6 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Cancel
              </Button>
            </a>
            <a href="/get-started/digital-card">
              <Button className="h-11 rounded-lg bg-[#4361ee] px-6 text-sm font-semibold text-white hover:bg-[#3a56d4]">
                Update
              </Button>
            </a>
          </div>
        </div>

        {/* Right - Card Preview (phone mockup) */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-[280px] overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
            {/* Profile section */}
            <div className="relative flex flex-col items-center bg-gradient-to-br from-[#4361ee] to-[#7c3aed] px-6 pb-8 pt-10">
              <PersonPhoto className="mb-3 size-20 rounded-full border-4 border-white/30" />
              <h3 className="text-lg font-bold text-white">Syed Mesum Raza</h3>
              <p className="text-sm text-white/80">Creative Designer at Avtive Private Limited</p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 px-6 pt-6">
              <Button
                variant="outline"
                className="flex-1 gap-1.5 rounded-lg border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50"
              >
                <Download className="size-3.5" />
                Save Contact
              </Button>
              <Button
                variant="outline"
                className="flex-1 gap-1.5 rounded-lg border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50"
              >
                <ArrowLeftRight className="size-3.5" />
                Exchange Contact
              </Button>
            </div>

            {/* About */}
            <div className="px-6 pt-5 pb-3">
              <h4 className="mb-1 text-xs font-semibold text-gray-800">About</h4>
              <p className="text-xs leading-relaxed text-gray-500">
                I am a strategy-based artist with over 10 years of experience, dedicated to creating
                compelling design solutions that help brands stand out in today&apos;s competitive market.
              </p>
            </div>

            {/* Contact Info */}
            <div className="px-6 pb-6">
              <h4 className="mb-2 text-xs font-semibold text-gray-800">Contact Info</h4>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <Mail className="size-3.5 text-gray-400" />
                  <span className="text-xs text-gray-600">mesumraza@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="size-3.5 text-gray-400" />
                  <span className="text-xs text-gray-600">(408) 555-0120</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex w-full items-center justify-end px-8 py-4">
        <LanguageSelector />
      </div>
    </div>
  )
}
