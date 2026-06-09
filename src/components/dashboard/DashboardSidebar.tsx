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

export function DashboardSidebar() {
  return (
    <aside className="flex w-[250px] shrink-0 flex-col justify-between border-r border-gray-100 bg-white py-5">
      <div>
        <button
          type="button"
          className="mb-6 flex w-full items-center gap-2.5 rounded-lg px-5 py-1 text-left hover:bg-gray-50"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#4361ee] text-sm font-semibold text-white">
            S
          </span>
          <span className="text-sm font-semibold text-gray-800">Syed&apos;s Workspace</span>
          <ChevronRight className="ml-auto size-4 text-gray-400" />
        </button>

        <p className="mb-2 px-5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          Tools
        </p>
        <nav className="flex flex-col gap-0.5 px-3">
          {sidebarTools.map((tool) => (
            <a
              key={tool.label}
              href={tool.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                tool.active
                  ? "bg-blue-50 font-medium text-[#4361ee]"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <tool.icon className={`size-[18px] ${tool.active ? "text-[#4361ee]" : ""}`} />
              {tool.label}
              {tool.active && <ChevronRight className="ml-auto size-3.5 text-[#4361ee]" />}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-1 px-3">
        <a
          href="/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
        >
          <Settings className="size-[18px]" />
          Settings
        </a>
        <a
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
        >
          <HelpCircle className="size-[18px]" />
          Support
        </a>
        <div className="mt-3 flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
          <PersonPhoto className="size-10 rounded-full" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <p className="text-sm font-medium text-gray-800">Sophia Williams</p>
              <CheckCircle2 className="size-3.5 fill-[#4361ee] text-white" />
            </div>
            <p className="truncate text-[11px] text-gray-400">sophia@alignui.com</p>
          </div>
          <ChevronRight className="size-3.5 text-gray-400" />
        </div>
      </div>
    </aside>
  )
}
