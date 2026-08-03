"use client"

import { X, User, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function LinkLinkedInPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-black/40 p-3 sm:p-4">
      {/* Modal */}
      <div className="relative w-full max-w-md min-w-0 rounded-2xl bg-white p-5 shadow-xl sm:p-8">
        {/* Close button */}
        <button className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
          <X className="size-5" />
        </button>

        {/* LinkedIn icon */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex size-14 items-center justify-center rounded-full bg-[#0A66C2]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </div>

          {/* Title */}
          <div className="flex flex-col items-center gap-1 text-center">
            <h2 className="text-xl font-bold text-gray-800">Link LinkedIn</h2>
            <p className="text-sm text-gray-500">Import from your linkedin account</p>
          </div>
        </div>

        {/* URL Input */}
        <div className="mt-6 flex flex-col gap-1.5">
          <Label htmlFor="linkedinUrl" className="flex items-center gap-1 text-sm font-medium text-gray-700">
            Import from URL Link @
            <Info className="size-3.5 text-gray-400" />
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            <Input
              id="linkedinUrl"
              type="url"
              placeholder="Paste URL"
              className="h-11 rounded-lg border-gray-200 bg-gray-50/50 pl-10 text-sm focus:border-[#4361ee] focus:ring-[#4361ee]/20"
            />
          </div>
        </div>

        {/* Next button */}
        <a href="/get-started/add-details">
          <Button className="mt-6 h-12 w-full rounded-lg bg-[#4361ee] text-base font-semibold text-white hover:bg-[#3a56d4]">
            Next
          </Button>
        </a>
      </div>
    </div>
  )
}
