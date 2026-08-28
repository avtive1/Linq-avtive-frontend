"use client"

import { useEffect, useState } from "react"
import {
  CreditCard,
  Download,
  ArrowLeftRight,
  Mail,
  Phone,
  MapPin,
  User,
  Share2,
  Building2,
  Upload,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ResponsiveAppShell } from "@/components/layout/ResponsiveAppShell"
import { renderSettingsTopTabs } from "@/components/layout/settingsTopTabs"
import { createClient } from "@/lib/supabase/client"

const menuItems = [
  { icon: User, label: "User Info", active: true },
  { icon: MapPin, label: "Contact Information", active: false },
  { icon: Share2, label: "Social Links", active: false },
]

export default function CompanySettingsPage() {
  const supabase = createClient()

  // =========================================
  // STATE
  // =========================================

  const [companyName, setCompanyName] = useState("")
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [logoUrl, setLogoUrl] = useState<string | null>(null)

  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  // =========================================
  // LOAD COMPANY PROFILE
  // =========================================

  useEffect(() => {
    loadCompanyProfile()
  }, [])

  async function loadCompanyProfile() {
    try {
      setLoading(true)

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError) {
        console.error("User error:", userError)
        return
      }

      if (!user) {
        console.error("No authenticated user found.")
        return
      }

      // -----------------------------------------
      // COMPANY PROFILE
      // -----------------------------------------

      const { data: companyData, error: companyError } =
        await supabase
          .from("company_profiles")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle()

      if (companyError) {
        console.error(
          "Error loading company profile:",
          companyError
        )
      }

      if (companyData) {
        setCompanyName(companyData.company_name || "")
        setWebsiteUrl(companyData.website_url || "")
        setTitle(companyData.title || "")
        setDescription(companyData.description || "")
        setLogoUrl(companyData.logo_url || null)
      }

      // -----------------------------------------
      // CONTACT INFORMATION
      // -----------------------------------------
      // This part assumes your existing
      // contact_information table has user_id,
      // email and phone columns.
      //
      // If your column names are different,
      // change them here.
      // -----------------------------------------

      const { data: contactData, error: contactError } =
        await supabase
          .from("contact_information")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle()

      if (contactError) {
        console.error(
          "Error loading contact information:",
          contactError
        )
      }

      if (contactData) {
        setEmail(contactData.email || "")
        setPhone(contactData.phone || "")
      }
    } catch (error) {
      console.error("Unexpected error:", error)
    } finally {
      setLoading(false)
    }
  }

  // =========================================
  // UPDATE COMPANY PROFILE
  // =========================================

  async function handleUpdate() {
    try {
      setSaving(true)

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError) {
        console.error(userError)
        alert("Unable to verify user.")
        return
      }

      if (!user) {
        alert("Please login first.")
        return
      }

      if (!companyName.trim()) {
        alert("Company Name is required.")
        return
      }

      if (!websiteUrl.trim()) {
        alert("Website URL is required.")
        return
      }

      const { error } = await supabase
        .from("company_profiles")
        .upsert(
          {
            user_id: user.id,
            company_name: companyName.trim(),
            website_url: websiteUrl.trim(),
            title: title.trim(),
            description: description.trim(),
            logo_url: logoUrl,
          },
          {
            onConflict: "user_id",
          }
        )

      if (error) {
        console.error(
          "Company profile update error:",
          error
        )

        alert(error.message)
        return
      }

      alert("Company information updated successfully.")
    } catch (error) {
      console.error("Unexpected update error:", error)
      alert("Something went wrong while updating.")
    } finally {
      setSaving(false)
    }
  }

  // =========================================
  // LOGO UPLOAD
  // =========================================

  async function handleLogoUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0]

    if (!file) return

    // -----------------------------------------
    // Validate file type
    // -----------------------------------------

    if (
      !["image/png", "image/jpeg"].includes(file.type)
    ) {
      alert("Only PNG and JPEG images are allowed.")
      event.target.value = ""
      return
    }

    // -----------------------------------------
    // Validate file size
    // -----------------------------------------

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5MB.")
      event.target.value = ""
      return
    }

    try {
      setUploading(true)

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        alert("Please login first.")
        return
      }

      // -----------------------------------------
      // File extension
      // -----------------------------------------

      const fileExtension =
        file.name.split(".").pop()?.toLowerCase() || "jpg"

      // -----------------------------------------
      // Unique path
      // -----------------------------------------

      const filePath = `${user.id}/company-logo-${Date.now()}.${fileExtension}`

      // -----------------------------------------
      // Upload to Supabase Storage
      // -----------------------------------------

      const { error: uploadError } =
        await supabase.storage
          .from("company-logos")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
          })

      if (uploadError) {
        console.error(
          "Logo upload error:",
          uploadError
        )

        alert(uploadError.message)
        return
      }

      // -----------------------------------------
      // Get public URL
      // -----------------------------------------

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("company-logos")
        .getPublicUrl(filePath)

      // -----------------------------------------
      // Update UI immediately
      // -----------------------------------------

      setLogoUrl(publicUrl)

      // -----------------------------------------
      // Save URL in database
      // -----------------------------------------

      const { error: dbError } =
        await supabase
          .from("company_profiles")
          .upsert(
            {
              user_id: user.id,
              logo_url: publicUrl,
            },
            {
              onConflict: "user_id",
            }
          )

      if (dbError) {
        console.error(
          "Logo database error:",
          dbError
        )

        alert(dbError.message)
        return
      }

      alert("Company logo uploaded successfully.")
    } catch (error) {
      console.error(
        "Unexpected logo upload error:",
        error
      )

      alert("Something went wrong while uploading.")
    } finally {
      setUploading(false)

      // Reset input so same file can be selected again
      event.target.value = ""
    }
  }

  // =========================================
  // CANCEL / RESET
  // =========================================

  async function handleCancel() {
    await loadCompanyProfile()
  }

  // =========================================
  // LOADING SCREEN
  // =========================================

  if (loading) {
    return (
      <ResponsiveAppShell
        topTabs={renderSettingsTopTabs("company")}
      >
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="text-sm text-gray-500">
            Loading company information...
          </div>
        </div>
      </ResponsiveAppShell>
    )
  }

  // =========================================
  // PAGE
  // =========================================

  return (
    <ResponsiveAppShell
      topTabs={renderSettingsTopTabs("company")}
    >
      <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)_360px]">

        {/* ===================================== */}
        {/* LEFT: SIDE MENU */}
        {/* ===================================== */}

        <div className="w-full min-w-0 lg:w-[220px]">
          <div className="rounded-xl border border-gray-200 bg-white p-4">

            <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              SELECT MENU
            </p>

            <nav className="flex flex-col gap-1">

              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={
                    item.label === "User Info"
                      ? "/settings/company"
                      : item.label ===
                          "Contact Information"
                        ? "/settings/company/contact"
                        : "/settings/company/social"
                  }
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
          </div>
        </div>

        {/* ===================================== */}
        {/* CENTER: MAIN FORM */}
        {/* ===================================== */}

        <div className="min-w-0">

          {/* ================================= */}
          {/* COMPANY LOGO */}
          {/* ================================= */}

          <div className="mb-6">

            <div className="flex items-center gap-4">

              {/* Logo Preview */}

              <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">

                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={
                      companyName ||
                      "Company Logo"
                    }
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Building2 className="size-8 text-gray-400" />
                )}

              </div>

              {/* Upload */}

              <div className="flex-1">

                <p className="mb-1 text-sm font-semibold text-gray-900">
                  Upload Image
                </p>

                <p className="mb-2 text-xs text-gray-500">
                  Min 400x400px, PNG or JPEG
                </p>

                <input
                  id="company-logo"
                  type="file"
                  accept="image/png,image/jpeg"
                  className="hidden"
                  onChange={handleLogoUpload}
                />

                <Button
                  type="button"
                  variant="outline"
                  className="gap-2"
                  onClick={() =>
                    document
                      .getElementById(
                        "company-logo"
                      )
                      ?.click()
                  }
                  disabled={uploading}
                >
                  <Upload className="size-4" />

                  {uploading
                    ? "Uploading..."
                    : "Upload"}
                </Button>

              </div>
            </div>
          </div>

          {/* ================================= */}
          {/* COMPANY NAME */}
          {/* ================================= */}

          <div className="mb-6">

            <Label
              htmlFor="company"
              className="mb-2 block text-sm font-semibold text-gray-900"
            >
              Company Name
              <span className="text-red-500">
                *
              </span>
            </Label>

            <Input
              id="company"
              placeholder="Avtive"
              value={companyName}
              onChange={(e) =>
                setCompanyName(e.target.value)
              }
              className="h-10"
            />

          </div>

          {/* ================================= */}
          {/* WEBSITE */}
          {/* ================================= */}

          <div className="mb-6">

            <Label
              htmlFor="website"
              className="mb-2 block text-sm font-semibold text-gray-900"
            >
              Website URL
              <span className="text-red-500">
                *
              </span>
            </Label>

            <Input
              id="website"
              placeholder="www.avtive.co"
              value={websiteUrl}
              onChange={(e) =>
                setWebsiteUrl(e.target.value)
              }
              className="h-10"
            />

          </div>

          {/* ================================= */}
          {/* TITLE */}
          {/* ================================= */}

          <div className="mb-6">

            <Label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold text-gray-900"
            >
              Title
            </Label>

            <Input
              id="title"
              placeholder="e.g. Unlocking Potential, Inspiring Growth."
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="h-10"
            />

          </div>

          {/* ================================= */}
          {/* DESCRIPTION */}
          {/* ================================= */}

          <div className="mb-6">

            <Label
              htmlFor="description"
              className="mb-2 flex items-center justify-between"
            >

              <span className="text-sm font-semibold text-gray-900">
                Company Description

                <span className="text-red-500">
                  *
                </span>

                <span className="ml-1 font-normal text-gray-500">
                  (Optional)
                </span>
              </span>

              <span className="text-xs text-gray-400">
                {description.length}/200
              </span>

            </Label>

            <Textarea
              id="description"
              placeholder="Describe your company..."
              rows={4}
              maxLength={200}
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value.slice(0, 200)
                )
              }
              className="min-h-[100px]"
            />

            <p className="mt-2 flex items-start gap-1 text-xs text-gray-500">
              <span className="mt-0.5">
                💡
              </span>

              You can describe your company briefly.
            </p>

          </div>

          {/* ================================= */}
          {/* ACTION BUTTONS */}
          {/* ================================= */}

          <div className="flex items-center justify-end gap-3">

            <Button
              type="button"
              variant="outline"
              className="px-6"
              onClick={handleCancel}
              disabled={saving}
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={handleUpdate}
              disabled={saving}
              className="bg-[#4361ee] px-6 hover:bg-[#3a56d4]"
            >
              {saving
                ? "Updating..."
                : "Update"}
            </Button>

          </div>

        </div>

        {/* ===================================== */}
        {/* RIGHT: CARD LIVE PREVIEW */}
        {/* ===================================== */}

        <div className="w-full min-w-0 lg:w-[360px]">

          <div className="lg:sticky lg:top-8 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">

            {/* Preview Header */}

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

            {/* ================================= */}
            {/* CARD */}
            {/* ================================= */}

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">

              {/* ================================= */}
              {/* CARD IMAGE */}
              {/* ================================= */}

              <div className="relative h-48 w-full overflow-hidden">

                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={
                      companyName ||
                      "Company Preview"
                    }
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src="/cardw.jpeg"
                    alt="Digital Card Preview"
                    className="h-full w-full object-cover"
                  />
                )}

              </div>

              {/* ================================= */}
              {/* ACTION BUTTONS */}
              {/* ================================= */}

              <div className="flex gap-2 border-b border-gray-100 bg-white px-5 py-3">

                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-gray-50 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-100"
                >
                  <Download className="size-3.5" />
                  Save Contact
                </button>

                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-gray-50 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-100"
                >
                  <ArrowLeftRight className="size-3.5" />
                  Exchange Contact
                </button>

              </div>

              {/* ================================= */}
              {/* ABOUT */}
              {/* ================================= */}

              <div className="border-b border-gray-100 bg-white px-5 py-4">

                <h5 className="mb-2 text-xs font-semibold text-gray-900">
                  About
                </h5>

                <p className="text-xs leading-relaxed text-gray-600">

                  {description ||
                    "Your company description will appear here."}

                </p>

              </div>

              {/* ================================= */}
              {/* COMPANY OVERVIEW */}
              {/* ================================= */}

              <div className="border-b border-gray-100 bg-white px-5 py-4">

                <h5 className="mb-2 text-xs font-semibold text-gray-900">
                  Company Overview
                </h5>

                <p className="text-xs leading-relaxed text-gray-600">

                  {companyName ? (
                    <>
                      {companyName} is a modern
                      digital business focused on
                      creating meaningful
                      connections and
                      opportunities.

                      {websiteUrl && (
                        <>
                          {" "}
                          Visit {websiteUrl} to
                          learn more.
                        </>
                      )}
                    </>
                  ) : (
                    "Your company overview will appear here."
                  )}

                </p>

              </div>

              {/* ================================= */}
              {/* CONTACT INFO */}
              {/* ================================= */}

              <div className="bg-white px-5 py-4">

                <h5 className="mb-3 text-xs font-semibold text-gray-900">
                  Contact Info
                </h5>

                <div className="flex flex-col gap-2.5">

                  {/* Email */}

                  {email ? (
                    <div className="flex items-center gap-2">

                      <Mail className="size-4 text-gray-400" />

                      <span className="text-xs text-gray-600">
                        {email}
                      </span>

                    </div>
                  ) : null}

                  {/* Phone */}

                  {phone ? (
                    <div className="flex items-center gap-2">

                      <Phone className="size-4 text-gray-400" />

                      <span className="text-xs text-gray-600">
                        {phone}
                      </span>

                    </div>
                  ) : null}

                  {/* No Contact */}

                  {!email && !phone && (
                    <p className="text-xs text-gray-400">
                      No contact information added yet.
                    </p>
                  )}

                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </ResponsiveAppShell>
  )
}