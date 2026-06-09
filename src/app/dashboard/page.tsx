"use client"

import {
  DashboardSidebar,
  DashboardHeader,
  MyCardsWidget,
  VCardWidget,
  ConnectionHistoryWidget,
  FeatureGrid,
} from "@/components/dashboard"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#F7F8FA]">
      <DashboardSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader />

        <div className="flex flex-1 gap-5 p-6">
          <div className="flex min-w-0 flex-1 flex-col gap-5">
            <div className="grid grid-cols-2 gap-5">
              <MyCardsWidget />
              <VCardWidget />
            </div>
            <FeatureGrid />
          </div>

          <div className="w-[340px] shrink-0">
            <ConnectionHistoryWidget />
          </div>
        </div>
      </div>
    </div>
  )
}
