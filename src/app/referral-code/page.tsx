"use client"

import { useState } from "react"
import { MailCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BackButton, LeftPanel, LanguageSelector } from "@/components/avtive"

export default function ReferralCodePage() {
  const [code, setCode] = useState(["4", "7", "0", "9"])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    if (value && index < 3) {
      document.getElementById(`ref-code-${index + 1}`)?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`ref-code-${index - 1}`)?.focus()
    }
  }

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden">
      <LeftPanel variant="light" />

      <div className="flex w-full min-w-0 flex-col bg-white px-4 py-8 sm:px-8 lg:w-1/2 lg:px-12">
        {/* Top bar */}
        <div className="mx-auto flex w-full max-w-md flex-wrap items-center justify-between gap-2">
          <BackButton />
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Already have an account?</span>
            <a
              href="/login"
              className="inline-flex h-8 items-center rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              Login
            </a>
          </div>
        </div>

        {/* Center content */}
        <div className="flex flex-1 items-center justify-center">
          <div className="flex w-full max-w-md flex-col items-center gap-6">
            {/* Icon */}
            <div className="flex size-16 items-center justify-center rounded-full bg-gray-100">
              <MailCheck className="size-8 text-gray-400" />
            </div>

            {/* Title */}
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-gray-800">
                Enter Referral Code
              </h1>
              <p className="text-sm text-gray-500">
                We&apos;ve sent a code to <span className="font-medium text-gray-700">arthur@alignui.com</span>
              </p>
            </div>

            {/* Code Input */}
            <div className="flex items-center gap-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`ref-code-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value.replace(/\D/g, ""))}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="size-14 rounded-lg border border-gray-200 bg-gray-50/50 text-center text-xl font-semibold text-gray-800 outline-none focus:border-[#4361ee] focus:ring-2 focus:ring-[#4361ee]/20"
                />
              ))}
            </div>

            {/* Submit Code Button */}
            <Button className="h-12 w-full rounded-lg bg-[#4361ee] text-base font-semibold text-white hover:bg-[#3a56d4]">
              Submit Code
            </Button>

            {/* Resend code */}
            <p className="text-sm text-gray-500">
              Experiencing issues receiving the code?{" "}
              <a href="#" className="font-medium text-[#4361ee] underline underline-offset-2 hover:text-[#3a56d4]">
                Resend code
              </a>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex w-full max-w-md mx-auto items-center justify-end">
          <LanguageSelector />
        </div>
      </div>
    </div>
  )
}
