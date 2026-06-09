import SharingIcon from "@/assets/share.svg"
import CardScanner from "@/assets/card.svg"
import SmartNotes from "@/assets/notes.svg"
import Chatbot from "@/assets/chat.svg"
import AutoReminderIcon from "@/assets/noti.svg"
import LinkedAccountsIcon from "@/assets/linked.svg"

const toolItems = [
  { label: "Effortless Sharing", Icon: SharingIcon },
  { label: "Smart Notes", Icon: SmartNotes },
  { label: "Card Scanner", Icon: CardScanner },
  { label: "Chatbot", Icon: Chatbot },
  { label: "Auto-Reminder", Icon: AutoReminderIcon },
  { label: "Linked Accounts", Icon: LinkedAccountsIcon },
]

export function FeatureGrid() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {toolItems.map((tool) => (
        <button
          key={tool.label}
          type="button"
          className="flex flex-col items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex size-16 items-center justify-center">
            <tool.Icon className="h-14 w-14" />
          </div>
          <span className="text-center text-sm font-medium text-gray-700">{tool.label}</span>
        </button>
      ))}
    </div>
  )
}
