"use client"

import { useState } from "react"
import { Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { BackButton, SocialLoginButtons, LeftPanel, LanguageSelector } from "@/components/avtive"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setError("Please enter your email address.")
      return
    }

    try {
      setLoading(true)
      setError("")
      // TODO: Implement password reset logic with Supabase
      setSuccess(true)
    } catch (err: any) {
      setError(err?.message || "Failed to send reset email")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen w-full overflow-x-hidden">
        <LeftPanel variant="light" />

        <div className="flex w-full min-w-0 flex-col bg-white px-4 py-8 sm:px-8 lg:w-1/2 lg:px-12">
          <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center gap-6 min-h-screen">
            <Mail className="h-16 w-16 text-green-500" />
            <h1 className="text-2xl font-bold text-gray-800">Check your email</h1>
            <p className="text-center text-gray-600">
              We&apos;ve sent a password reset link to {email}
            </p>
            <Button onClick={() => (window.location.href = "/login")} className="w-full">
              Back to Login
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
        <div className="mx-auto flex w-full max-w-md flex-wrap items-center justify-between gap-2">
          <BackButton />
          <LanguageSelector />
        </div>

        <div className="flex flex-1 items-center justify-center">
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-800">Reset Password</h1>
              <p className="text-sm text-gray-600">
                Enter your email address and we&apos;ll send you a link to reset your password.
              </p>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>

            <div className="text-center text-sm">
              <p className="text-gray-600">
                Remember your password?{" "}
                <a href="/login" className="text-[#4361ee] hover:underline">
                  Sign in
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
