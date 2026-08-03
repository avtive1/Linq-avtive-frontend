import { ChevronLeft, ChevronRight, Video, Building2, Globe } from "lucide-react"
import { PersonPhoto } from "@/components/avtive"

const meetings = [
  {
    name: "Rameel Malik",
    time: "8:00 – 8:45 AM (UTC)",
    platform: "On Google Meet",
    icon: Video,
    status: "Confirmed" as const,
  },
  {
    name: "Abdul Haseeb",
    time: "9:00 – 9:45 AM (UTC)",
    platform: "At EMRCHAINS",
    icon: Building2,
    status: "Confirmed" as const,
  },
  {
    name: "Arthur Taylor",
    time: "10:00 – 11:00 AM (UTC)",
    platform: "On Linkedin",
    icon: Globe,
    status: "Pending" as const,
  },
]

const days = [
  { day: "Fri", date: "31" },
  { day: "Sat", date: "01" },
  { day: "Sun", date: "02", active: true },
  { day: "Mon", date: "03" },
  { day: "Tue", date: "04" },
]

export function ConnectionHistoryWidget() {
  return (
    <div className="flex min-w-0 flex-col rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5 lg:min-h-0 lg:h-full">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800">Connection History</h3>
        <a href="#" className="text-xs font-medium text-[#4361ee] hover:underline">
          See All
        </a>
      </div>

      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-700">Aug, 2023</span>
        <div className="flex gap-1">
          <button
            type="button"
            className="flex size-6 items-center justify-center rounded-md text-gray-400 hover:bg-gray-50"
            aria-label="Previous month"
          >
            <ChevronLeft className="size-3.5" />
          </button>
          <button
            type="button"
            className="flex size-6 items-center justify-center rounded-md text-gray-400 hover:bg-gray-50"
            aria-label="Next month"
          >
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      </div>

      <div className="mb-4 flex gap-1">
        {days.map((d) => (
          <button
            key={d.date}
            type="button"
            className={`flex flex-1 flex-col items-center rounded-lg py-2 transition-colors ${
              d.active
                ? "bg-[#4361ee] text-white"
                : "text-gray-400 hover:bg-gray-50"
            }`}
          >
            <span className="text-[9px]">{d.day}</span>
            <span className="text-[11px] font-semibold">{d.date}</span>
          </button>
        ))}
      </div>

      <div className="mb-4 flex gap-4 overflow-x-auto border-b border-gray-100 text-xs">
        <span className="shrink-0 border-b-2 border-[#4361ee] pb-2 font-semibold text-[#4361ee]">
          History
        </span>
        <span className="shrink-0 pb-2 text-gray-400">Status</span>
        <span className="shrink-0 pb-2 text-gray-400">Follow-up</span>
      </div>

      <div className="flex flex-col gap-3 lg:flex-1 lg:overflow-auto">
        {meetings.map((m) => (
          <div
            key={m.name}
            className={`rounded-xl border p-3.5 ${
              m.status === "Pending"
                ? "border-red-100 bg-red-50/60"
                : "border-gray-100 bg-white"
            }`}
          >
            <p className="text-xs font-semibold text-gray-800">Meeting with {m.name}</p>
            <p className="mt-0.5 text-[10px] text-gray-400">{m.time}</p>
            <div className="mt-2.5 flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <div className="flex -space-x-2 shrink-0">
                  <PersonPhoto className="size-6 rounded-full border-2 border-white" />
                  <PersonPhoto className="size-6 rounded-full border-2 border-white" />
                  <div className="flex size-6 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-[8px] font-semibold text-gray-500">
                    +2
                  </div>
                </div>
                <span className="flex items-center gap-1 truncate text-[10px] text-gray-500">
                  <m.icon className="size-3 shrink-0" />
                  {m.platform}
                </span>
              </div>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  m.status === "Confirmed"
                    ? "bg-green-50 text-green-600"
                    : "bg-amber-50 text-amber-600"
                }`}
              >
                {m.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
