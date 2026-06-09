"use client"

import { ArrowUpFromLine, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BackButton, LanguageSelector } from "@/components/avtive"

export default function GetStartedPage() {
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
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-[#4361ee] text-sm font-semibold text-white">
            1
          </div>
          <span className="text-sm font-semibold text-gray-800">Get Started</span>
        </div>
        <div className="h-px w-8 bg-gray-200" />
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-400">
            2
          </div>
          <span className="text-sm text-gray-400">Pick Your Style</span>
        </div>
        <div className="h-px w-8 bg-gray-200" />
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-400">
            3
          </div>
          <span className="text-sm text-gray-400">Add Details</span>
        </div>
        <div className="h-px w-8 bg-gray-200" />
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-400">
            4
          </div>
          <span className="text-sm text-gray-400">Get Your Digital Card</span>
        </div>
      </div>

      {/* Center content */}
      <div className="flex flex-1 items-center justify-center px-8">
        <div className="flex w-full max-w-lg flex-col items-center gap-8">
          {/* Welcome */}
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome <span className="text-orange-500">Syed!</span>
            </h1>
            <p className="text-sm text-gray-500">
              Import your details for a quick overview, edit anytime before publishing.
            </p>
          </div>

          {/* Import options - two cards side by side */}
          <div className="flex w-full gap-4">
            {/* Upload Resume Card */}
            <div className="flex flex-1 flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-6">
              <div className="flex size-12 items-center justify-center rounded-full bg-gray-100">
                <ArrowUpFromLine className="size-5 text-gray-500" />
              </div>
              <span className="text-xs font-semibold tracking-wider text-gray-400">RESUME</span>
              <p className="text-sm font-semibold text-gray-800">Upload your Resume</p>
              <a
                href="/get-started/upload-resume"
                className="inline-flex h-9 items-center rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Upload
              </a>
            </div>

            <Separator orientation="vertical" className="h-auto" />

            {/* LinkedIn Card */}
            <div className="flex flex-1 flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-6">
              <div className="flex size-12 items-center justify-center rounded-full bg-[#0A66C2]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <span className="text-xs font-semibold tracking-wider text-gray-400">LINKEDIN</span>
              <p className="text-sm font-semibold text-gray-800">Import from Linkedin</p>
              <a
                href="/get-started/link-linkedin"
                className="inline-flex h-9 items-center rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Link
              </a>
            </div>
          </div>

          {/* Enter Manually Button */}
          <a href="/get-started/add-details">
            <Button className="h-12 w-full max-w-xs rounded-lg bg-[#4361ee] text-base font-semibold text-white hover:bg-[#3a56d4]">
              Enter Manually
            </Button>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex w-full items-center justify-end px-8 py-4">
        <LanguageSelector />
      </div>
    </div>
  )
}
