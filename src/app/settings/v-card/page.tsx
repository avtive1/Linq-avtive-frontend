"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { ResponsiveAppShell } from "@/components/layout/ResponsiveAppShell"
import { renderSettingsTopTabs } from "@/components/layout/settingsTopTabs"
import { createClient } from "@/lib/supabase/client"

import { BasicCard } from "@/components/vcard/BasicCard"
import { StandardCard } from "@/components/vcard/StandardCard"

import type {
  PortfolioLink,
  SkillItem,
  SocialLink,
} from "@/components/vcard/card-types"

type ThemeId = "basic" | "standard"

type ProfileRow = {
  id: string
  name: string | null
  title: string | null
  about: string | null
  avatar_url: string | null
  cover_url: string | null
  selected_card_template: ThemeId | null
}

type ContactRow = {
  email: string | null
  country_code: string | null
  phone: string | null
  address: string | null
}

export default function VCardSettingsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const requestedTheme: ThemeId =
    searchParams.get("theme") === "standard"
      ? "standard"
      : "basic"

  const [theme, setTheme] =
    useState<ThemeId>(requestedTheme)

  const [userId, setUserId] =
    useState<string | null>(null)

  const [loading, setLoading] =
    useState(true)

  const [saving, setSaving] =
    useState(false)

  const [message, setMessage] =
    useState("")

  const [isError, setIsError] =
    useState(false)

  const [profile, setProfile] =
    useState<ProfileRow | null>(null)

  const [contact, setContact] =
    useState<ContactRow>({
      email: "",
      country_code: "",
      phone: "",
      address: "",
    })

  const [socialLinks, setSocialLinks] =
    useState<SocialLink[]>([])

  const [portfolioLinks, setPortfolioLinks] =
    useState<PortfolioLink[]>([])

  const [services, setServices] =
    useState<string[]>([])

  const [skills, setSkills] =
    useState<SkillItem[]>([])

  const [coverLetter, setCoverLetter] =
    useState("")

  useEffect(() => {
    let mounted = true

    async function loadVCard() {
      try {
        setLoading(true)
        setMessage("")
        setIsError(false)

        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser()

        if (authError) {
          throw authError
        }

        if (!user) {
          router.replace("/login")
          return
        }

        if (!mounted) {
          return
        }

        setUserId(user.id)

        /*
         * PROFILE
         */
        const {
          data: profileData,
          error: profileError,
        } = await supabase
          .from("profiles")
          .select(
            "id, name, title, about, avatar_url, cover_url, selected_card_template",
          )
          .eq("id", user.id)
          .maybeSingle<ProfileRow>()

        if (profileError) {
          throw profileError
        }

        if (!mounted) {
          return
        }

        if (profileData) {
          setProfile(profileData)
        } else {
          setProfile({
            id: user.id,
            name: "",
            title: "",
            about: "",
            avatar_url: null,
            cover_url: null,
            selected_card_template: requestedTheme,
          })
        }

        /*
         * Settings page se selected category priority par hai.
         */
        setTheme(requestedTheme)

        /*
         * CONTACT INFORMATION
         */
        const {
          data: contactData,
          error: contactError,
        } = await supabase
          .from("contact_information")
          .select(
            "email, country_code, phone, address",
          )
          .eq("user_id", user.id)
          .maybeSingle<ContactRow>()

        if (!contactError && contactData && mounted) {
          setContact(contactData)
        }

        /*
         * SOCIAL LINKS
         */
        const { data: socialData } =
          await supabase
            .from("social_links")
            .select("*")
            .eq("user_id", user.id)

        if (socialData && mounted) {
          setSocialLinks(
            socialData as SocialLink[],
          )
        }

        /*
         * PORTFOLIO LINKS
         */
        const { data: portfolioData } =
          await supabase
            .from("portfolio_links")
            .select("*")
            .eq("user_id", user.id)

        if (portfolioData && mounted) {
          setPortfolioLinks(
            portfolioData as PortfolioLink[],
          )
        }

        /*
         * SERVICES
         */
        const { data: serviceData } =
          await supabase
            .from("services")
            .select("*")
            .eq("user_id", user.id)

        if (serviceData && mounted) {
          setServices(
            serviceData
              .map(
                (item: { name?: string }) =>
                  item.name,
              )
              .filter(
                (item): item is string =>
                  Boolean(item),
              ),
          )
        }

        /*
         * SKILLS
         */
        const { data: skillData } =
          await supabase
            .from("skills")
            .select("*")
            .eq("user_id", user.id)

        if (skillData && mounted) {
          setSkills(
            skillData as SkillItem[],
          )
        }

        /*
         * COVER LETTER
         */
        const { data: coverLetterData } =
          await supabase
            .from("cover_letters")
            .select("content")
            .eq("user_id", user.id)
            .maybeSingle<{
              content: string | null
            }>()

        if (
          coverLetterData?.content &&
          mounted
        ) {
          setCoverLetter(
            coverLetterData.content,
          )
        }
      } catch (error) {
        console.error(
          "V-Card settings load error:",
          error,
        )

        if (mounted) {
          setMessage(
            error instanceof Error
              ? error.message
              : "Unable to load your V-Card.",
          )

          setIsError(true)
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    void loadVCard()

    return () => {
      mounted = false
    }
  }, [router, requestedTheme, supabase])

  /*
   * Save selected card template.
   */
  async function saveCard() {
    if (!userId || saving) {
      return
    }

    try {
      setSaving(true)
      setMessage("")
      setIsError(false)

      /*
       * Save selected card in profiles.
       */
      const { error } = await supabase
        .from("profiles")
        .update({
          selected_card_template: theme,
        })
        .eq("id", userId)

      if (error) {
        throw error
      }

      /*
       * Keep user_settings.vcard_theme synchronized.
       */
      const { error: settingsError } =
        await supabase
          .from("user_settings")
          .update({
            vcard_theme: theme,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", userId)

      if (settingsError) {
        console.warn(
          "Unable to sync user_settings.vcard_theme:",
          settingsError.message,
        )
      }

      setMessage(
        "Card selected successfully. Redirecting to profile...",
      )

      setTimeout(() => {
        router.replace("/settings/profile")
      }, 700)
    } catch (error) {
      console.error(
        "V-Card save error:",
        error,
      )

      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to save your card.",
      )

      setIsError(true)
      setSaving(false)
    }
  }

  if (loading || !profile) {
    return (
      <ResponsiveAppShell
        topTabs={renderSettingsTopTabs("general")}
      >
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-sm text-gray-500">
            Loading your V-Card...
          </p>
        </div>
      </ResponsiveAppShell>
    )
  }

  return (
    <ResponsiveAppShell
      topTabs={renderSettingsTopTabs("general")}
    >
      <div className="mx-auto w-full max-w-[900px]">

        {/* HEADER */}

        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">
            Choose Your V-Card
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Select your{" "}
            <strong>
              {theme === "basic"
                ? "Basic"
                : "Standard"}
            </strong>{" "}
            card template.
          </p>
        </div>

        {/* CATEGORY BADGE */}

        <div className="mb-5 flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Subscription Theme
            </p>

            <p className="mt-1 text-sm font-semibold text-gray-800">
              {theme === "basic"
                ? "Basic"
                : "Standard"}
            </p>
          </div>

          <button
            type="button"
            disabled={saving}
            onClick={() =>
              router.push("/settings")
            }
            className="text-xs font-medium text-[#4361ee] hover:underline disabled:opacity-50"
          >
            Change Theme
          </button>
        </div>

        {/* CARD SELECTION */}

        <section>
          <div className="mb-3">
            <h2 className="text-sm font-semibold text-gray-900">
              Available Card
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Only cards available for your selected
              category are shown.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">

            {/* BASIC CARD */}

            {theme === "basic" && (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Basic Card
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Basic V-Card template
                    </p>
                  </div>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-medium text-gray-600">
                    Basic
                  </span>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <BasicCard
                    coverImage={
                      profile.cover_url
                    }
                    profileImage={
                      profile.avatar_url
                    }
                    name={profile.name || ""}
                    title={profile.title || ""}
                    about={profile.about || ""}
                    contactEmail={
                      contact.email || ""
                    }
                    contactPhone={
                      contact.phone || ""
                    }
                    contactCountryCode={
                      contact.country_code || ""
                    }
                    contactAddress={
                      contact.address || ""
                    }
                    socialLinks={socialLinks}
                    portfolioLinks={
                      portfolioLinks
                    }
                    services={services}
                    skills={skills}
                    coverLetter={coverLetter}
                  />
                </div>
              </div>
            )}

            {/* STANDARD CARD */}

            {theme === "standard" && (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Standard Card
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Standard V-Card template
                    </p>
                  </div>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-medium text-gray-600">
                    Standard
                  </span>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <StandardCard
                    coverImage={
                      profile.cover_url
                    }
                    profileImage={
                      profile.avatar_url
                    }
                    name={profile.name || ""}
                    title={profile.title || ""}
                    about={profile.about || ""}
                    contactEmail={
                      contact.email || ""
                    }
                    contactPhone={
                      contact.phone || ""
                    }
                    contactCountryCode={
                      contact.country_code || ""
                    }
                    contactAddress={
                      contact.address || ""
                    }
                    socialLinks={socialLinks}
                    portfolioLinks={
                      portfolioLinks
                    }
                    services={services}
                    skills={skills}
                    coverLetter={coverLetter}
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* MESSAGE */}

        {message && (
          <p
            className={[
              "mt-4 text-center text-sm",
              isError
                ? "text-red-500"
                : "text-green-600",
            ].join(" ")}
          >
            {message}
          </p>
        )}

        {/* ACTIONS */}

        <div className="mt-5 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={saving}
            onClick={() =>
              router.push("/settings")
            }
          >
            Back
          </Button>

          <Button
            type="button"
            onClick={saveCard}
            disabled={saving}
            className="bg-[#4361ee] text-white hover:bg-[#3a56d4]"
          >
            {saving
              ? "Saving..."
              : `Select ${
                  theme === "basic"
                    ? "Basic"
                    : "Standard"
                } Card`}
          </Button>
        </div>
      </div>
    </ResponsiveAppShell>
  )
}