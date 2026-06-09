"use client"

import { Check, X } from "lucide-react"
import { BackButton } from "@/components/avtive"

export default function DigitalCardPage() {
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
          { num: 3, label: "Add Details", done: true },
          { num: 4, label: "Get Your Digital Card", done: false, active: true },
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
              <span className={`text-sm ${step.active ? "font-semibold text-gray-800" : "text-gray-400"}`}>
                {step.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Center - Card placeholder */}
      <div className="flex flex-1 items-center justify-center px-8 py-6">
        <div className="h-[500px] w-[700px] rounded-2xl border-2 border-purple-400/50 bg-gradient-to-r from-sky-50 via-white to-amber-50 shadow-sm" />
      </div>
    </div>
  )
}
