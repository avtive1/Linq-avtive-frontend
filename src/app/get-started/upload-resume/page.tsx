"use client"

import { ArrowUpFromLine, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function UploadResumePage() {
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
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-sm text-gray-600">Choose a file or drag &amp; drop it here.</p>
            <p className="text-xs text-gray-400">.JPEG, .PNG, .PDF, and .MP4 formats, up to 50 MB.</p>
          </div>
          <Button
            variant="outline"
            className="rounded-lg border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Browse File
          </Button>
        </div>

        {/* Upload button */}
        <a href="/get-started/upload-resume/complete">
          <Button className="mt-6 h-12 w-full rounded-lg bg-[#4361ee] text-base font-semibold text-white hover:bg-[#3a56d4]">
            Upload
          </Button>
        </a>
      </div>
    </div>
  )
}
