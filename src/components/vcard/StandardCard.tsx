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

type StandardCardProps = {
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

export function StandardCard({
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
}: StandardCardProps) {
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
    <div className="w-[367px] min-w-[367px] max-w-[367px] shrink-0 overflow-hidden rounded-[26px] border border-[#d9dde3] bg-[#f7f7f7] shadow-[0_12px_35px_rgba(15,23,42,0.16)]">

      {/* ================= COVER ================= */}

      <div className="relative h-[540px] w-full overflow-visible bg-[#dfe5ec]">

        {/* USER UPLOADABLE BACKGROUND */}

        <img
          src={coverImage || "/Cardst.jpeg"}
          alt="Cover"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-white/10" />

        {/* ================= WHITE PANEL ================= */}

        <div className="absolute left-[4%] right-[5%] top-[210px] z-10">

         <div className="relative h-[360px] w-full max-w-[380px] overflow-visible rounded-[12px] border border-white/70 bg-white/95 px-6 pb-6 pt-[50px] shadow-[0_8px_24px_rgba(15,23,42,0.12)] backdrop-blur-sm">

            {/* ================= NAME + TITLE + PHOTO ================= */}

            <div className="relative min-h-[214px] w-full">

              {/* NAME / TITLE */}
              {/* LEFT SIDE OF PHOTO */}

              <div className="flex h-[214px] w-[calc(100%-160px)] min-w-0 flex-col justify-center pr-3">

                <h2 className="w-full break-normal text-left text-[24px] font-bold leading-[1.15] text-[#252b33]">
                  {name || "Your Name"}
                </h2>

                <p className="mt-2 break-words text-left text-[13px] leading-[1.4] text-[#667085]">
                  {title || "Your Title"}
                </p>

              </div>

              {/* ================= PROFILE ================= */}
              {/* STANDARD = ROUNDED SQUARE */}
              {/* NOT CIRCLE */}

              <div className="absolute right-[-10px] top-0 h-[200px] w-[165px] overflow-hidden rounded-[12px] border-4 border-white bg-gray-100 shadow-[0_8px_25px_rgba(0,0,0,0.12)]">

                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={name || "Profile"}
                    className="h-full w-full object-cover object-center"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-center text-xs text-gray-400">
                    Profile
                    <br />
                    Photo
                  </div>
                )}

              </div>

            </div>

            {/* ================= BUTTONS ================= */}

            <div className="mt-7 grid grid-cols-2 gap-3">

              <button
                type="button"
                className="flex h-[54px] min-w-0 items-center justify-center gap-2 rounded-xl border border-[#e5e7eb] bg-[#f7f7f7] px-2 text-[12px] font-medium text-[#30343b] shadow-sm"
              >
                <Download className="size-[17px] shrink-0" />
                <span>Save Contact</span>
              </button>

              <button
                type="button"
                className="flex h-[54px] min-w-0 items-center justify-center gap-2 rounded-xl border border-[#e5e7eb] bg-[#f7f7f7] px-2 text-[12px] font-medium text-[#30343b] shadow-sm"
              >
                <ArrowLeftRight className="size-[17px] shrink-0" />
                <span>Exchange Contact</span>
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* ================= SPACING ================= */}

      <div className="h-[45px] bg-[#f7f7f7]" />

      {/* ================= ABOUT ================= */}
      <section className="border-t border-gray-200 bg-white px-6 py-5">
        <h5 className="mb-3 text-[15px] font-semibold text-[#20242b]">About</h5>
        <p className="text-[12px] leading-[1.8] text-[#667085]">{about || "Your about information will appear here."}</p>
      </section>

      {/* ================= COMPANY OVERVIEW ================= */}
      <section className="border-t border-gray-200 bg-white px-6 py-5">
        <h5 className="mb-3 text-[15px] font-semibold text-[#20242b]">Company Overview</h5>
        <p className="text-[12px] leading-[1.8] text-[#667085]">{companyDescription || (companyName ? `${companyName} is a modern digital business focused on creating meaningful connections and opportunities.` : "Your company overview will appear here.")}{companyWebsite && <> {" "}<a href={companyWebsite.startsWith("http") ? companyWebsite : `https://${companyWebsite}`} target="_blank" rel="noopener noreferrer" className="underline">Visit website</a></>}</p>
      </section>

      {/* ================= CONTACT INFO ================= */}
      <section className="border-t border-gray-200 bg-white px-6 py-5">
        <h5 className="mb-4 text-[15px] font-semibold text-[#20242b]">Contact Info</h5>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3"><Mail className="size-[15px] shrink-0 text-gray-400" /><span className="break-all text-[11px] text-[#667085]">{contactEmail || "No email added"}</span></div>
          <div className="flex items-center gap-3"><Phone className="size-[15px] shrink-0 text-gray-400" /><span className="text-[11px] text-[#667085]">{contactPhone ? `${contactCountryCode} ${contactPhone}` : "No phone added"}</span></div>
          <div className="flex items-start gap-3"><MapPin className="mt-[1px] size-[15px] shrink-0 text-gray-400" /><span className="text-[11px] leading-relaxed text-[#667085]">{contactAddress || "No address added"}</span></div>
        </div>
      </section>

      {/* ================= OFFICIAL CONTACT INFO ================= */}
      <section className="border-t border-gray-200 bg-white px-6 py-5">
        <h5 className="mb-4 text-[15px] font-semibold text-[#20242b]">Official Contact Info</h5>
        <div className="flex flex-col gap-3">
          {officialContactEmail && <div className="flex items-center gap-3"><Mail className="size-[15px] shrink-0 text-gray-400" /><span className="break-all text-[11px] text-[#667085]">{officialContactEmail}</span></div>}
          {officialContactPhone && <div className="flex items-center gap-3"><Phone className="size-[15px] shrink-0 text-gray-400" /><span className="text-[11px] text-[#667085]">{officialContactPhone}</span></div>}
          {officialContactAddress && <div className="flex items-start gap-3"><MapPin className="mt-[1px] size-[15px] shrink-0 text-gray-400" /><span className="text-[11px] leading-relaxed text-[#667085]">{officialContactAddress}</span></div>}
          {!officialContactEmail && !officialContactPhone && !officialContactAddress && <p className="text-[11px] text-gray-400">No official contact information added yet.</p>}
        </div>
      </section>

      {/* ================= SOCIAL ================= */}
      {socialLinks.length > 0 && <section className="border-t border-gray-200 bg-white px-6 py-5"><h5 className="mb-3 text-[15px] font-semibold text-[#20242b]">Social</h5><div className="flex flex-wrap gap-3">{socialLinks.map((link) => <a key={link.platform} href={getSocialUrl(link.platform, link.username)} target="_blank" rel="noopener noreferrer" aria-label={link.platform} className="flex size-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm">{getSocialIcon(link.platform)}</a>)}</div></section>}

      {/* ================= OFFICIAL SOCIAL ================= */}
      {officialSocialLinks.length > 0 && <section className="border-t border-gray-200 bg-white px-6 py-5"><h5 className="mb-3 text-[15px] font-semibold text-[#20242b]">Official Social</h5><div className="flex flex-wrap gap-3">{officialSocialLinks.map((link) => <a key={link.platform} href={getSocialUrl(link.platform, link.username)} target="_blank" rel="noopener noreferrer" aria-label={link.platform} className="flex size-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm">{getSocialIcon(link.platform)}</a>)}</div></section>}

      {/* ================= PORTFOLIO ================= */}
      {validPortfolioLinks.length > 0 && <section className="border-t border-gray-200 bg-white px-6 py-5"><h5 className="mb-3 text-[15px] font-semibold text-[#20242b]">Portfolio</h5><div className="grid grid-cols-3 gap-3">{validPortfolioLinks.slice(0,3).map((link) => <a key={link.id} href={getPortfolioUrl(link)} target="_blank" rel="noopener noreferrer" className="flex h-[68px] items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-100"><span className="text-[9px] font-medium text-[#667085]">{link.platform}</span></a>)}</div></section>}

      {/* ================= SERVICES ================= */}
      {services.length > 0 && <section className="border-t border-gray-200 bg-white px-6 py-5"><h5 className="mb-3 text-[15px] font-semibold text-[#20242b]">Services</h5><div className="flex flex-wrap gap-2">{services.map((service) => <span key={service} className="rounded-full bg-[#eef2ff] px-3 py-1.5 text-[10px] font-medium text-[#4361ee]">{service}</span>)}</div></section>}

      {/* ================= SKILLS ================= */}
      {visibleSkills.length > 0 && <section className="border-t border-gray-200 bg-white px-6 py-5"><h5 className="mb-3 text-[15px] font-semibold text-[#20242b]">Skills</h5><div className="flex flex-wrap gap-2">{visibleSkills.map((skill) => <span key={skill.id} className={skill.featured ? "rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-medium text-emerald-700" : "rounded-full bg-gray-100 px-3 py-1.5 text-[10px] font-medium text-gray-600"}>{skill.featured ? "★ " : ""}{skill.name}</span>)}</div></section>}

      {/* ================= COVER LETTER ================= */}
      {coverLetter.trim() && <section className="border-t border-gray-200 bg-white px-6 py-5"><h5 className="mb-3 text-[15px] font-semibold text-[#20242b]">Cover Letter</h5><p className="text-[12px] leading-[1.8] text-[#667085]">{coverLetter}</p></section>}

    </div>
  )
}
