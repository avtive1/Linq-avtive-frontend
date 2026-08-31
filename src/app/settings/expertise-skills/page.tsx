"use client"

import {
  useCallback,
  useEffect,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react"

import {
  Plus,
  MapPin,
  User,
  Share2,
  Award,
  X,
  Star,
  Trash2,
  Loader2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { ResponsiveAppShell } from "@/components/layout/ResponsiveAppShell"
import { renderSettingsTopTabs } from "@/components/layout/settingsTopTabs"

import { createClient } from "@/lib/supabase/client"
import { VCardPreview } from "@/components/vcard/vcardPreview"

const supabase = createClient()

const menuItems = [
  {
    icon: User,
    label: "User Info",
  },
  {
    icon: MapPin,
    label: "Contact Information",
  },
  {
    icon: Share2,
    label: "Social Links",
  },
  {
    icon: Award,
    label: "Expertise & Skills",
    active: true,
  },
]

type PortfolioLink = {
  id: string
  platform: string
  username: string
}

type SkillItem = {
  id: string
  name: string
  featured: boolean
}

const MAX_COVER_LETTER = 200
const MAX_FEATURED_SKILLS = 5
const DEFAULT_PLATFORM = "behance.com"

function makeId() {
  return Math.random()
    .toString(36)
    .slice(2, 10)
}

function emptyPortfolioLink(
  platform = "",
): PortfolioLink {
  return {
    id: makeId(),
    platform,
    username: "",
  }
}

type SocialPlatformKey =
  | "facebook"
  | "instagram"
  | "twitter"
  | "linkedin"
  | "behance"
  | "pinterest"
  | "snapchat"

type SocialLink = {
  platform: SocialPlatformKey
  username: string
}

const SOCIAL_PLATFORMS: {
  key: SocialPlatformKey
  label: string
  baseUrl: string
  badgeClass: string
  icon: ReactNode
}[] = [
  {
    key: "facebook",
    label: "Facebook",
    baseUrl: "facebook.com/",
    badgeClass:
      "bg-[#1877F2] rounded-full",
    icon: (
      <svg
        className="size-5"
        viewBox="0 0 24 24"
        fill="white"
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },

  {
    key: "instagram",
    label: "Instagram",
    baseUrl: "instagram.com/",
    badgeClass:
      "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] rounded-full",
    icon: (
      <svg
        className="size-5"
        viewBox="0 0 24 24"
        fill="white"
      >
        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 1 1-5 5 5 5 0 0 1 5-5m0 2a3 3 0 1 0 3 3 3 3 0 0 0-3-3z" />
      </svg>
    ),
  },

  {
    key: "twitter",
    label: "X (Twitter)",
    baseUrl: "x.com/",
    badgeClass:
      "bg-black rounded",
    icon: (
      <svg
        className="size-4"
        viewBox="0 0 24 24"
        fill="white"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },

  {
    key: "linkedin",
    label: "LinkedIn",
    baseUrl: "linkedin.com/in/",
    badgeClass:
      "bg-[#0A66C2] rounded",
    icon: (
      <svg
        className="size-5"
        viewBox="0 0 24 24"
        fill="white"
      >
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },

  {
    key: "behance",
    label: "Behance",
    baseUrl: "behance.net/",
    badgeClass:
      "bg-[#1769FF] rounded",
    icon: (
      <span className="text-xs font-bold text-white">
        Be
      </span>
    ),
  },

  {
    key: "pinterest",
    label: "Pinterest",
    baseUrl: "pinterest.com/",
    badgeClass:
      "bg-[#E60023] rounded-full",
    icon: (
      <svg
        className="size-5"
        viewBox="0 0 24 24"
        fill="white"
      >
        <path d="M9.04 21.54c.96.29 1.93.46 2.96.46a10 10 0 0 0 10-10A10 10 0 0 0 12 2 10 10 0 0 0 2 12c0 4.25 2.67 7.9 6.44 9.34c-.09-.78-.18-2.07 0-2.96l1.15-4.94s-.29-.58-.29-1.5c0-1.38.86-2.41 1.84-2.41c.86 0 1.26.63 1.26 1.44c0 .86-.57 2.09-.86 3.27c-.17.98.52 1.84 1.52 1.84c1.78 0 3.16-1.9 3.16-4.58c0-2.4-1.72-4.04-4.19-4.04c-2.82 0-4.48 2.1-4.48 4.31c0 .86.28 1.73.74 2.3c.09.06.09.14.06.29l-.29 1.09c0 .17-.11.23-.28.11c-1.28-.56-2.02-2.38-2.02-3.85c0-3.16 2.24-6.03 6.56-6.03c3.44 0 6.12 2.47 6.12 5.75c0 3.44-2.13 6.2-5.18 6.2c-.97 0-1.92-.52-2.26-1.13l-.67 2.37c-.23.86-.86 2.01-1.29 2.7v-.03z" />
      </svg>
    ),
  },

  {
    key: "snapchat",
    label: "Snapchat",
    baseUrl: "snapchat.com/add/",
    badgeClass:
      "bg-[#FFFC00] rounded-full",
    icon: (
      <svg
        className="size-5"
        viewBox="0 0 24 24"
        fill="black"
      >
        <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.12-.055-.18-.015-.226.156-.451.416-.495 3.236-.556 4.716-3.909 4.776-4.043l.017-.029c.164-.345.193-.645.104-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z" />
      </svg>
    ),
  },
]

export default function ExpertiseSkillsPage() {
  // =========================================================
  // STATE
  // =========================================================

  const [loading, setLoading] =
    useState(true)

  const [saving, setSaving] =
    useState(false)

  const [saveError, setSaveError] =
    useState<string | null>(null)

  const [saved, setSaved] =
    useState(false)

  // =========================================================
  // PROFILE
  // =========================================================

  const [profileImage, setProfileImage] =
    useState<string | null>(null)

  const [coverImage, setCoverImage] =
    useState<string | null>(null)

  const [name, setName] =
    useState("")

  const [title, setTitle] =
    useState("")

  const [about, setAbout] =
    useState("")

  // =========================================================
  // CONTACT
  // =========================================================

  const [email, setEmail] =
    useState("")

  const [countryCode, setCountryCode] =
    useState("+92")

  const [phone, setPhone] =
    useState("")

  const [address, setAddress] =
    useState("")

  // =========================================================
  // SOCIAL
  // =========================================================

  const [socialLinks, setSocialLinks] =
    useState<SocialLink[]>([])

  // =========================================================
  // SERVICES
  // =========================================================

  const [services, setServices] =
    useState<string[]>([])

  const [serviceInput, setServiceInput] =
    useState("")

  // =========================================================
  // PORTFOLIO
  // =========================================================

  const [portfolioLinks, setPortfolioLinks] =
    useState<PortfolioLink[]>([
      emptyPortfolioLink(
        DEFAULT_PLATFORM,
      ),
    ])

  // =========================================================
  // COVER LETTER
  // =========================================================

  const [coverLetter, setCoverLetter] =
    useState("")

  // =========================================================
  // SKILLS
  // =========================================================

  const [skills, setSkills] =
    useState<SkillItem[]>([])

  const [skillInput, setSkillInput] =
    useState("")

  // =========================================================
  // LOAD DATA
  // =========================================================

  const loadData = useCallback(
    async () => {
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
          {
            data: expertise,
            error: expertiseError,
          },

          {
            data: profile,
            error: profileError,
          },

          {
            data: contact,
            error: contactError,
          },

          {
            data: social,
            error: socialError,
          },
        ] = await Promise.all([
          // EXPERTISE
          supabase
            .from(
              "profile_expertise_skills",
            )
            .select(
              "services, portfolio_links, cover_letter, skills",
            )
            .eq("user_id", user.id)
            .maybeSingle(),

          // PROFILE
          supabase
            .from("profiles")
            .select(
              "avatar_url, cover_url, name, full_name, title, about",
            )
            .eq("id", user.id)
            .maybeSingle(),

          // CONTACT
          supabase
            .from("contact_information")
            .select(
              "email, contact_email, country_code, contact_country_code, phone, contact_phone, address, contact_address",
            )
            .eq("user_id", user.id)
            .maybeSingle(),

          // SOCIAL
          supabase
            .from("social_links")
            .select(
              "platform, username",
            )
            .eq("user_id", user.id)
            .order(
              "created_at",
              {
                ascending: true,
              },
            ),
        ])

        if (expertiseError) {
          console.error(
            "Error loading expertise:",
            expertiseError,
          )
        }

        if (profileError) {
          console.error(
            "Error loading profile:",
            profileError,
          )
        }

        if (contactError) {
          console.error(
            "Error loading contact:",
            contactError,
          )
        }

        if (socialError) {
          console.error(
            "Error loading social links:",
            socialError,
          )
        }

        // =====================================================
        // EXPERTISE
        // =====================================================

        if (expertise) {
          setServices(
            Array.isArray(
              expertise.services,
            )
              ? expertise.services
              : [],
          )

          if (
            Array.isArray(
              expertise.portfolio_links,
            ) &&
            expertise.portfolio_links.length >
              0
          ) {
            setPortfolioLinks(
              expertise.portfolio_links.map(
                (
                  link: {
                    id?: string
                    platform?: string
                    username?: string
                  },
                ) => ({
                  id:
                    link.id ??
                    makeId(),

                  platform:
                    link.platform ??
                    "",

                  username:
                    link.username ??
                    "",
                }),
              ),
            )
          } else {
            setPortfolioLinks([
              emptyPortfolioLink(
                DEFAULT_PLATFORM,
              ),
            ])
          }

          setCoverLetter(
            expertise.cover_letter ??
              "",
          )

          setSkills(
            Array.isArray(
              expertise.skills,
            )
              ? expertise.skills
              : [],
          )
        } else {
          setServices([])

          setPortfolioLinks([
            emptyPortfolioLink(
              DEFAULT_PLATFORM,
            ),
          ])

          setCoverLetter("")

          setSkills([])
        }

        // =====================================================
        // PROFILE
        // =====================================================

        if (profile) {
          setProfileImage(
            profile.avatar_url ??
              null,
          )

          setCoverImage(
            profile.cover_url ??
              null,
          )

          setName(
            profile.name ??
              profile.full_name ??
              "",
          )

          setTitle(
            profile.title ??
              "",
          )

          setAbout(
            profile.about ??
              "",
          )
        }

        // =====================================================
        // CONTACT
        // =====================================================

        if (contact) {
          setEmail(
            contact.email ??
              contact.contact_email ??
              "",
          )

          setCountryCode(
            contact.country_code ??
              contact.contact_country_code ??
              "+92",
          )

          setPhone(
            contact.phone ??
              contact.contact_phone ??
              "",
          )

          setAddress(
            contact.address ??
              contact.contact_address ??
              "",
          )
        }

        // =====================================================
        // SOCIAL
        // =====================================================

        const loadedSocialLinks =
          (social ?? [])
            .filter((link) =>
              SOCIAL_PLATFORMS.some(
                (platform) =>
                  platform.key ===
                  link.platform,
              ),
            )
            .map((link) => ({
              platform:
                link.platform as SocialPlatformKey,

              username:
                link.username ?? "",
            }))

        setSocialLinks(
          loadedSocialLinks,
        )
      } catch (error) {
        console.error(
          "Error loading expertise page:",
          error,
        )
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  useEffect(() => {
    void loadData()
  }, [loadData])

  // =========================================================
  // SERVICES
  // =========================================================

  const addService = useCallback(
    (raw: string) => {
      const value =
        raw.trim()

      if (!value) {
        return
      }

      setServices(
        (previous) => {
          const exists =
            previous.some(
              (service) =>
                service.toLowerCase() ===
                value.toLowerCase(),
            )

          if (exists) {
            return previous
          }

          return [
            ...previous,
            value,
          ]
        },
      )

      setServiceInput("")
    },
    [],
  )

  function removeService(
    value: string,
  ) {
    setServices(
      (previous) =>
        previous.filter(
          (service) =>
            service !== value,
        ),
    )
  }

  function onServiceKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    if (
      event.key === "Enter" ||
      event.key === ","
    ) {
      event.preventDefault()

      addService(
        serviceInput,
      )

      return
    }

    if (
      event.key === "Backspace" &&
      !serviceInput &&
      services.length
    ) {
      setServices(
        (previous) =>
          previous.slice(0, -1),
      )
    }
  }

  // =========================================================
  // PORTFOLIO
  // =========================================================

  function updatePortfolioLink(
    id: string,
    field:
      | "platform"
      | "username",
    value: string,
  ) {
    setPortfolioLinks(
      (previous) =>
        previous.map(
          (link) =>
            link.id === id
              ? {
                  ...link,
                  [field]:
                    value,
                }
              : link,
        ),
    )
  }

  function addPortfolioLink() {
    setPortfolioLinks(
      (previous) => [
        ...previous,
        emptyPortfolioLink(),
      ],
    )
  }

  function removePortfolioLink(
    id: string,
  ) {
    setPortfolioLinks(
      (previous) =>
        previous.length > 1
          ? previous.filter(
              (link) =>
                link.id !== id,
            )
          : previous,
    )
  }

  const filledPortfolioLinks =
    portfolioLinks.filter(
      (link) =>
        link.platform.trim() &&
        link.username.trim(),
    )

  // =========================================================
  // COVER LETTER
  // =========================================================

  function onCoverLetterChange(
    value: string,
  ) {
    setCoverLetter(
      value.slice(
        0,
        MAX_COVER_LETTER,
      ),
    )
  }

  // =========================================================
  // SKILLS
  // =========================================================

  const addSkill = useCallback(
    (raw: string) => {
      const value =
        raw.trim()

      if (!value) {
        return
      }

      setSkills(
        (previous) => {
          const exists =
            previous.some(
              (skill) =>
                skill.name.toLowerCase() ===
                value.toLowerCase(),
            )

          if (exists) {
            return previous
          }

          const featured =
            previous.filter(
              (skill) =>
                skill.featured,
            ).length <
            MAX_FEATURED_SKILLS

          return [
            ...previous,
            {
              id: makeId(),
              name: value,
              featured,
            },
          ]
        },
      )

      setSkillInput("")
    },
    [],
  )

  function removeSkill(
    id: string,
  ) {
    setSkills(
      (previous) =>
        previous.filter(
          (skill) =>
            skill.id !== id,
        ),
    )
  }

  function toggleFeaturedSkill(
    id: string,
  ) {
    setSkills(
      (previous) => {
        const featuredCount =
          previous.filter(
            (skill) =>
              skill.featured,
          ).length

        return previous.map(
          (skill) => {
            if (
              skill.id !== id
            ) {
              return skill
            }

            if (
              !skill.featured &&
              featuredCount >=
                MAX_FEATURED_SKILLS
            ) {
              return skill
            }

            return {
              ...skill,
              featured:
                !skill.featured,
            }
          },
        )
      },
    )
  }

  function onSkillKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    if (
      event.key === "Enter" ||
      event.key === ","
    ) {
      event.preventDefault()

      addSkill(
        skillInput,
      )

      return
    }

    if (
      event.key === "Backspace" &&
      !skillInput &&
      skills.length
    ) {
      setSkills(
        (previous) =>
          previous.slice(0, -1),
      )
    }
  }

  // =========================================================
  // SAVE
  // =========================================================

  async function handleUpdate() {
    setSaving(true)
    setSaveError(null)
    setSaved(false)

    try {
      const {
        data: { user },
        error: userError,
      } =
        await supabase.auth.getUser()

      if (userError) {
        throw userError
      }

      if (!user) {
        setSaveError(
          "You need to be signed in to save changes.",
        )

        return
      }

      const cleanedServices =
        services
          .map((service) =>
            service.trim(),
          )
          .filter(Boolean)

      const cleanedPortfolioLinks =
        portfolioLinks
          .map((link) => ({
            id:
              link.id ||
              makeId(),

            platform:
              link.platform.trim(),

            username:
              link.username.trim(),
          }))
          .filter(
            (link) =>
              link.platform &&
              link.username,
          )

      const cleanedSkills =
        skills
          .map((skill) => ({
            id:
              skill.id ||
              makeId(),

            name:
              skill.name.trim(),

            featured:
              skill.featured ===
              true,
          }))
          .filter(
            (skill) =>
              skill.name,
          )

      const {
        error,
      } = await supabase
        .from(
          "profile_expertise_skills",
        )
        .upsert(
          {
            user_id:
              user.id,

            services:
              cleanedServices,

            portfolio_links:
              cleanedPortfolioLinks,

            cover_letter:
              coverLetter.trim(),

            skills:
              cleanedSkills,

            updated_at:
              new Date().toISOString(),
          },
          {
            onConflict:
              "user_id",
          },
        )

      if (error) {
        throw error
      }

      setServices(
        cleanedServices,
      )

      setPortfolioLinks(
        cleanedPortfolioLinks.length >
          0
          ? cleanedPortfolioLinks
          : [
              emptyPortfolioLink(
                DEFAULT_PLATFORM,
              ),
            ],
      )

      setSkills(
        cleanedSkills,
      )

      setSaved(true)

      setTimeout(
        () => {
          setSaved(false)
        },
        2500,
      )
    } catch (error) {
      console.error(
        "Expertise save error:",
        error,
      )

      setSaveError(
        error instanceof Error
          ? error.message
          : "Could not save your changes. Please try again.",
      )
    } finally {
      setSaving(false)
    }
  }

  // =========================================================
  // CANCEL
  // =========================================================

  function handleCancel() {
    setServiceInput("")
    setSkillInput("")
    setSaveError(null)

    void loadData()
  }

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <ResponsiveAppShell
        topTabs={renderSettingsTopTabs(
          "profile",
        )}
      >
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Loader2 className="size-4 animate-spin" />
            Loading your details...
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
        "profile",
      )}
    >
      <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)_360px]">

        {/* =================================================
            LEFT MENU
        ================================================= */}

        <div className="w-full min-w-0 lg:w-[220px]">
          <div className="rounded-xl border border-gray-200 bg-white p-4">

            <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              SELECT MENU
            </p>

            <nav className="flex flex-col gap-1">
              {menuItems.map(
                (item) => {
                  const href =
                    item.label ===
                    "User Info"
                      ? "/settings/profile"
                      : item.label ===
                          "Contact Information"
                        ? "/settings/contact-information"
                        : item.label ===
                            "Social Links"
                          ? "/settings/social-links"
                          : item.label ===
                              "Expertise & Skills"
                            ? "/settings/expertise-skills"
                            : "#"

                  return (
                    <a
                      key={
                        item.label
                      }
                      href={
                        href
                      }
                      className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm ${
                        item.active
                          ? "bg-blue-50 font-medium text-[#4361ee]"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <item.icon className="size-4" />

                      {
                        item.label
                      }
                    </a>
                  )
                },
              )}
            </nav>
          </div>
        </div>

        {/* =================================================
            MAIN FORM
        ================================================= */}

        <div className="min-w-0">

          <div className="mb-6">
            <h2 className="mb-1 text-lg font-semibold text-gray-900">
              Expertise & Skills
            </h2>

            <p className="text-sm text-gray-500">
              Just a few details to get you started
            </p>
          </div>

          {/* =================================================
              SERVICES
          ================================================= */}

          <div className="mb-6">

            <Label
              htmlFor="services"
              className="mb-2 block text-sm font-semibold text-gray-900"
            >
              Services
            </Label>

            <Input
              id="services"
              placeholder="Add Services"
              className="mb-3 h-10"
              value={serviceInput}
              onChange={(event) =>
                setServiceInput(
                  event.target.value,
                )
              }
              onKeyDown={
                onServiceKeyDown
              }
              onBlur={() =>
                addService(
                  serviceInput,
                )
              }
            />

            <div className="flex flex-wrap gap-2">

              {services.length ===
                0 && (
                <span className="text-xs text-gray-400">
                  No services added yet —
                  type one and press Enter.
                </span>
              )}

              {services.map(
                (service) => (
                  <span
                    key={
                      service
                    }
                    className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                  >
                    {
                      service
                    }

                    <button
                      type="button"
                      className="hover:text-gray-900"
                      onClick={() =>
                        removeService(
                          service,
                        )
                      }
                      aria-label={`Remove ${service}`}
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ),
              )}
            </div>
          </div>

          {/* =================================================
              PORTFOLIO
          ================================================= */}

          <div className="mb-6">

            <Label className="mb-2 block text-sm font-semibold text-gray-900">
              Portfolio Links
            </Label>

            <div className="mb-3 flex flex-col gap-2">

              {portfolioLinks.map(
                (
                  link,
                  index,
                ) => (
                  <div
                    key={
                      link.id
                    }
                    className="flex gap-2"
                  >
                    <Input
                      value={
                        link.platform
                      }
                      onChange={(
                        event,
                      ) =>
                        updatePortfolioLink(
                          link.id,
                          "platform",
                          event.target.value,
                        )
                      }
                      placeholder="platform.com"
                      className="h-10 w-36"
                    />

                    <Input
                      value={
                        link.username
                      }
                      onChange={(
                        event,
                      ) =>
                        updatePortfolioLink(
                          link.id,
                          "username",
                          event.target.value,
                        )
                      }
                      placeholder="username"
                      className="h-10 flex-1"
                    />

                    {portfolioLinks.length >
                      1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 shrink-0"
                        onClick={() =>
                          removePortfolioLink(
                            link.id,
                          )
                        }
                        aria-label={`Remove link ${index + 1}`}
                      >
                        <X className="size-4" />
                      </Button>
                    )}
                  </div>
                ),
              )}
            </div>

            <button
              type="button"
              className="flex items-center gap-2 text-sm font-medium text-[#4361ee] hover:text-[#3a56d4]"
              onClick={
                addPortfolioLink
              }
            >
              <Plus className="size-4" />
              Add Additional Link
            </button>
          </div>

          {/* =================================================
              COVER LETTER
          ================================================= */}

          <div className="mb-6">

            <Label
              htmlFor="cover"
              className="mb-2 flex items-center justify-between"
            >
              <span className="text-sm font-semibold text-gray-900">
                Cover Letter
              </span>

              <span className="text-xs text-gray-400">
                {
                  coverLetter.length
                }
                /
                {
                  MAX_COVER_LETTER
                }
              </span>
            </Label>

            <Textarea
              id="cover"
              placeholder="Add your cover letter"
              rows={4}
              className="min-h-[100px]"
              value={
                coverLetter
              }
              maxLength={
                MAX_COVER_LETTER
              }
              onChange={(event) =>
                onCoverLetterChange(
                  event.target.value,
                )
              }
            />
          </div>

          {/* =================================================
              SKILLS
          ================================================= */}

          <div className="mb-6">

            <Label
              htmlFor="skills"
              className="mb-2 block text-sm font-semibold text-gray-900"
            >
              Skills
            </Label>

            <Input
              id="skills"
              placeholder="Add Skills"
              className="mb-3 h-10"
              value={
                skillInput
              }
              onChange={(event) =>
                setSkillInput(
                  event.target.value,
                )
              }
              onKeyDown={
                onSkillKeyDown
              }
              onBlur={() =>
                addSkill(
                  skillInput,
                )
              }
            />

            {skills.length ===
            0 ? (
              <p className="text-xs text-gray-400">
                No skills added yet —
                type one and press Enter.
              </p>
            ) : (
              <div className="overflow-hidden rounded-lg border border-gray-200">

                {skills.map(
                  (
                    skill,
                    index,
                  ) => (
                    <div
                      key={
                        skill.id
                      }
                      className={`flex items-center justify-between gap-3 px-3 py-2.5 ${
                        index !==
                        skills.length -
                          1
                          ? "border-b border-gray-100"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            toggleFeaturedSkill(
                              skill.id,
                            )
                          }
                          aria-label={
                            skill.featured
                              ? `Unstar ${skill.name}`
                              : `Star ${skill.name}`
                          }
                          title="Featured skills show first on your card"
                        >
                          <Star
                            className={`size-4 ${
                              skill.featured
                                ? "fill-emerald-500 text-emerald-500"
                                : "text-gray-300"
                            }`}
                          />
                        </button>

                        <span className="text-sm text-gray-700">
                          {
                            skill.name
                          }
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeSkill(
                            skill.id,
                          )
                        }
                        className="text-gray-400 hover:text-red-500"
                        aria-label={`Delete ${skill.name}`}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  ),
                )}
              </div>
            )}
          </div>

          {/* =================================================
              SAVE MESSAGE
          ================================================= */}

          {saveError && (
            <p className="mb-3 text-sm text-red-500">
              {
                saveError
              }
            </p>
          )}

          {saved && (
            <p className="mb-3 text-sm text-emerald-600">
              Saved successfully.
            </p>
          )}

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div className="flex items-center justify-end gap-3">

            <Button
              variant="outline"
              className="px-6"
              onClick={
                handleCancel
              }
              disabled={
                saving
              }
            >
              Cancel
            </Button>

            <Button
              className="bg-[#4361ee] px-6 hover:bg-[#3a56d4]"
              onClick={
                handleUpdate
              }
              disabled={
                saving
              }
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                  Updating...
                </span>
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </div>

        {/* =================================================
            CARD PREVIEW
        ================================================= */}

        <div className="w-full min-w-0 lg:w-[360px]">

          <VCardPreview
            coverImage={
              coverImage
            }

            profileImage={
              profileImage
            }

            name={
              name
            }

            title={
              title
            }

            about={
              about
            }

            contactEmail={
              email
            }

            contactPhone={
              phone
            }

            contactCountryCode={
              countryCode
            }

            contactAddress={
              address
            }

            socialLinks={
              socialLinks
            }

            portfolioLinks={
              filledPortfolioLinks
            }

            services={
              services
            }

            skills={
              skills
            }

            coverLetter={
              coverLetter
            }
          />
        </div>
      </div>
    </ResponsiveAppShell>
  )
}