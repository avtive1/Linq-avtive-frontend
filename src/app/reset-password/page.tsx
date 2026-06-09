"use client"

import { Mail, Info, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { BackButton, LeftPanel, LanguageSelector } from "@/components/avtive"

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen w-full">
      <LeftPanel variant="light" />

      <div className="flex w-full lg:w-1/2 flex-col bg-white px-6 py-8 sm:px-12">
        {/* Top bar */}
        <div className="flex w-full max-w-md mx-auto items-center justify-between">
          <BackButton />
        </div>

        {/* Center content */}
        <div className="flex flex-1 items-center justify-center">
          <div className="flex w-full max-w-md flex-col items-center gap-6">
            {/* Spinner icon */}
            <div className="flex size-16 items-center justify-center rounded-full bg-gray-100">
              <Loader2 className="size-8 animate-spin text-gray-400" />
            </div>

            {/* Title */}
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-gray-800">
                Reset Password
              </h1>
              <p className="text-sm text-gray-500">Enter your email to reset your password.</p>
            </div>

            {/* Form */}
            <div className="flex w-full flex-col gap-4">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email" className="flex items-center gap-1 text-sm font-medium text-gray-700">
                  Email Address <span className="text-gray-400 font-normal">(Optional)</span>
                  <Info className="size-3.5 text-gray-400" />
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    defaultValue="hello@allignui.com"
                    className="h-11 rounded-lg border-gray-200 bg-gray-50/50 pl-10 text-sm focus:border-[#4361ee] focus:ring-[#4361ee]/20"
                  />
                </div>
                <div className="flex items-start gap-1.5">
                  <Info className="size-3 mt-0.5 shrink-0 text-gray-400" />
                  <p className="text-xs text-gray-400">Enter the email with which you&apos;ve registered.</p>
                </div>
              </div>
            </div>

            {/* Reset Password Button */}
            <Button className="h-12 w-full rounded-lg bg-[#4361ee] text-base font-semibold text-white hover:bg-[#3a56d4]">
              Reset Password
            </Button>

            {/* Alternative */}
            <p className="text-sm text-gray-500">
              Don&apos;t have access anymore?{" "}
              <a href="#" className="font-medium text-[#4361ee] underline underline-offset-2 hover:text-[#3a56d4]">
                Try another method
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
