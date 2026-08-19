"use client"

import { useState, Suspense } from "react"
import { MailCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  BackButton,
  LeftPanel,
  LanguageSelector,
} from "@/components/avtive"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

function VerifyEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  // Email signup ke baad URL se milegi
  const email = searchParams.get("email")

  const [code, setCode] = useState(["", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleVerify = async () => {
    const token = code.join("")

    // Check OTP
    if (token.length !== 4) {
      setErrorMessage("Please enter the complete 4-digit code.")
      return
    }

    if (!email) {
      setErrorMessage("Email address is missing.")
      return
    }

    setLoading(true)
    setErrorMessage("")

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "email",
      })

      if (error) {
        setErrorMessage(error.message)
        return
      }

      // Verification successful - redirect to dashboard
      router.push("/dashboard")
    } catch (err: any) {
      setErrorMessage(err?.message || "Verification failed")
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (!email) {
      setErrorMessage("Email address is missing.")
      return
    }

    setErrorMessage("")
    setSuccessMessage("")

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
      })

      if (error) {
        setErrorMessage(error.message)
        return
      }

      setSuccessMessage("A new verification code has been sent to your email.")
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (err: any) {
      setErrorMessage(err?.message || "Failed to resend code")
    }
  }

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden">
      {/* Left Panel */}
      <LeftPanel variant="light" />

      {/* Right Panel */}
      <div className="flex w-full min-w-0 flex-col bg-white px-4 py-8 sm:px-8 lg:w-1/2 lg:px-12">

        {/* Top bar */}
        <div className="mx-auto flex w-full max-w-md flex-wrap items-center justify-between gap-2">
          <BackButton />

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              Already have an account?
            </span>

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
                Enter Verification Code
              </h1>

              <p className="text-sm text-gray-500">
                We've sent a code to{" "}
                <span className="font-medium text-gray-700">
                  {email || "your email"}
                </span>
              </p>
            </div>

            {/* Code Input */}
            <div className="flex items-center gap-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) =>
                    handleChange(
                      index,
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="size-14 rounded-lg border border-gray-200 bg-gray-50/50 text-center text-xl font-semibold text-gray-800 outline-none focus:border-[#4361ee] focus:ring-2 focus:ring-[#4361ee]/20"
                />
              ))}
            </div>

            {/* Error / success message */}
            {errorMessage && (
              <p className="text-sm text-red-500 text-center">
                {errorMessage}
              </p>
            )}

            {successMessage && (
              <p className="text-sm text-green-600 text-center">
                {successMessage}
              </p>
            )}

            {/* Submit Code */}
            <Button
              onClick={handleVerify}
              disabled={loading}
              className="h-12 w-full rounded-lg bg-[#4361ee] text-base font-semibold text-white hover:bg-[#3a56d4]"
            >
              {loading ? "Verifying..." : "Submit Code"}
            </Button>

            {/* Resend code */}
            <p className="text-sm text-gray-500">
              Experiencing issues receiving the code?{" "}
              <button
                type="button"
                onClick={handleResend}
                className="font-medium text-[#4361ee] underline underline-offset-2 hover:text-[#3a56d4]"
              >
                Resend code
              </button>
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

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  )
}