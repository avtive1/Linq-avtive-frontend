"use client"

import { usePathname } from "next/navigation"
import { AvtiveLogo } from "./AvtiveLogo"

interface LeftPanelProps {
  copyrightYear?: string
  variant?: "gradient" | "light"
}

export function LeftPanel({
  copyrightYear = "2026",
  variant = "gradient",
}: LeftPanelProps) {
  const pathname = usePathname()

  const isSignup = pathname === "/signup"
  const hideTopLogo = isSignup

  if (variant === "light") {
    return (
      <div className="relative hidden lg:flex lg:w-1/2 bg-[#F9FAFB] p-10 overflow-hidden">

        {/* Top Left Logo (hidden on signup) */}
        {!hideTopLogo && (
          <div className="absolute top-10 left-10 z-10">
            <AvtiveLogo />
          </div>
        )}

        {/* Center Logo (ONLY signup) */}
        {isSignup && (
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <AvtiveLogo className="scale-150 opacity-80" />
          </div>
        )}

        {/* Bottom Copyright */}
        <div className="absolute bottom-10 left-10 z-10">
          <p className="text-xs text-gray-400">
            &copy; {copyrightYear} Avtive (Private) Limited
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative hidden lg:flex lg:w-1/2 bg-gradient-to-br from-sky-100 via-blue-50 to-amber-50 p-10 overflow-hidden">

      {/* Background blobs */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-amber-100 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-green-100 rounded-full blur-3xl" />
      </div>

      {/* Top Left Logo (hidden on signup) */}
      {!hideTopLogo && (
        <div className="absolute top-10 left-10 z-10">
          <AvtiveLogo />
        </div>
      )}

      {/* Center Logo (ONLY signup) */}
      {isSignup && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <AvtiveLogo className="scale-150 opacity-80" />
        </div>
      )}

      {/* Bottom Copyright */}
      <div className="absolute bottom-10 left-10 z-10">
        <p className="text-sm text-white/60">
          &copy; {copyrightYear} Avtive (Pvt) Ltd
        </p>
      </div>
    </div>
  )
} 