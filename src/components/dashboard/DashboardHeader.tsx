
import { Search, Bell, Eye, Plus, CheckCircle2, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AvtiveLogo } from "@/components/avtive"

type DashboardHeaderProps = {
  onMenuClick?: () => void
  user?: {
    name?: string | null
    email?: string | null
  }
}

export function DashboardHeader({
  onMenuClick,
  user
}: DashboardHeaderProps) {
  return (
    <header className="flex flex-col gap-3 border-b border-gray-100 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 lg:px-8 lg:py-4">
      <div className="flex min-w-0 items-center gap-3 sm:gap-6 lg:gap-8">

        {onMenuClick && (
          <button
            type="button"
            className="flex size-9 shrink-0 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50 lg:hidden"
            aria-label="Open navigation menu"
            onClick={onMenuClick}
          >
            <Menu className="size-5" />
          </button>
        )}

        <AvtiveLogo className="shrink-0" />

        <div className="min-w-0 pl-1 sm:pl-2">
          <p className="truncate text-sm font-semibold text-gray-800">
            {user?.name || user?.email || "User"}
          </p>

          <p className="truncate text-sm text-gray-500">
            Welcome to Avtive 👋
          </p>
        </div>

      </div>


      <div className="flex flex-wrap items-center gap-2 sm:justify-end sm:gap-3">

        <div className="hidden items-center gap-2.5 rounded-full border border-gray-100 bg-gray-50 px-3 py-1.5 sm:flex">
          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-200 md:w-24">
            <div className="h-full w-full rounded-full bg-[#4361ee]" />
          </div>

          <span className="text-xs font-medium text-gray-500">
            100%
          </span>
        </div>


        <span className="hidden items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-[#4361ee] md:flex">
          <CheckCircle2 className="size-3.5 text-green-500" />
          Profile Completed
        </span>


        <span className="flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-[#4361ee] sm:hidden">
          <CheckCircle2 className="size-3.5 text-green-500" />
          100%
        </span>


        <div className="hidden h-5 w-px bg-gray-200 sm:block" />


        <button
          type="button"
          className="text-gray-400 hover:text-gray-600"
          aria-label="Search"
        >
          <Search className="size-5" />
        </button>


        <button
          type="button"
          className="text-gray-400 hover:text-gray-600"
          aria-label="Notifications"
        >
          <Bell className="size-5" />
        </button>


        <Button
          variant="outline"
          className="gap-1.5 rounded-lg px-2.5 text-xs font-medium sm:px-3"
        >
          <Eye className="size-4" />
          <span className="hidden sm:inline">
            Preview
          </span>
        </Button>


        <Button
          className="gap-1.5 rounded-lg bg-[#4361ee] px-2.5 text-xs font-medium text-white hover:bg-[#3a56d4] sm:px-3"
        >
          <Plus className="size-4" />
          <span className="hidden sm:inline">
            New
          </span>
        </Button>

      </div>

    </header>
  )
}

