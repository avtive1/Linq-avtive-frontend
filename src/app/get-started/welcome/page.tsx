"use client"

import { Button } from "@/components/ui/button"
import { AvtiveLogo } from "@/components/avtive"

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-amber-50 via-white to-sky-50">
      {/* Top bar */}
     

   

      {/* Center content */}
      <div className="flex flex-1 items-center justify-center px-4 sm:px-8">
        <div className="flex flex-col items-center gap-6">
          {/* Avatar */}
          <div className="size-24 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg">
            <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-white">
              SM
            </div>
          </div>

          {/* Logo */}
          <AvtiveLogo className="flex-col gap-1" />

          <p className="text-sm text-gray-500">Redefining Networking</p>

          {/* Welcome message */}
          <h1 className="text-center text-2xl font-bold text-gray-800 sm:text-3xl">
            Welcome to the Virtual World !
          </h1>

          {/* Continue button */}
          <a href="/get-started">
            <Button className="h-12 rounded-lg bg-[#4361ee] px-10 text-base font-semibold text-white hover:bg-[#3a56d4]">
              Continue
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
