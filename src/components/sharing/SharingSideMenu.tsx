import Link from "next/link"
import { BadgeCheck, ImageIcon, Mail, QrCode, type LucideIcon } from "lucide-react"

export type SharingMenuKey =
  | "qr-code"
  | "create-badge"
  | "virtual-background"
  | "email-signature"

const menuItems: {
  key: SharingMenuKey
  icon: LucideIcon
  label: string
  href: string
}[] = [
  { key: "qr-code", icon: QrCode, label: "Generate QR Code", href: "/sharing/qr-code" },
  { key: "create-badge", icon: BadgeCheck, label: "Create Event Badge", href: "/sharing/create-badge" },
  { key: "virtual-background", icon: ImageIcon, label: "Virtual Background", href: "/sharing/virtual-background" },
  { key: "email-signature", icon: Mail, label: "Email Signature", href: "/sharing/email-signature" },
]

type SharingSideMenuProps = {
  active: SharingMenuKey
}

export function SharingSideMenu({ active }: SharingSideMenuProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
        Select Menu
      </p>
      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              active === item.key
                ? "bg-blue-50 font-medium text-[#4361ee]"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <item.icon className="size-4 shrink-0" />
            <span className="truncate">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
