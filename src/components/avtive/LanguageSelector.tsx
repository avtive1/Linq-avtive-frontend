import { Globe } from "lucide-react"

export function LanguageSelector() {
  return (
    <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors">
      <Globe className="size-4" />
      <span>ENG</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  )
}
