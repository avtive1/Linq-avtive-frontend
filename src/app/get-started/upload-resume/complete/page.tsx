"use client"

import { ArrowUpFromLine, X, CheckCircle2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function UploadResumeCompletePage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black/40 p-4">
      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {/* Close button */}
        <button className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
          <X className="size-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-xl font-bold text-gray-800">Upload Resume</h2>
          <p className="text-sm text-gray-500">Upload the file of your choice</p>
        </div>

        {/* Upload area */}
        <div className="mt-6 flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-8">
          <div className="flex size-14 items-center justify-center rounded-full bg-gray-100">
            <ArrowUpFromLine className="size-6 text-gray-400" />
          </div>

          {/* Uploaded file card */}
          <div className="flex w-full items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">
            {/* PDF icon */}
            <div className="flex size-10 items-center justify-center rounded-lg bg-red-50">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="2" width="18" height="20" rx="2" fill="#EF4444" />
                <text x="12" y="15" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">PDF</text>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">my-cv.pdf</p>
              <p className="text-xs text-gray-400">60 KB of 120 KB</p>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-green-500" />
              <span className="text-xs font-medium text-green-600">Completed</span>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <X className="size-4" />
            </button>
          </div>

          {/* Add more button */}
          <Button
            variant="ghost"
            className="gap-1.5 rounded-lg bg-blue-50 text-sm font-medium text-[#4361ee] hover:bg-blue-100"
          >
            <Plus className="size-4" />
            Add
          </Button>
        </div>

        {/* Done button */}
        <a href="/get-started/add-details">
          <Button className="mt-6 h-12 w-full rounded-lg bg-[#4361ee] text-base font-semibold text-white hover:bg-[#3a56d4]">
            Done
          </Button>
        </a>
      </div>
    </div>
  )
}
