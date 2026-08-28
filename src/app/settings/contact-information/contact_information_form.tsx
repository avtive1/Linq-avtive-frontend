"use client"

import { useState } from "react"
import { ChevronDown, MapPin, User, Share2, Award } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ResponsiveAppShell } from "@/components/layout/ResponsiveAppShell"
import { renderSettingsTopTabs } from "@/components/layout/settingsTopTabs"
import { createClient } from "@/lib/supabase/client"
import { VCardPreview } from "@/components/vcard/vcardPreview"

type ContactData = {
  email: string
  countryCode: string
  phone: string
  address: string
}

type ProfileData = {
  profileImage: string | null
  coverImage: string | null
  name: string
  title: string
  about: string
}

type Props = {
  initialContact: ContactData
  initialProfile: ProfileData
}

const menuItems = [
  { icon: User, label: "User Info" },
  { icon: MapPin, label: "Contact Information", active: true },
  { icon: Share2, label: "Social Links" },
  { icon: Award, label: "Expertise & Skills" },
]

export default function ContactInformationForm({
  initialContact,
  initialProfile,
}: Props) {
  const [email, setEmail] = useState(initialContact.email)
  const [countryCode, setCountryCode] = useState(initialContact.countryCode)
  const [phone, setPhone] = useState(initialContact.phone)
  const [address, setAddress] = useState(initialContact.address)

  const [saving, setSaving] = useState(false)

  const [profileImage] = useState<string | null>(initialProfile.profileImage)
  const [coverImage] = useState<string | null>(initialProfile.coverImage)
  const [name] = useState(initialProfile.name)
  const [title] = useState(initialProfile.title)
  const [about] = useState(initialProfile.about)

  const supabase = createClient()

  const handleUpdate = async () => {
    setSaving(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        alert("Please login first.")
        return
      }

      if (!email.trim()) {
        alert("Email address is required.")
        return
      }

      const { error } = await supabase
        .from("contact_information")
        .upsert(
          {
            user_id: user.id,
            email: email.trim(),
            country_code: countryCode,
            phone: phone.trim(),
            address: address.trim(),
          },
          {
            onConflict: "user_id",
          }
        )

      if (error) {
        alert(`Unable to save contact information: ${error.message}`)
        return
      }

      alert("Contact information updated successfully.")
    } catch {
      alert("Something went wrong while updating your information.")
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setEmail(initialContact.email)
    setCountryCode(initialContact.countryCode)
    setPhone(initialContact.phone)
    setAddress(initialContact.address)
  }

  return (
    <ResponsiveAppShell topTabs={renderSettingsTopTabs("profile")}>
      <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)_360px]">
        <div className="w-full min-w-0 lg:w-[220px]">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              SELECT MENU
            </p>

            <nav className="flex flex-col gap-1">
              {menuItems.map((item) => {
                let href = "#"

                if (item.label === "User Info") {
                  href = "/settings/profile"
                } else if (item.label === "Contact Information") {
                  href = "/settings/contact-information"
                } else if (item.label === "Social Links") {
                  href = "/settings/social-links"
                } else if (item.label === "Expertise & Skills") {
                  href = "/settings/expertise-skills"
                }

                const Icon = item.icon

                return (
                  <a
                    key={item.label}
                    href={href}
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
          </div>
        </div>

        <div className="min-w-0">
          <div className="mb-6">
            <h2 className="mb-1 text-lg font-semibold text-gray-900">
              Contact Information
            </h2>

            <p className="text-sm text-gray-500">
              Enter your contact details for communication.
            </p>
          </div>

          <div className="mb-6">
            <Label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-900"
            >
              Email Address
              <span className="text-red-500">*</span>
            </Label>

            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={saving}
              className="h-10"
            />
          </div>

          <div className="mb-6">
            <Label
              htmlFor="phone"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900"
            >
              Phone Number
              <span className="font-normal text-gray-500">(Optional)</span>
              <span className="text-gray-400">ℹ</span>
            </Label>

            <div className="flex gap-2">
              <div className="flex w-24 items-center gap-2 rounded-lg border border-input bg-white px-3 py-2">
                <span className="text-xl">🇵🇰</span>

                <span className="text-sm font-medium text-gray-700">
                  {countryCode}
                </span>

                <ChevronDown className="size-4 text-gray-400" />
              </div>

              <Input
                id="phone"
                type="tel"
                placeholder="300 1234567"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                disabled={saving}
                className="h-10 flex-1"
              />
            </div>
          </div>

          <div className="mb-6">
            <Label
              htmlFor="address"
              className="mb-2 block text-sm font-semibold text-gray-900"
            >
              Address
            </Label>

            <Textarea
              id="address"
              placeholder="Enter your full address here..."
              rows={4}
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              disabled={saving}
              className="min-h-[100px]"
            />
          </div>

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
              className="bg-[#4361ee] px-6 hover:bg-[#3a56d4]"
              onClick={handleUpdate}
              disabled={saving}
            >
              {saving ? "Updating..." : "Update"}
            </Button>
          </div>
        </div>

        <div className="w-full min-w-0 lg:w-[360px]">
          <VCardPreview
            coverImage={coverImage}
            profileImage={profileImage}
            name={name}
            title={title}
            about={about}
            contactEmail={email}
            contactPhone={phone}
            contactCountryCode={countryCode}
            contactAddress={address}
          />
        </div>
      </div>
    </ResponsiveAppShell>
  )
}
