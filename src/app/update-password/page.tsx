"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, Eye, EyeOff, CheckCircle } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import {
  BackButton,
  LeftPanel,
  LanguageSelector,
} from "@/components/avtive"

import { createClient } from "@/lib/supabase/client"

export default function UpdatePasswordPage() {
  const router = useRouter()
  const supabase = createClient()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

    const handleUpdatePassword = async () => {
    setError("")

    if (!password || !confirmPassword) {
        setError("Please enter and confirm your new password.")
        return
    }

    if (password.length < 6) {
        setError("Password must be at least 6 characters long.")
        return
    }

    if (password !== confirmPassword) {
        setError("Passwords do not match.")
        return
    }

    try {
        setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password: password,
    })

    if (error) {
      console.error("Password update error:", error)

      // Recovery session missing
      if (error.message === "Auth session missing!") {
        setError(
          "Your password reset link has expired or is invalid. Please request a new reset link."
        )
        return
      }

      setError(
        error.message || "Failed to update password."
      )
      return
    }

    // Password successfully changed
    router.push("/login")
  } catch (err: unknown) {
    console.error(err)

    setError(
      err instanceof Error
        ? err.message
        : "Something went wrong. Please try again."
    )
  } finally {
    setLoading(false)
  }
}

  if (success) {
    return (
      <div className="flex min-h-screen w-full overflow-x-hidden">
        <LeftPanel variant="light" />

        <div className="flex w-full min-w-0 flex-col bg-white px-4 py-8 sm:px-8 lg:w-1/2 lg:px-12">
          <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center gap-6">
            <CheckCircle className="h-16 w-16 text-green-500" />

            <h1 className="text-center text-2xl font-bold text-gray-800">
              Password Updated
            </h1>

            <p className="text-center text-gray-600">
              Your password has been successfully updated.
              You can now login with your new password.
            </p>

            <Button
              onClick={() => router.push("/login")}
              className="w-full"
            >
              Go to Login
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden">
      <LeftPanel variant="light" />

      <div className="flex w-full min-w-0 flex-col bg-white px-4 py-8 sm:px-8 lg:w-1/2 lg:px-12">
        {/* Top bar */}
        <div className="mx-auto flex w-full max-w-md flex-wrap items-center justify-between gap-2">
          <BackButton />
          <LanguageSelector />
        </div>

        {/* Form */}
        <div className="flex flex-1 items-center justify-center">
          <div className="flex w-full max-w-md flex-col gap-6">

            {/* Heading */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-800">
                Create New Password
              </h1>

              <p className="text-sm text-gray-600">
                Enter your new password below to reset your
                account password.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* New Password */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                New Password
              </Label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />

                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError("")
                  }}
                  placeholder="Enter new password"
                  disabled={loading}
                  className="h-11 rounded-lg border-gray-200 bg-gray-50/50 pl-10 pr-10 text-sm focus:border-[#4361ee] focus:ring-[#4361ee]/20"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </Label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />

                <Input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    setError("")
                  }}
                  placeholder="Confirm new password"
                  disabled={loading}
                  className="h-11 rounded-lg border-gray-200 bg-gray-50/50 pl-10 pr-10 text-sm focus:border-[#4361ee] focus:ring-[#4361ee]/20"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={loading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Password requirements */}
            <div className="rounded-md bg-gray-50 p-3">
              <p className="text-xs text-gray-500">
                Password must be at least 6 characters long.
              </p>
            </div>

            {/* Update button */}
            <Button
              onClick={handleUpdatePassword}
              disabled={loading}
              className="h-12 w-full rounded-lg bg-[#4361ee] text-base font-semibold text-white hover:bg-[#3a56d4]"
            >
              {loading
                ? "Updating Password..."
                : "Reset Password"}
            </Button>

            {/* Login */}
            <div className="text-center text-sm">
              <p className="text-gray-600">
                Remember your password?{" "}

                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="font-medium text-[#4361ee] hover:underline"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}