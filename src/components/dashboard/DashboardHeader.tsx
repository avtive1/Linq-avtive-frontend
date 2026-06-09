import { Search, Bell, Eye, Plus, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AvtiveLogo } from "@/components/avtive"

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between border-b border-gray-100 bg-white px-8 py-4">
      <div className="flex items-center gap-8">
        <AvtiveLogo />
        <div>
          <p className="text-sm font-semibold text-gray-800">Syed Mesum Raza</p>
          <p className="text-sm text-gray-500">Welcome to Avtive 👋</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 rounded-full border border-gray-100 bg-gray-50 px-3 py-1.5">
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-full rounded-full bg-[#4361ee]" />
          </div>
          <span className="text-xs font-medium text-gray-500">100%</span>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-[#4361ee]">
          <CheckCircle2 className="size-3.5 text-green-500" />
          Profile Completed
        </span>
        <div className="mx-1 h-5 w-px bg-gray-200" />
        <button type="button" className="text-gray-400 hover:text-gray-600" aria-label="Search">
          <Search className="size-5" />
        </button>
        <button type="button" className="text-gray-400 hover:text-gray-600" aria-label="Notifications">
          <Bell className="size-5" />
        </button>
        <Button variant="outline" className="gap-1.5 rounded-lg text-xs font-medium">
          <Eye className="size-4" />
          Preview
        </Button>
        <Button className="gap-1.5 rounded-lg bg-[#4361ee] text-xs font-medium text-white hover:bg-[#3a56d4]">
          <Plus className="size-4" />
          New
        </Button>
      </div>
    </header>
  )
}
