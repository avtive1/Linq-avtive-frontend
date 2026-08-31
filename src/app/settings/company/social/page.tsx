"use client"

import { useEffect, useState } from "react"
import {
  User,
  MapPin,
  Share2,
  Plus,
  Trash2,
  Save,
  Loader2,
  UserRound,
  Building2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ResponsiveAppShell } from "@/components/layout/ResponsiveAppShell"
import { renderSettingsTopTabs } from "@/components/layout/settingsTopTabs"
import { createClient } from "@/lib/supabase/client"
import { VCardPreview } from "@/components/vcard/vcardPreview"

import type {
  PortfolioLink,
  SkillItem,
  SocialLink,
} from "@/components/vcard/card-types"

type Link = {
  platform: string
  username: string
}

const platforms = [
  "facebook",
  "instagram",
  "twitter",
  "linkedin",
  "behance",
  "pinterest",
  "snapchat",
]

const menu = [
  {
    icon: User,
    label: "User Info",
    href: "/settings/company",
  },
  {
    icon: MapPin,
    label: "Contact Information",
    href: "/settings/company/contact",
  },
  {
    icon: Share2,
    label: "Social Links",
    href: "/settings/company/social",
    active: true,
  },
]

const supabase = createClient()

function makeId() {
  return Math.random().toString(36).slice(2, 10)
}

function normalizePortfolioLinks(
  value: unknown,
): PortfolioLink[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .filter(
      (item): item is Record<string, unknown> =>
        typeof item === "object" &&
        item !== null,
    )
    .map((item) => ({
      id:
        typeof item.id === "string"
          ? item.id
          : makeId(),

      platform:
        typeof item.platform === "string"
          ? item.platform
          : "",

      username:
        typeof item.username === "string"
          ? item.username
          : "",
    }))
}

function normalizeSkills(
  value: unknown,
): SkillItem[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .filter(
      (item): item is Record<string, unknown> =>
        typeof item === "object" &&
        item !== null,
    )
    .map((item) => ({
      id:
        typeof item.id === "string"
          ? item.id
          : makeId(),

      name:
        typeof item.name === "string"
          ? item.name
          : "",

      featured:
        item.featured === true,
    }))
    .filter((skill) => skill.name.trim())
}

function normalizeServices(
  value: unknown,
): string[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .filter(
      (item): item is string =>
        typeof item === "string",
    )
    .map((item) => item.trim())
    .filter(Boolean)
}

export default function CompanySocialLinksPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // =========================================================
  // PERSONAL PROFILE
  // =========================================================

  const [coverImage, setCoverImage] =
    useState<string | null>(null)

  const [profileImage, setProfileImage] =
    useState<string | null>(null)

  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [about, setAbout] = useState("")

  // =========================================================
  // PERSONAL CONTACT
  // =========================================================

  const [contactEmail, setContactEmail] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [contactCountryCode, setContactCountryCode] =
    useState("+92")
  const [contactAddress, setContactAddress] =
    useState("")

  // =========================================================
  // PERSONAL SOCIAL
  // =========================================================

  const [personalSocialLinks, setPersonalSocialLinks] =
    useState<Link[]>([])

  // =========================================================
  // EXPERTISE
  // =========================================================

  const [services, setServices] =
    useState<string[]>([])

  const [portfolioLinks, setPortfolioLinks] =
    useState<PortfolioLink[]>([])

  const [skills, setSkills] =
    useState<SkillItem[]>([])

  const [coverLetter, setCoverLetter] =
    useState("")

  // =========================================================
  // COMPANY
  // =========================================================

  const [companyName, setCompanyName] =
    useState("")

  const [website, setWebsite] =
    useState("")

  const [description, setDescription] =
    useState("")

  const [companyLogo, setCompanyLogo] =
    useState<string | null>(null)

  // =========================================================
  // OFFICIAL CONTACT
  // =========================================================

  const [officialEmail, setOfficialEmail] =
    useState("")

  const [officialPhone, setOfficialPhone] =
    useState("")

  const [officialAddress, setOfficialAddress] =
    useState("")

  // =========================================================
  // OFFICIAL COMPANY SOCIAL
  // =========================================================

  const [links, setLinks] =
    useState<Link[]>([])

  // =========================================================
  // LOAD EVERYTHING
  // =========================================================

  useEffect(() => {
    void load()
  }, [])

  async function load() {
    setLoading(true)

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError) {
        throw userError
      }

      if (!user) {
        return
      }

      const [
        { data: profile, error: profileError },
        {
          data: personalContact,
          error: personalContactError,
        },
        {
          data: personalSocial,
          error: personalSocialError,
        },
        {
          data: expertise,
          error: expertiseError,
        },
        {
          data: company,
          error: companyError,
        },
        {
          data: companyContact,
          error: companyContactError,
        },
        {
          data: companySocial,
          error: companySocialError,
        },
      ] = await Promise.all([
        // PERSONAL PROFILE
        supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle(),

        // PERSONAL CONTACT
        supabase
          .from("contact_information")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle(),

        // PERSONAL SOCIAL
        supabase
          .from("social_links")
          .select("platform, username")
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: true,
          }),

        // EXPERTISE
        supabase
          .from("profile_expertise_skills")
          .select(
            "services, portfolio_links, cover_letter, skills",
          )
          .eq("user_id", user.id)
          .maybeSingle(),

        // COMPANY PROFILE
        supabase
          .from("company_profiles")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle(),

        // OFFICIAL COMPANY CONTACT
        supabase
          .from("company_contacts")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle(),

        // OFFICIAL COMPANY SOCIAL
        supabase
          .from("company_social_links")
          .select("platform, username")
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: true,
          }),
      ])

      // =====================================================
      // ERRORS
      // =====================================================

      if (profileError) {
        console.error(
          "Profile load error:",
          profileError,
        )
      }

      if (personalContactError) {
        console.error(
          "Personal contact load error:",
          personalContactError,
        )
      }

      if (personalSocialError) {
        console.error(
          "Personal social load error:",
          personalSocialError,
        )
      }

      if (expertiseError) {
        console.error(
          "Expertise load error:",
          expertiseError,
        )
      }

      if (companyError) {
        console.error(
          "Company profile load error:",
          companyError,
        )
      }

      if (companyContactError) {
        console.error(
          "Company contacts load error:",
          companyContactError,
        )
      }

      if (companySocialError) {
        console.error(
          "Company links load error:",
          companySocialError,
        )
      }

      // =====================================================
      // PERSONAL PROFILE
      // =====================================================

      if (profile) {
        setCoverImage(
          profile.cover_url ?? null,
        )

        setProfileImage(
          profile.avatar_url ?? null,
        )

        setName(
          profile.name ??
            profile.full_name ??
            "",
        )

        setTitle(
          profile.title ?? "",
        )

        setAbout(
          profile.about ?? "",
        )
      }

      // =====================================================
      // PERSONAL CONTACT
      // =====================================================

      if (personalContact) {
        setContactEmail(
          personalContact.email ??
            personalContact.contact_email ??
            "",
        )

        setContactPhone(
          personalContact.phone ??
            personalContact.contact_phone ??
            "",
        )

        setContactCountryCode(
          personalContact.country_code ??
            personalContact.contact_country_code ??
            "+92",
        )

        setContactAddress(
          personalContact.address ??
            personalContact.contact_address ??
            "",
        )
      }

      // =====================================================
      // PERSONAL SOCIAL
      // =====================================================

      setPersonalSocialLinks(
        (personalSocial ?? [])
          .map((row) => ({
            platform: row.platform ?? "",
            username: row.username ?? "",
          }))
          .filter(
            (row) =>
              row.platform &&
              row.username,
          ),
      )

      // =====================================================
      // EXPERTISE / SERVICES / PORTFOLIO / SKILLS
      // =====================================================

      if (expertise) {
        setServices(
          normalizeServices(
            expertise.services,
          ),
        )

        setPortfolioLinks(
          normalizePortfolioLinks(
            expertise.portfolio_links,
          ),
        )

        setSkills(
          normalizeSkills(
            expertise.skills,
          ),
        )

        setCoverLetter(
          expertise.cover_letter ?? "",
        )
      } else {
        setServices([])
        setPortfolioLinks([])
        setSkills([])
        setCoverLetter("")
      }

      // =====================================================
      // COMPANY PROFILE
      // =====================================================

      if (company) {
        setCompanyName(
          company.company_name ?? "",
        )

        setWebsite(
          company.website_url ?? "",
        )

        setDescription(
          company.description ?? "",
        )

        setCompanyLogo(
          company.logo_url ?? null,
        )
      }

      // =====================================================
      // OFFICIAL CONTACT
      // =====================================================

      if (companyContact) {
        setOfficialEmail(
          companyContact.email ??
            companyContact.contact_email ??
            "",
        )

        setOfficialPhone(
          companyContact.phone ??
            companyContact.contact_phone ??
            "",
        )

        setOfficialAddress(
          companyContact.address ??
            companyContact.contact_address ??
            "",
        )
      } else {
        setOfficialEmail("")
        setOfficialPhone("")
        setOfficialAddress("")
      }

      // =====================================================
      // OFFICIAL SOCIAL
      // =====================================================

      setLinks(
        (companySocial ?? [])
          .map((row) => ({
            platform: row.platform ?? "",
            username: row.username ?? "",
          }))
          .filter(
            (row) =>
              row.platform &&
              row.username,
          ),
      )
    } catch (error) {
      console.error(
        "Company social page loading error:",
        error,
      )
    } finally {
      setLoading(false)
    }
  }

  // =========================================================
  // ADD
  // =========================================================

  function add() {
    const nextPlatform =
      platforms.find(
        (platform) =>
          !links.some(
            (link) =>
              link.platform === platform,
          ),
      ) ?? ""

    if (!nextPlatform) {
      return
    }

    setLinks((current) => [
      ...current,
      {
        platform: nextPlatform,
        username: "",
      },
    ])
  }

  // =========================================================
  // REMOVE
  // =========================================================

  function remove(index: number) {
    setLinks((current) =>
      current.filter(
        (_, currentIndex) =>
          currentIndex !== index,
      ),
    )
  }

  // =========================================================
  // UPDATE
  // =========================================================

  function update(
    index: number,
    key: keyof Link,
    value: string,
  ) {
    setLinks((current) =>
      current.map(
        (link, currentIndex) =>
          currentIndex === index
            ? {
                ...link,
                [key]: value,
              }
            : link,
      ),
    )
  }

  // =========================================================
  // SAVE COMPANY SOCIAL
  // =========================================================

  async function save() {
  setSaving(true)

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) {
      throw userError
    }

    if (!user) {
      throw new Error("Please login first.")
    }

    const cleanLinks = links
      .map((link) => ({
        platform: link.platform.trim().toLowerCase(),
        username: link.username.trim(),
      }))
      .filter(
        (link) =>
          link.platform &&
          link.username,
      )

    // DELETE OLD OFFICIAL SOCIAL LINKS
    const {
      error: deleteError,
    } = await supabase
      .from("company_social_links")
      .delete()
      .eq("user_id", user.id)

    if (deleteError) {
      throw deleteError
    }

    // INSERT NEW OFFICIAL SOCIAL LINKS
    if (cleanLinks.length > 0) {
      const {
        error: insertError,
      } = await supabase
        .from("company_social_links")
        .insert(
          cleanLinks.map((link) => ({
            user_id: user.id,
            platform: link.platform,
            username: link.username,
          })),
        )

      if (insertError) {
        throw insertError
      }
    }

    setLinks(cleanLinks)

    alert(
      "Official Social Links updated successfully.",
    )
  } catch (error) {
    console.error(
      "Company social save error:",
      error,
    )

    alert(
      error instanceof Error
        ? error.message
        : "Could not save company links.",
    )
  } finally {
    setSaving(false)
  }
}

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <ResponsiveAppShell
        topTabs={renderSettingsTopTabs(
          "company",
        )}
      >
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Loader2 className="size-4 animate-spin" />
            Loading company information...
          </div>
        </div>
      </ResponsiveAppShell>
    )
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <ResponsiveAppShell
      topTabs={renderSettingsTopTabs(
        "company",
      )}
    >
      <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)_360px]">

        {/* =================================================
            LEFT MENU
        ================================================= */}

        <aside className="h-fit rounded-xl border border-gray-200 bg-white p-4">
          <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            SELECT MENU
          </p>

          <nav className="flex flex-col gap-1">
            {menu.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm ${
                  item.active
                    ? "bg-blue-50 font-medium text-[#4361ee]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <item.icon className="size-4" />
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* =================================================
            MAIN
        ================================================= */}

        <main className="min-w-0">

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Social Links
            </h2>

            <p className="text-sm text-gray-500">
              Manage your personal and official
              company social links.
            </p>
          </div>

          {/* =================================================
              PERSONAL SOCIAL
          ================================================= */}

          <section className="mb-8 rounded-xl border border-gray-200 bg-white p-5">

            <div className="mb-4 flex items-center gap-2">
              <UserRound className="size-4 text-gray-500" />

              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Personal Social
                </h3>

                <p className="text-xs text-gray-500">
                  Loaded from your personal profile.
                </p>
              </div>
            </div>

            {personalSocialLinks.length === 0 ? (
              <p className="text-sm text-gray-400">
                No personal social links added.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {personalSocialLinks.map(
                  (link, index) => (
                    <div
                      key={`${link.platform}-${index}`}
                      className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
                    >
                      <p className="text-xs font-semibold capitalize text-gray-700">
                        {link.platform}
                      </p>

                      <p className="text-xs text-gray-500">
                        {link.username}
                      </p>
                    </div>
                  ),
                )}
              </div>
            )}
          </section>

          {/* =================================================
              OFFICIAL SOCIAL
          ================================================= */}

          <section className="rounded-xl border border-gray-200 bg-white p-5">

            <div className="mb-5 flex items-center gap-2">
              <Building2 className="size-4 text-gray-500" />

              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Official Social
                </h3>

                <p className="text-xs text-gray-500">
                  These links belong to the company.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {links.map(
                (link, index) => (
                  <div
                    key={`${link.platform}-${index}`}
                    className="flex gap-2"
                  >
                    <select
                      value={link.platform}
                      onChange={(event) =>
                        update(
                          index,
                          "platform",
                          event.target.value,
                        )
                      }
                      className="h-10 w-36 rounded-md border border-input bg-background px-3 text-sm"
                    >
                      <option value="">
                        Platform
                      </option>

                      {platforms.map(
                        (platform) => (
                          <option
                            key={platform}
                            value={platform}
                          >
                            {platform
                              .charAt(0)
                              .toUpperCase() +
                              platform.slice(1)}
                          </option>
                        ),
                      )}
                    </select>

                    <Input
                      value={
                        link.username
                      }
                      onChange={(event) =>
                        update(
                          index,
                          "username",
                          event.target.value,
                        )
                      }
                      placeholder="username or full URL"
                    />

                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        remove(index)
                      }
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ),
              )}
            </div>

            <button
              type="button"
              onClick={add}
              className="mt-5 flex items-center gap-2 text-sm font-medium text-[#4361ee] hover:text-[#3a56d4]"
            >
              <Plus className="size-4" />
              Add Social Link
            </button>

            <div className="mt-8 flex justify-end">
              <Button
                onClick={save}
                disabled={saving}
                className="bg-[#4361ee]"
              >
                {saving ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                  <Save className="mr-2 size-4" />
                )}

                Update
              </Button>
            </div>
          </section>
        </main>

        {/* =================================================
            VCARD
        ================================================= */}

        <VCardPreview
          // PERSONAL PROFILE
          coverImage={coverImage}
          profileImage={profileImage}
          name={name}
          title={title}
          about={about}

          // PERSONAL CONTACT
          contactEmail={contactEmail}
          contactPhone={contactPhone}
          contactCountryCode={
            contactCountryCode
          }
          contactAddress={contactAddress}

          // PERSONAL SOCIAL
          socialLinks={personalSocialLinks.map(
            (link) => ({
              platform:
                link.platform as SocialLink["platform"],
              username:
                link.username,
            }),
          )}

          // EXPERTISE
          portfolioLinks={
            portfolioLinks
          }
          services={services}
          skills={skills}
          coverLetter={coverLetter}

          // COMPANY
          companyName={companyName}
          companyWebsite={website}
          companyDescription={description}
          companyLogo={companyLogo}

          // OFFICIAL CONTACT
          officialContactEmail={
            officialEmail
          }
          officialContactPhone={
            officialPhone
          }
          officialContactAddress={
            officialAddress
          }

          // OFFICIAL SOCIAL
          officialSocialLinks={links.map(
            (link) => ({
              platform:
                link.platform as SocialLink["platform"],
              username:
                link.username,
            }),
          )}
        />
      </div>
    </ResponsiveAppShell>
  )
}