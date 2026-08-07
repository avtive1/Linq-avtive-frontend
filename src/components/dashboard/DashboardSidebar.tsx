
import {
  LayoutDashboard,
  CreditCard,
  Clock,
  FolderKanban,
  Users,
  Puzzle,
  Gift,
  FileText,
  Settings,
  HelpCircle,
  CheckCircle2,
  ChevronRight,
  X,
} from "lucide-react"

import { PersonPhoto } from "@/components/avtive"


const sidebarTools = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
  { icon: CreditCard, label: "My Card", href: "/settings/v-card" },
  { icon: Clock, label: "Time Off", href: "#" },
  { icon: FolderKanban, label: "Projects", href: "#" },
  { icon: Users, label: "Teams", href: "#" },
  { icon: Puzzle, label: "Integrations", href: "#" },
  { icon: Gift, label: "Benefits", href: "#" },
  { icon: FileText, label: "Documents", href: "#" },
]


type UserType = {
  name?: string | null
  email?: string | null
}


type DashboardSidebarProps = {
  mobileOpen?: boolean
  onMobileClose?: () => void
  user?: UserType
}



function SidebarContent({
  onNavigate,
  user
}: {
  onNavigate?: () => void
  user?: UserType
}) {


  const userName = user?.name || user?.email || "User"


  return (
    <>

      <div>

        <button
          type="button"
          className="mb-6 flex w-full items-center gap-2.5 rounded-lg px-5 py-1 text-left hover:bg-gray-50"
        >

          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#4361ee] text-sm font-semibold text-white">
            {userName.charAt(0).toUpperCase()}
          </span>


          <span className="truncate text-sm font-semibold text-gray-800">
            {userName}'s Workspace
          </span>


          <ChevronRight className="ml-auto size-4 shrink-0 text-gray-400" />

        </button>



        <p className="mb-2 px-5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          Tools
        </p>


        <nav className="flex flex-col gap-0.5 px-3">

          {sidebarTools.map((tool) => (

            <a
              key={tool.label}
              href={tool.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                tool.active
                  ? "bg-blue-50 font-medium text-[#4361ee]"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >

              <tool.icon
                className={`size-[18px] shrink-0 ${
                  tool.active ? "text-[#4361ee]" : ""
                }`}
              />


              <span className="truncate">
                {tool.label}
              </span>


              {tool.active && (
                <ChevronRight className="ml-auto size-3.5 shrink-0 text-[#4361ee]" />
              )}

            </a>

          ))}

        </nav>

      </div>




      <div className="flex flex-col gap-1 px-3">


        <a
          href="/settings"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
        >
          <Settings className="size-[18px] shrink-0" />
          Settings
        </a>



        <a
          href="#"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
        >
          <HelpCircle className="size-[18px] shrink-0" />
          Support
        </a>




        <div className="mt-3 flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">


          <PersonPhoto className="size-10 shrink-0 rounded-full" />


          <div className="min-w-0 flex-1">


            <div className="flex items-center gap-1">

              <p className="truncate text-sm font-medium text-gray-800">
                {userName}
              </p>


              <CheckCircle2 className="size-3.5 shrink-0 fill-[#4361ee] text-white" />

            </div>



            <p className="truncate text-[11px] text-gray-400">
              {user?.email || "No email"}
            </p>


          </div>


          <ChevronRight className="size-3.5 shrink-0 text-gray-400" />

        </div>


      </div>

    </>
  )
}





export function DashboardSidebar({
  mobileOpen = false,
  onMobileClose,
  user
}: DashboardSidebarProps) {


  return (

    <>

      <aside className="hidden w-[250px] shrink-0 flex-col justify-between border-r border-gray-100 bg-white py-5 lg:flex">

        <SidebarContent user={user} />

      </aside>



      {mobileOpen && (

        <div className="fixed inset-0 z-50 lg:hidden">


          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close navigation menu"
            onClick={onMobileClose}
          />



          <aside className="relative flex h-full w-[min(280px,85vw)] flex-col justify-between overflow-y-auto border-r border-gray-100 bg-white pb-5 pt-12 shadow-xl">


            <button
              type="button"
              className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
              aria-label="Close navigation menu"
              onClick={onMobileClose}
            >

              <X className="size-5" />

            </button>



            <SidebarContent
              user={user}
              onNavigate={onMobileClose}
            />


          </aside>


        </div>

      )}

    </>

  )
}

