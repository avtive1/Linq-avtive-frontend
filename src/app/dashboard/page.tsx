"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

import {
  DashboardSidebar,
  DashboardHeader,
  MyCardsWidget,
  VCardWidget,
  ConnectionHistoryWidget,
  FeatureGrid,
} from "@/components/dashboard"

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.replace("/login")
          return
        }

        setUser(user)
      } catch (error) {
        console.error("Error fetching user:", error)
        router.replace("/login")
      } finally {
        setLoading(false)
      }
    }

    getUser()

    // Listen for authentication changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        router.replace("/login")
        return
      }

      setUser(session.user)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase])

  // Don't render dashboard until authentication is checked
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F8FA]">
        <p className="text-sm text-gray-500">
          Loading dashboard...
        </p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-[#F7F8FA]">

      <DashboardSidebar
        user={user}
        mobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">

        <DashboardHeader
          user={user}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div className="flex flex-1 flex-col gap-4 p-3 sm:gap-5 sm:p-4 lg:flex-row lg:p-6">

          <div className="flex min-w-0 flex-1 flex-col gap-4 sm:gap-5">

            <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">

              <MyCardsWidget
                user={user}
              />

              <VCardWidget
                user={user}
              />

            </div>

            <FeatureGrid />

          </div>

          <div className="w-full shrink-0 lg:w-[340px]">
            <ConnectionHistoryWidget />
          </div>

        </div>

      </div>

    </div>
  )
}