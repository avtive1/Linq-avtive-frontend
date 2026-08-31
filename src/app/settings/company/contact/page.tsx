
"use client"

import { useEffect, useState } from "react"
import {
  User,
  MapPin,
  Share2,
  Mail,
  Phone,
  Save,
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
    active: true,
  },
  {
    icon: Share2,
    label: "Social Links",
    href: "/settings/company/social",
  },
]

export default function CompanyContactPage() {
  const supabase = createClient()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // =========================
  // PERSONAL PROFILE DATA
  // =========================
  const [coverImage, setCoverImage] =
    useState<string | null>(null)

  const [profileImage, setProfileImage] =
    useState<string | null>(null)

  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [about, setAbout] = useState("")

  // =========================
  // PERSONAL CONTACT DATA
  // =========================
  const [contactEmail, setContactEmail] =
    useState("")

  const [contactPhone, setContactPhone] =
    useState("")

  const [contactCountryCode, setContactCountryCode] =
    useState("+92")

  const [contactAddress, setContactAddress] =
    useState("")

  // =========================
  // COMPANY DATA
  // =========================
  const [companyName, setCompanyName] =
    useState("")

  const [website, setWebsite] =
    useState("")

  const [companyTitle, setCompanyTitle] =
    useState("")

  const [description, setDescription] =
    useState("")

  const [companyLogo, setCompanyLogo] =
    useState<string | null>(null)

  // =========================
  // OFFICIAL CONTACT DATA
  // company_contacts
  // =========================
  const [email, setEmail] =
    useState("")

  const [phone, setPhone] =
    useState("")

  const [address, setAddress] =
    useState("")

  // =========================
  // INITIAL LOAD
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
        console.error(
          "Auth user error:",
          userError
        )
        throw userError
      }

      if (!user) {
        return
      }

      // =====================================================
      // LOAD ALL DATA
      // =====================================================

      const [
        { data: profile, error: profileError },
        {
          data: personalContact,
          error: personalContactError,
        },
        {
          data: company,
          error: companyError,
        },
        {
          data: companyContact,
          error: companyContactError,
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
      ])

      // =====================================================
      // ERRORS
      // =====================================================

      if (profileError) {
        console.error(
          "Profile load error:",
          profileError
        )
      }

      if (personalContactError) {
        console.error(
          "Personal contact load error:",
          personalContactError
        )
      }

      if (companyError) {
        console.error(
          "Company profile load error:",
          companyError
        )
      }

      if (companyContactError) {
        console.error(
          "Company contacts load error:",
          companyContactError
        )
      }

      // =====================================================
      // PERSONAL PROFILE
      // profiles
      // =====================================================

      if (profile) {
        setCoverImage(
          profile.cover_url ?? null
        )

        setProfileImage(
          profile.avatar_url ?? null
        )

        setName(
          profile.name ??
            profile.full_name ??
            ""
        )

        setTitle(
          profile.title ?? ""
        )

        setAbout(
          profile.about ?? ""
        )
      }

      // =====================================================
      // PERSONAL CONTACT
      // contact_information
      // =====================================================

      if (personalContact) {
        setContactEmail(
          personalContact.email ?? ""
        )

        setContactPhone(
          personalContact.phone ?? ""
        )

        setContactCountryCode(
          personalContact.country_code ??
            "+92"
        )

        setContactAddress(
          personalContact.address ?? ""
        )
      }

      // =====================================================
      // COMPANY PROFILE
      // company_profiles
      // =====================================================

      if (company) {
        setCompanyName(
          company.company_name ?? ""
        )

        setWebsite(
          company.website_url ?? ""
        )

        setCompanyTitle(
          company.title ?? ""
        )

        setDescription(
          company.description ?? ""
        )

        setCompanyLogo(
          company.logo_url ?? null
        )
      }

      // =====================================================
      // OFFICIAL COMPANY CONTACT
      // company_contacts
      // =====================================================

      if (companyContact) {
        setEmail(
          companyContact.email ?? ""
        )

        setPhone(
          companyContact.phone ?? ""
        )

        setAddress(
          companyContact.address ?? ""
        )
      } else {
        // No company contact row yet
        setEmail("")
        setPhone("")
        setAddress("")
      }
    } catch (error) {
      console.error(
        "Company contact page load error:",
        error
      )
    } finally {
      setLoading(false)
    }
  }

  // =========================
  // SAVE OFFICIAL CONTACT
  // =========================
  async function save() {
    setSaving(true)

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError) {
        console.error(
          "Auth error while saving:",
          userError
        )

        throw userError
      }

      if (!user) {
        throw new Error(
          "Please login first."
        )
      }

      // =====================================================
      // CHECK WHETHER COMPANY CONTACT ROW EXISTS
      // =====================================================

      const {
        data: existingContact,
        error: contactLookupError,
      } = await supabase
        .from("company_contacts")
        .select("id, user_id")
        .eq("user_id", user.id)
        .maybeSingle()

      if (contactLookupError) {
        console.error(
          "Company contact lookup error:",
          contactLookupError
        )

        throw contactLookupError
      }

      // =====================================================
      // UPDATE EXISTING COMPANY CONTACT
      // =====================================================

      if (existingContact) {
        const {
          error: updateError,
        } = await supabase
          .from("company_contacts")
          .update({
            email: email.trim(),
            phone: phone.trim(),
            address: address.trim(),
          })
          .eq("user_id", user.id)

        if (updateError) {
          console.error(
            "Company contact update error:",
            updateError
          )

          throw updateError
        }
      }

      // =====================================================
      // INSERT NEW COMPANY CONTACT
      // =====================================================

      else {
        const {
          error: insertError,
        } = await supabase
          .from("company_contacts")
          .insert({
            user_id: user.id,
            email: email.trim(),
            phone: phone.trim(),
            address: address.trim(),
          })

        if (insertError) {
          console.error(
            "Company contact insert error:",
            insertError
          )

          throw insertError
        }
      }

      // =====================================================
      // RELOAD FROM SUPABASE
      // =====================================================

      const {
        data: savedContact,
        error: reloadError,
      } = await supabase
        .from("company_contacts")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle()

      if (reloadError) {
        console.error(
          "Saved company contact reload error:",
          reloadError
        )

        throw reloadError
      }

      if (!savedContact) {
        throw new Error(
          "Company contact was saved but could not be loaded again."
        )
      }

      // =====================================================
      // UPDATE UI WITH ACTUAL DATABASE DATA
      // =====================================================

      setEmail(
        savedContact.email ?? ""
      )

      setPhone(
        savedContact.phone ?? ""
      )

      setAddress(
        savedContact.address ?? ""
      )

      alert(
        "Official Contact Info updated successfully."
      )
    } catch (error) {
      console.error(
        "Official contact save failed:",
        error
      )

      const errorMessage =
        error &&
        typeof error === "object" &&
        "message" in error
          ? String(
              (
                error as {
                  message?: unknown
                }
              ).message
            )
          : error instanceof Error
            ? error.message
            : "Could not save official contact information."

      alert(errorMessage)
    } finally {
      setSaving(false)
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
          Loading...
        </div>
      </ResponsiveAppShell>
    )
  }

  // =========================
  // PAGE
  // =========================
  return (
    <ResponsiveAppShell
      topTabs={renderSettingsTopTabs(
        "company"
      )}
    >
      <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)_360px]">

        {/* =====================================================
            LEFT MENU
        ===================================================== */}

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

        {/* =====================================================
            OFFICIAL COMPANY CONTACT FORM
        ===================================================== */}

        <main className="min-w-0">
          <h2 className="text-lg font-semibold text-gray-900">
            Official Contact Information
          </h2>

          <p className="mb-6 text-sm text-gray-500">
            These details belong to the company and
            are separate from your personal Contact Info.
          </p>

          {/* OFFICIAL EMAIL */}

          <div className="mb-6">
            <Label className="mb-2 block">
              Official Email
            </Label>

            <div className="flex items-center gap-2">
              <Mail className="size-4 text-gray-400" />

              <Input
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }
                type="email"
                placeholder="company@example.com"
              />
            </div>
          </div>

          {/* OFFICIAL PHONE */}

          <div className="mb-6">
            <Label className="mb-2 block">
              Official Phone
            </Label>

            <div className="flex items-center gap-2">
              <Phone className="size-4 text-gray-400" />

              <Input
                value={phone}
                onChange={(event) =>
                  setPhone(
                    event.target.value
                  )
                }
                type="tel"
                placeholder="+92..."
              />
            </div>
          </div>

          {/* OFFICIAL ADDRESS */}

          <div className="mb-6">
            <Label className="mb-2 block">
              Official Address
            </Label>

            <Textarea
              value={address}
              onChange={(event) =>
                setAddress(
                  event.target.value
                )
              }
              rows={5}
              placeholder="Company office address"
            />
          </div>

          {/* UPDATE */}

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

        {/* =====================================================
            EXACT VCARD PREVIEW
        ===================================================== */}

        <VCardPreview
          // PERSONAL DATA
          coverImage={coverImage}
          profileImage={profileImage}
          name={name}
          title={title}
          about={about}
          contactEmail={contactEmail}
          contactPhone={contactPhone}
          contactCountryCode={
            contactCountryCode
          }
          contactAddress={contactAddress}

          // COMPANY DATA
          companyName={companyName}
          companyWebsite={website}
          companyDescription={
            description
          }
          companyLogo={companyLogo}

          // OFFICIAL CONTACT DATA
          officialContactEmail={email}
          officialContactPhone={phone}
          officialContactAddress={address}
        />
      </div>
    </ResponsiveAppShell>
  )
}

