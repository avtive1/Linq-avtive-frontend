"use client"

import { ReactNode, useState } from "react"
import { DashboardHeader, DashboardSidebar } from "@/components/dashboard"

type ResponsiveAppShellProps = {
  children: ReactNode
  topTabs?: ReactNode
  leftPanel?: ReactNode
  rightPanel?: ReactNode
  contentClassName?: string
}

export function ResponsiveAppShell({
  children,
  topTabs,
  leftPanel,
  rightPanel,
  contentClassName = "",
}: ResponsiveAppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-[#F7F8FA]">
      <DashboardSidebar
        mobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        {topTabs ? (
          <div className="border-b border-gray-100 bg-white px-3 py-2 sm:px-4 lg:px-6">
            <div className="flex gap-4 overflow-x-auto text-sm">{topTabs}</div>
          </div>
        ) : null}

        <div
          className={`flex flex-1 flex-col gap-5 p-4 sm:gap-6 sm:p-5 lg:flex-row lg:items-start lg:gap-7 lg:p-6 ${contentClassName}`}
        >
          {leftPanel ? <aside className="w-full lg:w-[220px] lg:shrink-0">{leftPanel}</aside> : null}

          <main className="min-w-0 flex-1">{children}</main>

          {rightPanel ? <aside className="w-full lg:w-[340px] lg:shrink-0">{rightPanel}</aside> : null}
        </div>
      </div>
    </div>
  )
}
