import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"

export function VCardWidget() {
  return (
    <div className="flex min-w-0 flex-col rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800">V-Card</h3>
        <a href="#" className="text-xs font-medium text-[#4361ee] hover:underline">
          See More &gt;
        </a>
      </div>

      <div className="mb-4 flex gap-0 rounded-lg border border-gray-100 bg-gray-50 p-0.5">
        {["Profile", "Invite", "Share"].map((tab) => (
          <button
            key={tab}
            type="button"
            className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-colors ${
              tab === "Profile"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-1 flex-col items-center justify-center py-4 text-center">
        <div className="mb-3 size-24 rounded-full bg-pink-200" />
        <p className="text-sm font-semibold text-gray-800">Syed Mesum Raza</p>
        <p className="mt-0.5 text-xs text-gray-500">Founder, Avtive</p>
      </div>

      <Button
        variant="outline"
        className="mt-2 w-full gap-1.5 rounded-lg border-[#4361ee]/20 bg-[#4361ee]/5 text-xs font-medium text-[#4361ee] hover:bg-[#4361ee]/10"
      >
        <Pencil className="size-3.5" />
        Edit Your Profile
      </Button>
    </div>
  )
}
