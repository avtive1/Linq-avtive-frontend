"use client"

import { useEffect, useState } from "react"
import { CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BasicCard } from "./BasicCard"
import { StandardCard } from "./StandardCard"
import { createClient } from "@/lib/supabase/client"

import type {
  CardTemplate,
  PortfolioLink,
  SkillItem,
  SocialLink,
} from "./card-types"

type VCardPreviewProps = {
  selectedCardTemplate?: CardTemplate

  // =========================================================
  // PERSONAL PROFILE
  // =========================================================

  coverImage: string | null
  profileImage: string | null
  name: string
  title: string
  about: string

  // =========================================================
  // PERSONAL CONTACT
  // =========================================================

  contactEmail: string
  contactPhone: string
  contactCountryCode: string
  contactAddress: string

  // =========================================================
  // PERSONAL SOCIAL / EXPERTISE
  // =========================================================

  socialLinks?: SocialLink[]
  portfolioLinks?: PortfolioLink[]
  services?: string[]
  skills?: SkillItem[]
  coverLetter?: string

  // =========================================================
  // COMPANY PROFILE
  // =========================================================

  companyName?: string
  companyWebsite?: string
  companyDescription?: string
  companyLogo?: string | null

  // =========================================================
  // OFFICIAL COMPANY CONTACT
  // =========================================================

  officialContactEmail?: string
  officialContactPhone?: string
  officialContactAddress?: string

  // =========================================================
  // OFFICIAL COMPANY SOCIAL
  // =========================================================

  officialSocialLinks?: SocialLink[]
}

type CompanyData = {
  name: string
  website: string
  description: string
  logo: string | null
}

type CompanyContactData = {
  email: string
  phone: string
  address: string
}

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
    .filter(
      (item) =>
        item.platform.trim() &&
        item.username.trim(),
    )
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

export function VCardPreview({
  selectedCardTemplate,

  // =========================================================
  // PERSONAL
  // =========================================================

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

  // =========================================================
  // COMPANY
  // =========================================================

  companyName: companyNameProp = "",
  companyWebsite: companyWebsiteProp = "",
  companyDescription: companyDescriptionProp = "",
  companyLogo: companyLogoProp = null,

  // =========================================================
  // OFFICIAL CONTACT
  // =========================================================

  officialContactEmail: officialContactEmailProp = "",
  officialContactPhone: officialContactPhoneProp = "",
  officialContactAddress: officialContactAddressProp = "",

  // =========================================================
  // OFFICIAL SOCIAL
  // IMPORTANT: THIS WAS THE ERROR
  // =========================================================

  officialSocialLinks: officialSocialLinksProp = [],
}: VCardPreviewProps) {
  // =========================================================
  // TEMPLATE
  // =========================================================

  const [cardTemplate, setCardTemplate] =
    useState<CardTemplate>(
      selectedCardTemplate ?? "basic",
    )

  const [loading, setLoading] =
    useState(!selectedCardTemplate)

  // =========================================================
  // SAVED COMPANY
  // =========================================================

  const [savedCompany, setSavedCompany] =
    useState<CompanyData>({
      name: "",
      website: "",
      description: "",
      logo: null,
    })

  // =========================================================
  // SAVED COMPANY CONTACT
  // =========================================================

  const [
    savedCompanyContact,
    setSavedCompanyContact,
  ] = useState<CompanyContactData>({
    email: "",
    phone: "",
    address: "",
  })

  // =========================================================
  // SAVED OFFICIAL SOCIAL
  // =========================================================

  const [
    savedOfficialSocialLinks,
    setSavedOfficialSocialLinks,
  ] = useState<SocialLink[]>([])

  // =========================================================
  // SAVED PERSONAL DATA
  // =========================================================

  const [
    savedPersonalProfile,
    setSavedPersonalProfile,
  ] = useState({
    coverImage: null as string | null,
    profileImage: null as string | null,
    name: "",
    title: "",
    about: "",
  })

  const [
    savedPersonalContact,
    setSavedPersonalContact,
  ] = useState({
    email: "",
    phone: "",
    countryCode: "+92",
    address: "",
  })

  const [
    savedPersonalSocialLinks,
    setSavedPersonalSocialLinks,
  ] = useState<SocialLink[]>([])

  // =========================================================
  // SAVED EXPERTISE
  // =========================================================

  const [
    savedServices,
    setSavedServices,
  ] = useState<string[]>([])

  const [
    savedPortfolioLinks,
    setSavedPortfolioLinks,
  ] = useState<PortfolioLink[]>([])

  const [
    savedSkills,
    setSavedSkills,
  ] = useState<SkillItem[]>([])

  const [
    savedCoverLetter,
    setSavedCoverLetter,
  ] = useState("")

  // =========================================================
  // LOAD EVERYTHING
  // =========================================================

  useEffect(() => {
    let mounted = true

    async function loadCardData() {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError) {
          console.error(
            "VCard auth load error:",
            userError,
          )
        }

        if (!user) {
          if (mounted) {
            setLoading(false)
          }

          return
        }

        const [
          { data: settings, error: settingsError },
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
            data: companyData,
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
          // =================================================
          // SETTINGS
          // =================================================

          supabase
            .from("user_settings")
            .select(
              "vcard_theme, subscription_theme",
            )
            .eq("user_id", user.id)
            .maybeSingle(),

          // =================================================
          // PERSONAL PROFILE
          // =================================================

          supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .maybeSingle(),

          // =================================================
          // PERSONAL CONTACT
          // =================================================

          supabase
            .from("contact_information")
            .select("*")
            .eq("user_id", user.id)
            .maybeSingle(),

          // =================================================
          // PERSONAL SOCIAL
          // =================================================

          supabase
            .from("social_links")
            .select("platform, username")
            .eq("user_id", user.id)
            .order("created_at", {
              ascending: true,
            }),

          // =================================================
          // EXPERTISE
          // =================================================

          supabase
            .from("profile_expertise_skills")
            .select(
              "services, portfolio_links, cover_letter, skills",
            )
            .eq("user_id", user.id)
            .maybeSingle(),

          // =================================================
          // COMPANY PROFILE
          // =================================================

          supabase
            .from("company_profiles")
            .select("*")
            .eq("user_id", user.id)
            .maybeSingle(),

          // =================================================
          // COMPANY CONTACT
          // =================================================

          supabase
            .from("company_contacts")
            .select("*")
            .eq("user_id", user.id)
            .maybeSingle(),

          // =================================================
          // COMPANY SOCIAL
          // =================================================

          supabase
            .from("company_social_links")
            .select("platform, username")
            .eq("user_id", user.id)
            .order("created_at", {
              ascending: true,
            }),
        ])

        if (!mounted) {
          return
        }

        // =====================================================
        // LOG ERRORS
        // =====================================================

        if (settingsError) {
          console.error(
            "VCard settings load error:",
            settingsError,
          )
        }

        if (profileError) {
          console.error(
            "VCard profile load error:",
            profileError,
          )
        }

        if (personalContactError) {
          console.error(
            "VCard personal contact load error:",
            personalContactError,
          )
        }

        if (personalSocialError) {
          console.error(
            "VCard personal social load error:",
            personalSocialError,
          )
        }

        if (expertiseError) {
          console.error(
            "VCard expertise load error:",
            expertiseError,
          )
        }

        if (companyError) {
          console.error(
            "VCard company load error:",
            companyError,
          )
        }

        if (companyContactError) {
          console.error(
            "VCard company contact load error:",
            companyContactError,
          )
        }

        if (companySocialError) {
          console.error(
            "VCard company social load error:",
            companySocialError,
          )
        }

        // =====================================================
        // TEMPLATE
        // =====================================================

        if (!selectedCardTemplate) {
          const savedTheme =
            settings?.vcard_theme ??
            settings?.subscription_theme

          setCardTemplate(
            savedTheme === "standard"
              ? "standard"
              : "basic",
          )
        } else {
          setCardTemplate(
            selectedCardTemplate,
          )
        }

        // =====================================================
        // PERSONAL PROFILE
        // =====================================================

        if (profile) {
          setSavedPersonalProfile({
            coverImage:
              profile.cover_url ?? null,

            profileImage:
              profile.avatar_url ?? null,

            name:
              profile.name ??
              profile.full_name ??
              "",

            title:
              profile.title ?? "",

            about:
              profile.about ?? "",
          })
        }

        // =====================================================
        // PERSONAL CONTACT
        // =====================================================

        if (personalContact) {
          setSavedPersonalContact({
            email:
              personalContact.email ??
              personalContact.contact_email ??
              "",

            phone:
              personalContact.phone ??
              personalContact.contact_phone ??
              "",

            countryCode:
              personalContact.country_code ??
              personalContact.contact_country_code ??
              "+92",

            address:
              personalContact.address ??
              personalContact.contact_address ??
              "",
          })
        }

        // =====================================================
        // PERSONAL SOCIAL
        // =====================================================

        if (Array.isArray(personalSocial)) {
          setSavedPersonalSocialLinks(
            personalSocial
              .map((link) => ({
                platform:
                  link.platform as SocialLink["platform"],

                username:
                  link.username ?? "",
              }))
              .filter(
                (link) =>
                  link.platform &&
                  link.username,
              ),
          )
        }

        // =====================================================
        // EXPERTISE
        // =====================================================

        if (expertise) {
          setSavedServices(
            normalizeServices(
              expertise.services,
            ),
          )

          setSavedPortfolioLinks(
            normalizePortfolioLinks(
              expertise.portfolio_links,
            ),
          )

          setSavedSkills(
            normalizeSkills(
              expertise.skills,
            ),
          )

          setSavedCoverLetter(
            expertise.cover_letter ?? "",
          )
        }

        // =====================================================
        // COMPANY
        // =====================================================

        if (companyData) {
          setSavedCompany({
            name:
              companyData.company_name ??
              "",

            website:
              companyData.website_url ??
              "",

            description:
              companyData.description ??
              "",

            logo:
              companyData.logo_url ??
              null,
          })
        }

        // =====================================================
        // COMPANY CONTACT
        // =====================================================

        if (companyContact) {
          setSavedCompanyContact({
            email:
              companyContact.email ??
              companyContact.contact_email ??
              "",

            phone:
              companyContact.phone ??
              companyContact.contact_phone ??
              "",

            address:
              companyContact.address ??
              companyContact.contact_address ??
              "",
          })
        }

        // =====================================================
        // COMPANY SOCIAL
        // =====================================================

        if (Array.isArray(companySocial)) {
          setSavedOfficialSocialLinks(
            companySocial
              .map((link) => ({
                platform:
                  link.platform as SocialLink["platform"],

                username:
                  link.username ?? "",
              }))
              .filter(
                (link) =>
                  link.platform &&
                  link.username,
              ),
          )
        }
      } catch (error) {
        console.error(
          "VCardPreview loading error:",
          error,
        )
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    void loadCardData()

    return () => {
      mounted = false
    }
  }, [selectedCardTemplate])

  // =========================================================
  // FINAL PERSONAL DATA
  // Props have priority.
  // =========================================================

  const finalCoverImage =
    coverImage ||
    savedPersonalProfile.coverImage ||
    null

  const finalProfileImage =
    profileImage ||
    savedPersonalProfile.profileImage ||
    null

  const finalName =
    name ||
    savedPersonalProfile.name ||
    ""

  const finalTitle =
    title ||
    savedPersonalProfile.title ||
    ""

  const finalAbout =
    about ||
    savedPersonalProfile.about ||
    ""

  const finalContactEmail =
    contactEmail ||
    savedPersonalContact.email ||
    ""

  const finalContactPhone =
    contactPhone ||
    savedPersonalContact.phone ||
    ""

  const finalContactCountryCode =
    contactCountryCode ||
    savedPersonalContact.countryCode ||
    "+92"

  const finalContactAddress =
    contactAddress ||
    savedPersonalContact.address ||
    ""

  const finalPersonalSocialLinks =
    socialLinks.length > 0
      ? socialLinks
      : savedPersonalSocialLinks

  // =========================================================
  // FINAL EXPERTISE
  // =========================================================

  const finalPortfolioLinks =
    portfolioLinks.length > 0
      ? portfolioLinks
      : savedPortfolioLinks

  const finalServices =
    services.length > 0
      ? services
      : savedServices

  const finalSkills =
    skills.length > 0
      ? skills
      : savedSkills

  const finalCoverLetter =
    coverLetter ||
    savedCoverLetter ||
    ""

  // =========================================================
  // FINAL COMPANY
  // =========================================================

  const finalCompanyName =
    companyNameProp ||
    savedCompany.name ||
    ""

  const finalCompanyWebsite =
    companyWebsiteProp ||
    savedCompany.website ||
    ""

  const finalCompanyDescription =
    companyDescriptionProp ||
    savedCompany.description ||
    ""

  const finalCompanyLogo =
    companyLogoProp ??
    savedCompany.logo ??
    null

  // =========================================================
  // FINAL OFFICIAL CONTACT
  // =========================================================

  const finalOfficialEmail =
    officialContactEmailProp ||
    savedCompanyContact.email ||
    ""

  const finalOfficialPhone =
    officialContactPhoneProp ||
    savedCompanyContact.phone ||
    ""

  const finalOfficialAddress =
    officialContactAddressProp ||
    savedCompanyContact.address ||
    ""

  // =========================================================
  // FINAL OFFICIAL SOCIAL
  // =========================================================

  const finalOfficialSocialLinks =
    officialSocialLinksProp.length > 0
      ? officialSocialLinksProp
      : savedOfficialSocialLinks

  // =========================================================
  // COMMON CARD DATA
  // =========================================================

  const common = {
    // PERSONAL
    coverImage: finalCoverImage,
    profileImage: finalProfileImage,
    name: finalName,
    title: finalTitle,
    about: finalAbout,

    contactEmail: finalContactEmail,
    contactPhone: finalContactPhone,
    contactCountryCode:
      finalContactCountryCode,
    contactAddress: finalContactAddress,

    socialLinks:
      finalPersonalSocialLinks,

    portfolioLinks:
      finalPortfolioLinks,

    services:
      finalServices,

    skills:
      finalSkills,

    coverLetter:
      finalCoverLetter,

    // COMPANY
    companyName:
      finalCompanyName,

    companyWebsite:
      finalCompanyWebsite,

    companyDescription:
      finalCompanyDescription,

    companyLogo:
      finalCompanyLogo,

    // OFFICIAL CONTACT
    officialContactEmail:
      finalOfficialEmail,

    officialContactPhone:
      finalOfficialPhone,

    officialContactAddress:
      finalOfficialAddress,

    // OFFICIAL SOCIAL
    officialSocialLinks:
      finalOfficialSocialLinks,
  }

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="w-full min-w-0 lg:w-[360px]">
      <div className="sticky top-8">

        {/* HEADER */}

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <CreditCard className="size-4" />
            Card Live Preview
          </div>

          <Button
            type="button"
            className="bg-[#4361ee] text-xs hover:bg-[#3a56d4]"
          >
            View Card
          </Button>
        </div>

        {/* LOADING */}

        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="size-4 animate-spin rounded-full border-2 border-gray-300 border-t-[#4361ee]" />
              Loading card...
            </div>
          </div>
        ) : cardTemplate === "standard" ? (
          <StandardCard
            {...common}
          />
        ) : (
          <BasicCard
            {...common}
          />
        )}
      </div>
    </div>
  )
}