
"use client"

import { useState } from "react"
import { auth } from "@/lib/auth"

import {
  DashboardSidebar,
  DashboardHeader,
  MyCardsWidget,
  VCardWidget,
  ConnectionHistoryWidget,
  FeatureGrid,
} from "@/components/dashboard"


export default function DashboardPage() {

  const [sidebarOpen, setSidebarOpen] = useState(false)


  const session = auth.useSession()

  const user = session.data?.user



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
