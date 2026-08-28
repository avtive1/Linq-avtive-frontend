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
        <span
          className={`${iconClass} rounded-full bg-[#1877F2] text-white`}
        >
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
        <span
          className={`${iconClass} rounded-full bg-black text-white`}
        >
          X
        </span>
      )

    case "linkedin":
      return (
        <span
          className={`${iconClass} rounded bg-[#0A66C2] text-white`}
        >
          in
        </span>
      )

    case "behance":
      return (
        <span
          className={`${iconClass} rounded bg-[#1769FF] text-white`}
        >
          Be
        </span>
      )

    case "pinterest":
      return (
        <span
          className={`${iconClass} rounded-full bg-[#E60023] text-white`}
        >
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
    <div className="w-full max-w-[367px] overflow-hidden rounded-[10px] border border-gray-200 bg-[#f5f5f5] shadow-lg">
      {/* ================= HERO / COVER ================= */}

      <div className="relative h-[230px] w-full overflow-visible bg-gray-900">
        <img
          src={coverImage || "/cardw.jpeg"}
          alt="Cover"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* ================= MAIN WHITE PANEL ================= */}

      <div className="relative min-h-[455px] bg-[#f8f8f8] px-5 pb-5 pt-[24px]">
        {/* WHITE PROFILE AREA */}

        <div className="relative min-h-[390px] rounded-[12px] bg-[#f7f7f7] px-5 pb-5 pt-[30px] shadow-[0_0_20px_rgba(0,0,0,0.04)]">
          {/* ================= PROFILE IMAGE ================= */}

          <div className="absolute -top-[22px] right-[7px] h-[228px] w-[170px] overflow-hidden rounded-[6px] border-[6px] border-[#f7f7f7] bg-gray-200 shadow-sm">
            {profileImage ? (
              <img
                src={profileImage}
                alt={name || "Profile"}
                className="h-full w-full object-cover object-center"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200 text-center text-[11px] text-gray-400">
                Profile
                <br />
                Photo
              </div>
            )}
          </div>

          {/* ================= NAME + TITLE ================= */}

          <div className="min-h-[215px] pr-[155px]">
            <h2 className="break-words pt-2 text-[19px] font-bold leading-[1.2] text-[#252b33]">
              {name || "YOUR NAME"}
            </h2>

            <p className="mt-3 text-[10px] leading-relaxed text-[#667085]">
              {title || "Your Title"}
            </p>
          </div>

          {/* ================= ACTION BUTTONS ================= */}

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              className="flex h-[48px] items-center justify-center gap-2 rounded-[5px] border border-gray-100 bg-white px-2 text-[9px] font-medium text-[#30343b] shadow-sm transition hover:bg-gray-50"
            >
              <Download className="size-[14px]" />
              <span>Save Contact</span>
            </button>

            <button
              type="button"
              className="flex h-[48px] items-center justify-center gap-2 rounded-[5px] border border-gray-100 bg-white px-2 text-[9px] font-medium text-[#30343b] shadow-sm transition hover:bg-gray-50"
            >
              <ArrowLeftRight className="size-[14px]" />
              <span>Exchange Contact</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= ABOUT ================= */}

      <section className="border-t border-gray-200 bg-white px-5 py-4">
        <h5 className="mb-2 text-[12px] font-semibold text-[#20242b]">
          About
        </h5>

        <p className="text-[9px] leading-[1.7] text-[#667085]">
          {about || "Your about information will appear here."}
        </p>
      </section>

      {/* ================= SOCIAL ================= */}

      {socialLinks.length > 0 && (
        <section className="border-t border-gray-200 bg-white px-5 py-4">
          <h5 className="mb-3 text-[12px] font-semibold text-[#20242b]">
            Social
          </h5>

          <div className="flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={getSocialUrl(
                  link.platform,
                  link.username,
                )}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.platform}
                className="flex size-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:scale-105"
              >
                {getSocialIcon(link.platform)}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* ================= PORTFOLIO ================= */}

      {validPortfolioLinks.length > 0 && (
        <section className="border-t border-gray-200 bg-white px-5 py-4">
          <h5 className="mb-3 text-[12px] font-semibold text-[#20242b]">
            Portfolio
          </h5>

          <div className="grid grid-cols-3 gap-2">
            {validPortfolioLinks
              .slice(0, 3)
              .map((link) => (
                <a
                  key={link.id}
                  href={getPortfolioUrl(link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-[68px] overflow-hidden rounded-md border border-gray-200 bg-gray-100 shadow-sm"
                >
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-800 to-gray-500 px-2 text-center">
                    <span className="line-clamp-2 text-[8px] font-medium text-white">
                      {link.platform}
                    </span>
                  </div>
                </a>
              ))}
          </div>

          {validPortfolioLinks.length > 3 && (
            <div className="mt-3 flex flex-wrap gap-3">
              {validPortfolioLinks
                .slice(3, 6)
                .map((link) => (
                  <a
                    key={link.id}
                    href={getPortfolioUrl(link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.platform} portfolio`}
                    className="flex size-8 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white p-1.5 shadow-sm transition hover:scale-105"
                  >
                    <img
                      src={getPortfolioFavicon(
                        link.platform,
                      )}
                      alt={`${link.platform} icon`}
                      className="size-full object-contain"
                    />
                  </a>
                ))}
            </div>
          )}
        </section>
      )}

      {/* ================= SERVICES ================= */}

      {services.length > 0 && (
        <section className="border-t border-gray-200 bg-white px-5 py-4">
          <h5 className="mb-3 text-[12px] font-semibold text-[#20242b]">
            Services
          </h5>

          <div className="grid grid-cols-3 gap-2">
            {services.slice(0, 3).map((service) => (
              <div
                key={service}
                className="min-h-[64px] rounded-lg border border-gray-100 bg-[#fafafa] p-2.5 shadow-sm"
              >
                <div className="mb-2 flex size-5 items-center justify-center rounded-full bg-[#1f2937] text-[9px] text-white">
                  •
                </div>

                <p className="line-clamp-2 text-[8px] font-medium leading-relaxed text-[#4b5563]">
                  {service}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= SKILLS ================= */}

      {visibleSkills.length > 0 && (
        <section className="border-t border-gray-200 bg-white px-5 py-4">
          <h5 className="mb-3 text-[12px] font-semibold text-[#20242b]">
            Skills
          </h5>

          <div className="flex flex-wrap gap-2">
            {visibleSkills.map((skill) => (
              <span
                key={skill.id}
                className={
                  skill.featured
                    ? "rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[8px] font-medium text-emerald-700"
                    : "rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[8px] font-medium text-[#667085]"
                }
              >
                {skill.featured ? "★ " : ""}
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ================= COVER LETTER ================= */}

      {coverLetter.trim() && (
        <section className="border-t border-gray-200 bg-white px-5 py-4">
          <h5 className="mb-2 text-[12px] font-semibold text-[#20242b]">
            Cover Letter
          </h5>

          <p className="text-[9px] leading-[1.7] text-[#667085]">
            {coverLetter}
          </p>
        </section>
      )}

      {/* ================= CONTACT INFO ================= */}

      <section className="border-t border-gray-200 bg-white px-5 py-4">
        <h5 className="mb-3 text-[12px] font-semibold text-[#20242b]">
          Contact Info
        </h5>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Mail className="size-[13px] shrink-0 text-gray-400" />

            <span className="break-all text-[9px] text-[#667085]">
              {contactEmail || "No email added"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="size-[13px] shrink-0 text-gray-400" />

            <span className="text-[9px] text-[#667085]">
              {contactPhone
                ? `${contactCountryCode} ${contactPhone}`
                : "No phone added"}
            </span>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="mt-[1px] size-[13px] shrink-0 text-gray-400" />

            <span className="text-[9px] leading-relaxed text-[#667085]">
              {contactAddress || "No address added"}
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}