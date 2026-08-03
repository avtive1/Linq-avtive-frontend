"use client"

type SettingsTopTabKey = "general" | "profile" | "company" | "sharing" | "leads"

const tabClass = "whitespace-nowrap pb-2 text-gray-400"
const activeTabClass = "whitespace-nowrap border-b-2 border-[#4361ee] pb-2 font-medium text-[#4361ee]"

export function renderSettingsTopTabs(activeTab: SettingsTopTabKey) {
  return (
    <>
      <a href="/settings" className={activeTab === "general" ? activeTabClass : tabClass}>
        General Settings
      </a>
      <a href="/settings/profile" className={activeTab === "profile" ? activeTabClass : tabClass}>
        Profile Settings
      </a>
      <a href="/settings/company" className={activeTab === "company" ? activeTabClass : tabClass}>
        Company Settings
      </a>
      <a href="/sharing/qr-code" className={activeTab === "sharing" ? activeTabClass : tabClass}>
        Sharing
      </a>
      <a href="/leads-follow-up" className={activeTab === "leads" ? activeTabClass : tabClass}>
        Leads Follow up
      </a>
    </>
  )
}
