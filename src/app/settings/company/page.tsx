
"use client"

import { useEffect, useState, type ChangeEvent } from "react"
import {
  User,
  MapPin,
  Share2,
  Building2,
  Upload,
  Save,
  Loader2,
} from "lucide-react"
import type { SocialLink } from "@/components/vcard/card-types"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ResponsiveAppShell } from "@/components/layout/ResponsiveAppShell"
import { renderSettingsTopTabs } from "@/components/layout/settingsTopTabs"
import { createClient } from "@/lib/supabase/client"
import { VCardPreview } from "@/components/vcard/vcardPreview"

const menu = [
  {
    icon: User,
    label: "User Info",
    href: "/settings/company",
    active: true,
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
  },
]

export default function CompanySettingsPage() {
  const supabase = createClient()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingLogo, setUploadingLogo] = useState(false)

  // =========================
  // PERSONAL PROFILE DATA
  // =========================
  const [profileName, setProfileName] = useState("")
  const [profileTitle, setProfileTitle] = useState("")
  const [profileAbout, setProfileAbout] = useState("")
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [coverImage, setCoverImage] = useState<string | null>(null)

  const [profileEmail, setProfileEmail] = useState("")
  const [profilePhone, setProfilePhone] = useState("")
  const [profileCountryCode, setProfileCountryCode] =
    useState("+92")
  const [profileAddress, setProfileAddress] = useState("")

  const [socialLinks, setSocialLinks] = useState<
    { platform: string; username: string }[]
  >([])

  // =========================
  // COMPANY DATA
  // =========================
  const [companyName, setCompanyName] = useState("")
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [logoUrl, setLogoUrl] = useState<string | null>(null)

  // =========================
  // LOAD ALL DATA
  // =========================
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
        setLoading(false)
        return
      }

      // =========================
      // LOAD PERSONAL PROFILE
      // =========================
      const {
        data: profile,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle()

      if (profileError) {
        console.error(
          "Profile load error:",
          profileError
        )
      }

      if (profile) {
        setProfileName(
          profile.full_name ??
            profile.name ??
            ""
        )

        setProfileTitle(
          profile.title ?? ""
        )

        setProfileAbout(
          profile.about ?? ""
        )

        setProfileImage(
          profile.avatar_url ?? null
        )

        setCoverImage(
          profile.cover_url ?? null
        )
      }

      // =========================
      // LOAD PERSONAL CONTACT
      // =========================
      const {
        data: contact,
        error: contactError,
      } = await supabase
        .from("contact_information")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle()

      if (contactError) {
        console.error(
          "Contact information load error:",
          contactError
        )
      }

      if (contact) {
        setProfileEmail(
          contact.email ??
            contact.contact_email ??
            ""
        )

        setProfilePhone(
          contact.phone ??
            contact.contact_phone ??
            ""
        )

        setProfileCountryCode(
          contact.country_code ??
            contact.contact_country_code ??
            "+92"
        )

        setProfileAddress(
          contact.address ??
            contact.contact_address ??
            ""
        )
      }

      // =========================
      // LOAD PERSONAL SOCIAL LINKS
      // =========================
      const {
        data: personalSocialLinks,
        error: socialError,
      } = await supabase
        .from("social_links")
        .select("platform, username")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: true,
        })

      if (socialError) {
        console.error(
          "Social links load error:",
          socialError
        )
      }

      if (Array.isArray(personalSocialLinks)) {
        setSocialLinks(
          personalSocialLinks.map((link) => ({
            platform:
              link.platform ?? "",
            username:
              link.username ?? "",
          }))
        )
      }

      // =========================
      // LOAD COMPANY PROFILE
      // =========================
      const {
        data: company,
        error: companyError,
      } = await supabase
        .from("company_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle()

      if (companyError) {
        console.error(
          "Company profile load error:",
          companyError
        )
      }

      if (company) {
        setCompanyName(
          company.company_name ?? ""
        )

        setWebsiteUrl(
          company.website_url ?? ""
        )

        setTitle(
          company.title ?? ""
        )

        setDescription(
          company.description ?? ""
        )

        // =========================
        // LOAD COMPANY LOGO
        // =========================
        const savedLogoUrl =
          typeof company.logo_url ===
          "string"
            ? company.logo_url.trim()
            : ""

        setLogoUrl(
          savedLogoUrl || null
        )
      }
    } catch (error) {
      console.error(
        "Company settings loading error:",
        error
      )
    } finally {
      setLoading(false)
    }
  }

  // =========================
  // SAVE COMPANY INFORMATION
  // =========================
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
        throw new Error(
          "Please login first."
        )
      }

      if (!companyName.trim()) {
        throw new Error(
          "Company Name is required."
        )
      }

      const {
        error,
      } = await supabase
        .from("company_profiles")
        .upsert(
          {
            user_id: user.id,
            company_name:
              companyName.trim(),
            website_url:
              websiteUrl.trim(),
            title:
              title.trim(),
            description:
              description.trim(),

            // Keep current logo URL
            logo_url: logoUrl,
          },
          {
            onConflict: "user_id",
          }
        )

      if (error) {
        console.error(
          "Supabase company save error:",
          error
        )

        throw new Error(
          error.message
        )
      }

      alert(
        "Company Overview updated successfully."
      )
    } catch (error) {
      console.error(
        "Company save error:",
        error
      )

      alert(
        error instanceof Error
          ? error.message
          : "Could not save company information."
      )
    } finally {
      setSaving(false)
    }
  }

  // =========================
  // UPLOAD COMPANY LOGO
  // =========================
  async function uploadLogo(
    e: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      e.target.files?.[0]

    if (!file) {
      return
    }

    // =========================
    // VALIDATE FILE TYPE
    // =========================
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/webp",
    ]

    if (
      !allowedTypes.includes(
        file.type
      )
    ) {
      alert(
        "Only PNG, JPEG or WEBP images are allowed."
      )

      e.target.value = ""
      return
    }

    // =========================
    // VALIDATE FILE SIZE
    // =========================
    if (
      file.size >
      5 * 1024 * 1024
    ) {
      alert(
        "Image must be smaller than 5MB."
      )

      e.target.value = ""
      return
    }

    setUploadingLogo(true)

    try {
      // =========================
      // GET CURRENT USER
      // =========================
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError) {
        throw userError
      }

      if (!user) {
        throw new Error(
          "Please login first."
        )
      }

      // =========================
      // FILE EXTENSION
      // =========================
      const ext =
        file.name
          .split(".")
          .pop()
          ?.toLowerCase() ||
        "jpg"

      // =========================
      // UNIQUE FILE PATH
      // =========================
      const filePath =
        `${user.id}/company-logo-${Date.now()}.${ext}`

      // =========================
      // UPLOAD TO SUPABASE STORAGE
      // =========================
      const {
        error: uploadError,
      } = await supabase.storage
        .from("company-logos")
        .upload(
          filePath,
          file,
          {
            cacheControl: "3600",
            upsert: false,
            contentType:
              file.type,
          }
        )

      if (uploadError) {
        console.error(
          "Company logo upload error:",
          uploadError
        )

        throw new Error(
          uploadError.message
        )
      }

      // =========================
      // GET PUBLIC URL
      // =========================
      const {
        data: publicUrlData,
      } = supabase.storage
        .from("company-logos")
        .getPublicUrl(
          filePath
        )

      const publicUrl =
        publicUrlData.publicUrl

      if (!publicUrl) {
        throw new Error(
          "Could not get company logo URL."
        )
      }

      // =========================
      // SHOW IMMEDIATELY IN UI
      // =========================
      setLogoUrl(publicUrl)

      // =========================
      // SAVE URL TO DATABASE
      // =========================
      const {
        error: companyError,
      } = await supabase
        .from("company_profiles")
        .upsert(
          {
            user_id: user.id,

            // Preserve existing
            // company information
            company_name:
              companyName.trim(),
            website_url:
              websiteUrl.trim(),
            title:
              title.trim(),
            description:
              description.trim(),

            // NEW LOGO URL
            logo_url: publicUrl,
          },
          {
            onConflict: "user_id",
          }
        )

      if (companyError) {
        console.error(
          "Company logo database save error:",
          companyError
        )

        throw new Error(
          companyError.message
        )
      }

      alert(
        "Company logo uploaded successfully."
      )
    } catch (error) {
      console.error(
        "Company logo upload error:",
        error
      )

      alert(
        error instanceof Error
          ? error.message
          : "Could not upload company logo."
      )
    } finally {
      setUploadingLogo(false)

      // Reset file input
      e.target.value = ""
    }
  }

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <ResponsiveAppShell
        topTabs={renderSettingsTopTabs(
          "company"
        )}
      >
        <div className="flex min-h-[500px] items-center justify-center">
          Loading company information...
        </div>
      </ResponsiveAppShell>
    )
  }

  return (
    <ResponsiveAppShell
      topTabs={renderSettingsTopTabs(
        "company"
      )}
    >
      <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)_360px]">

        {/* =========================
            LEFT MENU
        ========================= */}
        <aside className="h-fit rounded-xl border border-gray-200 bg-white p-4">
          <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            SELECT MENU
          </p>

          <nav className="flex flex-col gap-1">
            {menu.map((item) => {
              const Icon =
                item.icon

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm ${
                    item.active
                      ? "bg-blue-50 font-medium text-[#4361ee]"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="size-4" />
                  {item.label}
                </a>
              )
            })}
          </nav>
        </aside>

        {/* =========================
            COMPANY FORM
        ========================= */}
        <main className="min-w-0">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Company Overview
            </h2>

            <p className="text-sm text-gray-500">
              Manage the information that
              belongs to your company,
              not your personal profile.
            </p>
          </div>

          {/* =========================
              COMPANY LOGO
          ========================= */}
          <div className="mb-6 flex items-center gap-4">

            {/* LOGO CIRCLE */}
            <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-100">
              {logoUrl ? (
                <img
                  key={logoUrl}
                  src={logoUrl}
                  alt={
                    companyName
                      ? `${companyName} logo`
                      : "Company logo"
                  }
                  className="h-full w-full object-contain p-1"
                  onLoad={() => {
                    console.log(
                      "Company logo loaded:",
                      logoUrl
                    )
                  }}
                  onError={() => {
                    console.error(
                      "Company logo could not be displayed:",
                      logoUrl
                    )
                  }}
                />
              ) : (
                <Building2 className="size-8 text-gray-400" />
              )}
            </div>

            {/* UPLOAD BUTTON */}
            <div>
              <label
                className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium ${
                  uploadingLogo
                    ? "cursor-not-allowed opacity-60"
                    : "cursor-pointer"
                }`}
              >
                {uploadingLogo ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Upload className="size-4" />
                )}

                {uploadingLogo
                  ? "Uploading..."
                  : logoUrl
                    ? "Change Logo"
                    : "Upload Logo"}

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  disabled={
                    uploadingLogo
                  }
                  onChange={
                    uploadLogo
                  }
                />
              </label>

              <p className="mt-1 text-xs text-gray-400">
                PNG/JPG/WEBP, max 5MB
              </p>
            </div>
          </div>

          {/* =========================
              COMPANY NAME
          ========================= */}
          <div className="mb-6">
            <Label className="mb-2 block">
              Company Name
            </Label>

            <Input
              value={
                companyName
              }
              onChange={(e) =>
                setCompanyName(
                  e.target.value
                )
              }
              placeholder="Company name"
            />
          </div>

          {/* =========================
              WEBSITE
          ========================= */}
          <div className="mb-6">
            <Label className="mb-2 block">
              Website
            </Label>

            <Input
              value={
                websiteUrl
              }
              onChange={(e) =>
                setWebsiteUrl(
                  e.target.value
                )
              }
              placeholder="https://example.com"
            />
          </div>

          {/* =========================
              COMPANY TITLE
          ========================= */}
          <div className="mb-6">
            <Label className="mb-2 block">
              Company Title
            </Label>

            <Input
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              placeholder="Company tagline / title"
            />
          </div>

          {/* =========================
              COMPANY DESCRIPTION
          ========================= */}
          <div className="mb-6">
            <Label className="mb-2 block">
              Company Overview
            </Label>

            <Textarea
              value={
                description
              }
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              placeholder="Describe your company..."
              rows={7}
            />
          </div>

          {/* =========================
              UPDATE BUTTON
          ========================= */}
          <div className="flex justify-end">
            <Button
              type="button"
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
        </main>

        {/* =========================
            EXACT VCARD PREVIEW
        ========================= */}
        <VCardPreview
          coverImage={
            coverImage
          }
          profileImage={
            profileImage
          }
          name={
            profileName
          }
          title={
            profileTitle
          }
          about={
            profileAbout
          }
          contactEmail={
            profileEmail
          }
          contactPhone={
            profilePhone
          }
          contactCountryCode={
            profileCountryCode
          }
          contactAddress={
            profileAddress
          }
          socialLinks={
            socialLinks
              .filter(
                (link) =>
                  link.platform &&
                  link.username
              )
              .map((link) => ({
                platform:
                  link.platform as SocialLink["platform"],
                username:
                  link.username,
              }))
          }
          portfolioLinks={[]}
          services={[]}
          skills={[]}
          coverLetter=""
          companyName={
            companyName
          }
          companyWebsite={
            websiteUrl
          }
          companyDescription={
            description
          }
          companyLogo={
            logoUrl
          }
        />
      </div>
    </ResponsiveAppShell>
  )
}

