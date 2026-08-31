"use client"

import {
  ArrowLeftRight,
  Download,
  Mail,
  MapPin,
  Phone,
} from "lucide-react"

import type {
  PortfolioLink,
  SkillItem,
  SocialLink,
  SocialPlatformKey,
} from "./card-types"

type BasicCardProps = {
  coverImage: string | null
  profileImage: string | null
  name: string
  title: string
  about: string
  contactEmail: string
  contactPhone: string
  contactCountryCode: string
  contactAddress: string
  companyName?: string
  companyWebsite?: string
  companyDescription?: string
  officialContactEmail?: string
  officialContactPhone?: string
  officialContactAddress?: string
  officialSocialLinks?: SocialLink[]
  socialLinks?: SocialLink[]
  portfolioLinks?: PortfolioLink[]
  services?: string[]
  skills?: SkillItem[]
  coverLetter?: string
}

function getSocialIcon(platform: SocialPlatformKey) {
  const iconClass =
    "flex size-7 shrink-0 items-center justify-center text-[11px] font-bold"

  switch (platform) {
    case "facebook":
      return (
        <span className={`${iconClass} rounded-full bg-[#1877F2] text-white`}>
          f
        </span>
      )

    case "instagram":
      return (
        <span
          className={`${iconClass} rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white`}
        >
          ◎
        </span>
      )

    case "twitter":
      return (
        <span className={`${iconClass} rounded-full bg-black text-white`}>
          X
        </span>
      )

    case "linkedin":
      return (
        <span className={`${iconClass} rounded bg-[#0A66C2] text-white`}>
          in
        </span>
      )

    case "behance":
      return (
        <span className={`${iconClass} rounded bg-[#1769FF] text-white`}>
          Be
        </span>
      )

    case "pinterest":
      return (
        <span className={`${iconClass} rounded-full bg-[#E60023] text-white`}>
          P
        </span>
      )

    case "snapchat":
      return (
        <span
          className={`${iconClass} rounded-full bg-[#FFFC00] text-black`}
        >
          S
        </span>
      )

    default:
      return null
  }
}

function getSocialUrl(
  platform: SocialPlatformKey,
  username: string,
) {
  const value = username.trim()

  if (!value) return "#"

  if (/^https?:\/\//i.test(value)) {
    return value
  }

  if (/^www\./i.test(value)) {
    return `https://${value}`
  }

  const cleanUsername = value
    .replace(/^@/, "")
    .replace(/^https?:\/\/(www\.)?/i, "")
    .replace(/\/+$/, "")

  switch (platform) {
    case "facebook":
      return `https://www.facebook.com/${cleanUsername}`
    case "instagram":
      return `https://www.instagram.com/${cleanUsername}`
    case "twitter":
      return `https://x.com/${cleanUsername}`
    case "linkedin":
      return `https://www.linkedin.com/in/${cleanUsername}`
    case "behance":
      return `https://www.behance.net/${cleanUsername}`
    case "pinterest":
      return `https://www.pinterest.com/${cleanUsername}`
    case "snapchat":
      return `https://www.snapchat.com/add/${cleanUsername}`
    default:
      return "#"
  }
}

function getPortfolioUrl(link: PortfolioLink) {
  const username = link.username.trim()

  if (!username) return "#"

  if (/^https?:\/\//i.test(username)) {
    return username
  }

  const platform = link.platform
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\/$/, "")

  const cleanUsername = username
    .replace(/^@/, "")
    .replace(/^\/+/, "")
    .replace(/\/+$/, "")

  return `https://${platform}/${cleanUsername}`
}

function getPortfolioFavicon(platform: string) {
  const cleanPlatform = platform
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\/$/, "")

  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
    cleanPlatform,
  )}&sz=128`
}

export function BasicCard({
  coverImage,
  profileImage,
  name,
  title,
  about,
  contactEmail,
  contactPhone,
  contactCountryCode,
  contactAddress,
  companyName = "",
  companyWebsite = "",
  companyDescription = "",
  officialContactEmail = "",
  officialContactPhone = "",
  officialContactAddress = "",
  officialSocialLinks = [],
  socialLinks = [],
  portfolioLinks = [],
  services = [],
  skills = [],
  coverLetter = "",
}: BasicCardProps) {
  const featuredSkills = skills.filter(
    (skill) => skill.featured,
  )

  const normalSkills = skills.filter(
    (skill) => !skill.featured,
  )

  const visibleSkills = [
    ...featuredSkills,
    ...normalSkills,
  ].slice(0, 8)

  const validPortfolioLinks = portfolioLinks
    .filter(
      (link) =>
        link.platform.trim() &&
        link.username.trim(),
    )
    .slice(0, 6)

  return (
    <div className="w-[367px] min-w-[367px] max-w-[367px] shrink-0 overflow-hidden rounded-[10px] border border-gray-200 bg-[#f5f5f5] shadow-lg">

      {/* ================= COVER ================= */}
      <div className="relative h-[230px] w-full overflow-hidden bg-gray-900">
        <img
          src={coverImage || "/cardb.png"}
          alt="Cover"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* ================= MAIN PANEL ================= */}
      {/* Panel starts over the lower part of the cover */}
      <div className="relative z-10 -mt-[128px] px-5 pb-5">
        <div className="relative min-h-[500px] rounded-[32px] border border-white/70 bg-white/95 px-5 pt-[22px] pb-8 shadow-[0_12px_35px_rgba(15,23,42,0.12)]">

          {/* ================= PROFILE IMAGE ================= */}
          {/* The uploaded profile image stays INSIDE the white panel */}
          <div className="flex justify-center">
            <div className="relative z-20 h-[145px] w-[145px] shrink-0 overflow-hidden rounded-full border-[5px] border-white bg-gray-200 shadow-[0_8px_25px_rgba(0,0,0,0.12)]">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={name || "Profile"}
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-center text-[11px] leading-relaxed text-gray-400">
                  Profile
                  <br />
                  Photo
                </div>
              )}
            </div>
          </div>

          {/* ================= BUTTONS ================= */}
          <div className="mt-6 grid grid-cols-2 gap-2">
            <button
              type="button"
              className="flex h-[48px] min-w-0 items-center justify-center gap-2 rounded-[12px] border border-gray-100 bg-[#f7f7f7] px-2 text-[9px] font-medium text-[#30343b] shadow-sm"
            >
              <Download className="size-[14px] shrink-0" />
              <span className="whitespace-nowrap">Save Contact</span>
            </button>

            <button
              type="button"
              className="flex h-[48px] min-w-0 items-center justify-center gap-2 rounded-[12px] border border-gray-100 bg-[#f7f7f7] px-2 text-[9px] font-medium text-[#30343b] shadow-sm"
            >
              <ArrowLeftRight className="size-[14px] shrink-0" />
              <span className="whitespace-nowrap">Exchange Contact</span>
            </button>
          </div>

          {/* ================= NAME + TITLE ================= */}
          <div className="mt-10 text-center">
            <h2 className="break-words text-[19px] font-bold leading-[1.2] text-[#252b33]">
              {name || "Your Name"}
            </h2>

            <p className="mt-2 break-words text-[10px] leading-[1.4] text-[#667085]">
              {title || "Your Title"}
            </p>
          </div>
        </div>
      </div>

      {/* ================= ABOUT ================= */}
      <section className="border-t border-gray-200 bg-white px-5 py-4">
        <h5 className="mb-3 text-[12px] font-semibold text-[#20242b]">About</h5>
        <p className="text-[9px] leading-[1.7] text-[#667085]">{about || "Your about information will appear here."}</p>
      </section>

      {/* ================= COMPANY OVERVIEW ================= */}
      <section className="border-t border-gray-200 bg-white px-5 py-4">
        <h5 className="mb-3 text-[12px] font-semibold text-[#20242b]">Company Overview</h5>
        <p className="text-[9px] leading-[1.7] text-[#667085]">{companyDescription || (companyName ? `${companyName} is a modern digital business focused on creating meaningful connections and opportunities.` : "Your company overview will appear here.")}{companyWebsite && <> {" "}<a href={companyWebsite.startsWith("http") ? companyWebsite : `https://${companyWebsite}`} target="_blank" rel="noopener noreferrer" className="underline">Visit website</a></>}</p>
      </section>

      {/* ================= CONTACT INFO ================= */}
      <section className="border-t border-gray-200 bg-white px-5 py-4">
        <h5 className="mb-4 text-[12px] font-semibold text-[#20242b]">Contact Info</h5>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3"><Mail className="size-[15px] shrink-0 text-gray-400" /><span className="break-all text-[11px] text-[#667085]">{contactEmail || "No email added"}</span></div>
          <div className="flex items-center gap-3"><Phone className="size-[15px] shrink-0 text-gray-400" /><span className="text-[11px] text-[#667085]">{contactPhone ? `${contactCountryCode} ${contactPhone}` : "No phone added"}</span></div>
          <div className="flex items-start gap-3"><MapPin className="mt-[1px] size-[15px] shrink-0 text-gray-400" /><span className="text-[11px] leading-relaxed text-[#667085]">{contactAddress || "No address added"}</span></div>
        </div>
      </section>

      {/* ================= OFFICIAL CONTACT INFO ================= */}
      <section className="border-t border-gray-200 bg-white px-5 py-4">
        <h5 className="mb-4 text-[12px] font-semibold text-[#20242b]">Official Contact Info</h5>
        <div className="flex flex-col gap-3">
          {officialContactEmail && <div className="flex items-center gap-3"><Mail className="size-[15px] shrink-0 text-gray-400" /><span className="break-all text-[11px] text-[#667085]">{officialContactEmail}</span></div>}
          {officialContactPhone && <div className="flex items-center gap-3"><Phone className="size-[15px] shrink-0 text-gray-400" /><span className="text-[11px] text-[#667085]">{officialContactPhone}</span></div>}
          {officialContactAddress && <div className="flex items-start gap-3"><MapPin className="mt-[1px] size-[15px] shrink-0 text-gray-400" /><span className="text-[11px] leading-relaxed text-[#667085]">{officialContactAddress}</span></div>}
          {!officialContactEmail && !officialContactPhone && !officialContactAddress && <p className="text-[11px] text-gray-400">No official contact information added yet.</p>}
        </div>
      </section>

      {/* ================= SOCIAL ================= */}
      {socialLinks.length > 0 && <section className="border-t border-gray-200 bg-white px-5 py-4"><h5 className="mb-3 text-[12px] font-semibold text-[#20242b]">Social</h5><div className="flex flex-wrap gap-3">{socialLinks.map((link) => <a key={link.platform} href={getSocialUrl(link.platform, link.username)} target="_blank" rel="noopener noreferrer" aria-label={link.platform} className="flex size-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm">{getSocialIcon(link.platform)}</a>)}</div></section>}

      {/* ================= OFFICIAL SOCIAL ================= */}
      {officialSocialLinks.length > 0 && <section className="border-t border-gray-200 bg-white px-5 py-4"><h5 className="mb-3 text-[12px] font-semibold text-[#20242b]">Official Social</h5><div className="flex flex-wrap gap-3">{officialSocialLinks.map((link) => <a key={link.platform} href={getSocialUrl(link.platform, link.username)} target="_blank" rel="noopener noreferrer" aria-label={link.platform} className="flex size-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm">{getSocialIcon(link.platform)}</a>)}</div></section>}

      {/* ================= PORTFOLIO ================= */}
      {validPortfolioLinks.length > 0 && <section className="border-t border-gray-200 bg-white px-5 py-4"><h5 className="mb-3 text-[12px] font-semibold text-[#20242b]">Portfolio</h5><div className="grid grid-cols-3 gap-3">{validPortfolioLinks.slice(0,3).map((link) => <a key={link.id} href={getPortfolioUrl(link)} target="_blank" rel="noopener noreferrer" className="flex h-[68px] items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-100"><span className="text-[9px] font-medium text-[#667085]">{link.platform}</span></a>)}</div></section>}

      {/* ================= SERVICES ================= */}
      {services.length > 0 && <section className="border-t border-gray-200 bg-white px-5 py-4"><h5 className="mb-3 text-[12px] font-semibold text-[#20242b]">Services</h5><div className="flex flex-wrap gap-2">{services.map((service) => <span key={service} className="rounded-full bg-[#eef2ff] px-3 py-1.5 text-[10px] font-medium text-[#4361ee]">{service}</span>)}</div></section>}

      {/* ================= SKILLS ================= */}
      {visibleSkills.length > 0 && <section className="border-t border-gray-200 bg-white px-5 py-4"><h5 className="mb-3 text-[12px] font-semibold text-[#20242b]">Skills</h5><div className="flex flex-wrap gap-2">{visibleSkills.map((skill) => <span key={skill.id} className={skill.featured ? "rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-medium text-emerald-700" : "rounded-full bg-gray-100 px-3 py-1.5 text-[10px] font-medium text-gray-600"}>{skill.featured ? "★ " : ""}{skill.name}</span>)}</div></section>}

      {/* ================= COVER LETTER ================= */}
      {coverLetter.trim() && <section className="border-t border-gray-200 bg-white px-5 py-4"><h5 className="mb-3 text-[12px] font-semibold text-[#20242b]">Cover Letter</h5><p className="text-[9px] leading-[1.7] text-[#667085]">{coverLetter}</p></section>}

    </div>
  )
}
