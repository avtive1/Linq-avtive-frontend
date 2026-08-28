"use client"

import { useRef, useState, Suspense } from "react"
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

  const email = searchParams.get("email")

  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1)

    const newCode = [...code]
    newCode[index] = digit
    setCode(newCode)

    setErrorMessage("")

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const newCode = [...code]
      newCode[index - 1] = ""
      setCode(newCode)

      inputRefs.current[index - 1]?.focus()
    }

    if (e.key === "Enter") {
      void handleVerify()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6)

    if (!pastedData) return

    const newCode = Array.from({ length: 6 }, (_, index) => {
      return pastedData[index] || ""
    })

    setCode(newCode)
    setErrorMessage("")

    const lastIndex = Math.min(pastedData.length, 6) - 1
    inputRefs.current[lastIndex]?.focus()
  }

  const handleVerify = async () => {
    const token = code.join("")

    if (token.length !== 6) {
      setErrorMessage("Please enter the complete 6-digit code.")
      return
    }

    if (!email) {
      setErrorMessage("Email address is missing. Please sign up again.")
      return
    }

    setLoading(true)
    setErrorMessage("")
    setSuccessMessage("")

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

      setSuccessMessage("Email verified successfully!")

      setTimeout(() => {
        router.push("/dashboard")
        router.refresh()
      }, 500)
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : "Verification failed."
      )
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (!email) {
      setErrorMessage("Email address is missing. Please sign up again.")
      return
    }

    setResending(true)
    setErrorMessage("")
    setSuccessMessage("")

    try {
      const { error } = await supabase.auth.signInWithOtp({
      email,
      })

      if (error) {
        setErrorMessage(error.message)
        return
      }

      setCode(["", "", "", "", "", ""])
      inputRefs.current[0]?.focus()

      setSuccessMessage(
        "A new verification code has been sent to your email."
      )
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Failed to resend verification code."
      )
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden">
      <LeftPanel variant="light" />

      <div className="flex w-full min-w-0 flex-col bg-white px-4 py-8 sm:px-8 lg:w-1/2 lg:px-12">
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

        <div className="flex flex-1 items-center justify-center">
          <div className="flex w-full max-w-md flex-col items-center gap-6">
            <div className="flex size-16 items-center justify-center rounded-full bg-gray-100">
              <MailCheck className="size-8 text-gray-400" />
            </div>

            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-gray-800">
                Enter Verification Code
              </h1>

              <p className="text-sm text-gray-500">
                {"We've sent a code to "}
                <span className="font-medium text-gray-700">
                  {email || "your email"}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    inputRefs.current[index] = element
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  maxLength={1}
                  value={digit}
                  disabled={loading}
                  onChange={(e) =>
                    handleChange(index, e.target.value)
                  }
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="size-14 rounded-lg border border-gray-200 bg-gray-50/50 text-center text-xl font-semibold text-gray-800 outline-none focus:border-[#4361ee] focus:ring-2 focus:ring-[#4361ee]/20 disabled:cursor-not-allowed disabled:opacity-50"
                />
              ))}
            </div>

            {errorMessage && (
              <p className="text-center text-sm text-red-500">
                {errorMessage}
              </p>
            )}

            {successMessage && (
              <p className="text-center text-sm text-green-600">
                {successMessage}
              </p>
            )}

            <Button
              type="button"
              onClick={handleVerify}
              disabled={loading || resending}
              className="h-12 w-full rounded-lg bg-[#4361ee] text-base font-semibold text-white hover:bg-[#3a56d4]"
            >
              {loading ? "Verifying..." : "Submit Code"}
            </Button>

            <p className="text-sm text-gray-500">
              Experiencing issues receiving the code?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={loading || resending}
                className="font-medium text-[#4361ee] underline underline-offset-2 hover:text-[#3a56d4] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {resending ? "Sending..." : "Resend code"}
              </button>
            </p>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-md items-center justify-end">
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