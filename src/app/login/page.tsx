"use client"

import { useState } from "react"
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { BackButton, SocialLoginButtons, LeftPanel, LanguageSelector } from "@/components/avtive"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [emailError] = useState(true) // Simulating "Incorrect Email" error

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden">
      {/* Left Panel - Branding */}
      <LeftPanel variant="light" />

      {/* Right Panel - Login Form */}
      <div className="flex w-full min-w-0 flex-col bg-white px-4 py-8 sm:px-8 lg:w-1/2 lg:px-12">
        {/* Top bar */}
        <div className="mx-auto flex w-full max-w-md flex-wrap items-center justify-between gap-2">
          <BackButton />
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Don&apos;t have an account?</span>
            <a
              href="/register"
              className="inline-flex h-8 items-center rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              Register
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
                Login to your account
              </h1>
              <p className="text-sm text-gray-500">Enter your details to login.</p>
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
                    defaultValue="hello@aligntui.com"
                    className="h-11 rounded-lg border-red-300 bg-gray-50/50 pl-10 text-sm focus:border-red-400 focus:ring-red-200"
                  />
                </div>
                {emailError && (
                  <p className="text-xs font-medium text-red-500">Incorrect Email</p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    defaultValue="password123"
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
              </div>

              {/* Keep me logged in / Forgot password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="keepLoggedIn" className="size-4 rounded border-gray-300" />
                  <label
                    htmlFor="keepLoggedIn"
                    className="text-sm text-gray-500 cursor-pointer select-none"
                  >
                    Keep me logged in
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-[#4361ee] underline underline-offset-2 hover:text-[#3a56d4]"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Login Button */}
            <Button className="h-12 w-full rounded-lg bg-[#4361ee] text-base font-semibold text-white hover:bg-[#3a56d4]">
              Login
            </Button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex w-full max-w-md mx-auto items-center justify-between">
          <p className="text-xs text-gray-400">&copy; 2026 Avtive (Private) Limited</p>
          <LanguageSelector />
        </div>
      </div>
    </div>
  )
}
