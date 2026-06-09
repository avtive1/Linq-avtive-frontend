"use client"

import { useState } from "react"
import { Users, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BackButton, LeftPanel, LanguageSelector } from "@/components/avtive"

type UserType = "team" | "self"

export default function SignupPage() {
  const [selected, setSelected] = useState<UserType>("self")

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Panel - Branding */}
      <LeftPanel copyrightYear="2020" />

      {/* Right Panel - Selection Form */}
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-between bg-white px-6 py-8 sm:px-12">
        {/* Top bar */}
        <div className="flex w-full max-w-md items-center justify-between">
          <BackButton />
          <LanguageSelector />
        </div>

        {/* Center content */}
        <div className="flex w-full max-w-md flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-800">
              Avtive helps you collect and share your business info at every event.
              <br />
               <p className="text-sm font-medium text-gray-500">
              Who will be using Avtive?
            </p>
            </h1>
          </div>

          <div className="w-full border-t border-gray-100" />

          <div className="flex w-full flex-col gap-2">
           

            {/* My Team Option */}
            <Card
              className={`cursor-pointer transition-all ${
                selected === "team"
                  ? "border-[#4361ee] bg-blue-50/50 shadow-sm"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
              onClick={() => setSelected("team")}
            >
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-gray-100">
                  <Users className="size-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">My Team</p>
                  <p className="text-sm text-gray-500">Set up your team on Avtive</p>
                </div>
                <div
                  className={`flex size-5 items-center justify-center rounded-full border-2 transition-all ${
                    selected === "team"
                      ? "border-[#4361ee] bg-[#4361ee]"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {selected === "team" && (
                    <svg
                      width="10"
                      height="8"
                      viewBox="0 0 10 8"
                      fill="none"
                      className="text-white"
                    >
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* My Self Option */}
            <Card
              className={`cursor-pointer transition-all ${
                selected === "self"
                  ? "border-[#4361ee] bg-blue-50/50 shadow-sm"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
              onClick={() => setSelected("self")}
            >
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-gray-100">
                  <User className="size-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">My Self</p>
                  <p className="text-sm text-gray-500">Create your free digital card</p>
                </div>
                <div
                  className={`flex size-5 items-center justify-center rounded-full border-2 transition-all ${
                    selected === "self"
                      ? "border-[#4361ee] bg-[#4361ee]"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {selected === "self" && (
                    <svg
                      width="10"
                      height="8"
                      viewBox="0 0 10 8"
                      fill="none"
                      className="text-white"
                    >
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Get Started Button */}
          <a href="/get-started/welcome" className="w-full">
            <Button className="h-12 w-full rounded-lg bg-[#4361ee] text-base font-semibold text-white hover:bg-[#3a56d4]">
              Get Started
            </Button>
          </a>

          {/* Login link */}
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-[#4361ee] underline underline-offset-2 hover:text-[#3a56d4]">
              Login
            </a>
          </p>
        </div>

        {/* Bottom spacer */}
        <div className="h-4" />
      </div>
    </div>
  )
}
