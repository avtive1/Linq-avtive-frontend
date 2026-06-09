import Image from "next/image"

export function AvtiveLogo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <Image
        src="/avtive.png"
        alt="Avtive logo icon"
        width={32}
        height={32}
        priority
        className="h-8 w-auto"
      />
      <span className="text-xl font-semibold tracking-tight text-gray-800">
        avtive
      </span>
    </div>
  )
}
