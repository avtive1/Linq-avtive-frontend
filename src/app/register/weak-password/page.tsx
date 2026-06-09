"use client"

import { useState } from "react"
import { User, Mail, Lock, Eye, EyeOff, Check, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BackButton, SocialLoginButtons, LeftPanel, LanguageSelector } from "@/components/avtive"

export default function RegisterWeakPasswordPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Panel - Branding */}
      <LeftPanel variant="light" />

      {/* Right Panel - Registration Form */}
      <div className="flex w-full lg:w-1/2 flex-col bg-white px-6 py-8 sm:px-12">
        {/* Top bar */}
        <div className="flex w-full max-w-md mx-auto items-center justify-between">
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
            {/* Avatar */}
            <div className="flex size-16 items-center justify-center rounded-full bg-gray-100">
              <User className="size-8 text-gray-400" />
            </div>

            {/* Title */}
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-gray-800">
                Create a new account
              </h1>
              <p className="text-sm text-gray-500">Enter your details to register.</p>
            </div>

            {/* Social Login */}
            <SocialLoginButtons />

            {/* Divider */}
            <div className="flex w-full items-center gap-4">
              <Separator className="flex-1" />
              <span className="text-xs font-medium text-gray-400">OR</span>
              <Separator className="flex-1" />
            </div>

            {/* Form */}
            <div className="flex w-full flex-col gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="fullName"
                    type="text"
                    defaultValue="James Brown"
                    className="h-11 rounded-lg border-gray-200 bg-gray-50/50 pl-10 text-sm focus:border-[#4361ee] focus:ring-[#4361ee]/20"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    defaultValue="hello@alignui.com"
                    className="h-11 rounded-lg border-gray-200 bg-gray-50/50 pl-10 text-sm focus:border-[#4361ee] focus:ring-[#4361ee]/20"
                  />
                </div>
              </div>

              {/* Password with strength indicator */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    defaultValue="Password1"
                    className="h-11 rounded-lg border-gray-200 bg-gray-50/50 pl-10 pr-10 text-sm focus:border-[#4361ee] focus:ring-[#4361ee]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>

                {/* Password strength section */}
                <div className="flex flex-col gap-2 pt-1">
                  {/* Requirement hint */}
                  <div className="flex items-start gap-1.5">
                    <Info className="size-3.5 mt-0.5 shrink-0 text-red-400" />
                    <p className="text-xs text-red-400">
                      Must contain 1 uppercase letter, 1 number, min. 8 characters.
                    </p>
                  </div>

                  {/* Strength progress bar */}
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full w-1/3 rounded-full bg-red-400 transition-all" />
                  </div>

                  {/* Weak password label */}
                  <div className="flex items-start gap-1.5">
                    <Check className="size-3.5 mt-0.5 shrink-0 text-green-500" />
                    <p className="text-xs font-medium text-gray-700">
                      Weak password. Must contain at least:
                    </p>
                  </div>

                  {/* Requirement checklist */}
                  <div className="flex flex-col gap-1 pl-5">
                    <div className="flex items-center gap-1.5">
                      <Check className="size-3 shrink-0 text-green-500" />
                      <span className="text-xs text-gray-600">At least 1 uppercase</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="size-3 shrink-0 text-green-500" />
                      <span className="text-xs text-gray-600">At least 1 number</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="size-3 shrink-0 text-green-500" />
                      <span className="text-xs text-gray-600">At least 8 characters</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Register Button */}
            <Button className="h-12 w-full rounded-lg bg-[#4361ee] text-base font-semibold text-white hover:bg-[#3a56d4]">
              Register
            </Button>
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
