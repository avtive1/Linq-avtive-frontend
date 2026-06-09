import { CreditCard, ArrowRight, Wifi } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function MyCardsWidget() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CreditCard className="size-4 text-gray-400" />
          <h3 className="text-sm font-semibold text-gray-800">My Cards</h3>
        </div>
        <Button
          size="sm"
          className="h-7 rounded-md bg-[#4361ee] px-3 text-[11px] font-medium text-white hover:bg-[#3a56d4]"
        >
          + Upgrade
        </Button>
      </div>

      <div className="rounded-xl border border-gray-100 bg-[#F9FAFB] p-4">
        <div className="mb-3 flex items-center justify-between">
          <Image src="/avtive.png" alt="Avtive" width={72} height={24} className="h-5 w-auto" />
          <Wifi className="size-4 text-gray-300" />
        </div>
        <p className="text-sm font-semibold text-gray-800">Syed Mesum Raza</p>
        <div className="mt-1 flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-green-500" />
          <span className="text-[11px] font-medium text-gray-500">Active</span>
        </div>
      </div>

      <div className="mt-3 flex gap-1 rounded-lg bg-gray-100 p-1">
        {["Daily", "Weekly", "Monthly"].map((tab) => (
          <button
            key={tab}
            type="button"
            className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-colors ${
              tab === "Weekly"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3 border-t border-gray-50 pt-4">
        <div className="relative flex size-14 items-center justify-center">
          <svg className="size-14 -rotate-90" viewBox="0 0 36 36" aria-hidden>
            <circle cx="18" cy="18" r="15.5" fill="none" stroke="#E5E7EB" strokeWidth="2.5" />
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="#4361ee"
              strokeWidth="2.5"
              strokeDasharray="97.4"
              strokeDashoffset="25"
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute text-[10px] font-bold text-gray-800">20</span>
        </div>
        <div>
          <p className="text-xs text-gray-500">Connection</p>
          <p className="text-sm font-semibold text-gray-800">
            20 <span className="text-xs font-normal text-gray-400">/ week</span>
          </p>
        </div>
        <button
          type="button"
          className="ml-auto flex size-8 items-center justify-center rounded-full border border-gray-100 text-gray-400 hover:bg-gray-50"
          aria-label="View connections"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  )
}
