"use client"

import {
  Upload,
  User,
  MapPin,
  Share2,
  Award,
} from "lucide-react"
import { useMemo, useRef, useState } from "react"

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
  userId: string
  initialProfile: ProfileData
  initialContact: ContactData
}

const menuItems = [
  {
    icon: User,
    label: "User Info",
    active: true,
  },
  {
    icon: MapPin,
    label: "Contact Information",
    active: false,
  },
  {
    icon: Share2,
    label: "Social Links",
    active: false,
  },
  {
    icon: Award,
    label: "Expertise & Skills",
    active: false,
  },
]

export default function ProfileSettingsForm({
  userId,
  initialProfile,
  initialContact,
}: Props) {
  const supabase = useMemo(
    () => createClient(),
    [],
  )

  const profileInputRef =
    useRef<HTMLInputElement>(null)

  const coverInputRef =
    useRef<HTMLInputElement>(null)

  // =========================
  // CURRENT PROFILE STATE
  // =========================

  const [profileImage, setProfileImage] =
    useState<string | null>(
      initialProfile.profileImage,
    )

  const [coverImage, setCoverImage] =
    useState<string | null>(
      initialProfile.coverImage,
    )

  const [name, setName] =
    useState(initialProfile.name)

  const [title, setTitle] =
    useState(initialProfile.title)

  const [about, setAbout] =
    useState(initialProfile.about)

  // =========================
  // CONTACT STATE
  // =========================

  const [contactEmail] =
    useState(initialContact.email)

  const [contactCountryCode] =
    useState(initialContact.countryCode)

  const [contactPhone] =
    useState(initialContact.phone)

  const [contactAddress] =
    useState(initialContact.address)

  // =========================
  // ORIGINAL VALUES FOR CANCEL
  // =========================

  const [originalName, setOriginalName] =
    useState(initialProfile.name)

  const [originalTitle, setOriginalTitle] =
    useState(initialProfile.title)

  const [originalAbout, setOriginalAbout] =
    useState(initialProfile.about)

  const [
    originalProfileImage,
    setOriginalProfileImage,
  ] = useState<string | null>(
    initialProfile.profileImage,
  )

  const [
    originalCoverImage,
    setOriginalCoverImage,
  ] = useState<string | null>(
    initialProfile.coverImage,
  )

  // =========================
  // LOADING STATES
  // =========================

  const [
    uploadingProfile,
    setUploadingProfile,
  ] = useState(false)

  const [
    uploadingCover,
    setUploadingCover,
  ] = useState(false)

  const [
    savingProfile,
    setSavingProfile,
  ] = useState(false)

  // ==================================================
  // UPLOAD IMAGE
  // ==================================================

  async function uploadImage(
    file: File,
    type: "profile" | "cover",
  ) {
    if (!userId) {
      alert("You must be logged in.")
      return
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ]

    if (!allowedTypes.includes(file.type)) {
      alert(
        "Invalid image type. Please upload JPG, PNG or WebP.",
      )
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5MB.")
      return
    }

    const bucket =
      type === "profile"
        ? "profile-photos"
        : "cover-photos"

    const extension =
      file.name
        .split(".")
        .pop()
        ?.toLowerCase() || "jpg"

    const filePath =
      `${userId}/${type}-${Date.now()}.${extension}`

    try {
      if (type === "profile") {
        setUploadingProfile(true)
      } else {
        setUploadingCover(true)
      }

      const {
        error: uploadError,
      } = await supabase.storage
        .from(bucket)
        .upload(
          filePath,
          file,
          {
            cacheControl: "3600",
            upsert: false,
          },
        )

      if (uploadError) {
        throw uploadError
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath)

      const column =
        type === "profile"
          ? "avatar_url"
          : "cover_url"

      const {
        error: updateError,
      } = await supabase
        .from("profiles")
        .update({
          [column]: publicUrl,
        })
        .eq("id", userId)

      if (updateError) {
        throw updateError
      }

      // Update current UI
      if (type === "profile") {
        setProfileImage(publicUrl)
        setOriginalProfileImage(publicUrl)
      } else {
        setCoverImage(publicUrl)
        setOriginalCoverImage(publicUrl)
      }

      alert(
        type === "profile"
          ? "Profile picture uploaded successfully!"
          : "Cover photo uploaded successfully!",
      )
    } catch (error) {
      console.error(
        `${type} image upload error:`,
        error,
      )

      const message =
        error instanceof Error
          ? error.message
          : "Failed to upload image."

      alert(message)
    } finally {
      if (type === "profile") {
        setUploadingProfile(false)
      } else {
        setUploadingCover(false)
      }
    }
  }

  // ==================================================
  // PROFILE IMAGE CHANGE
  // ==================================================

  function handleProfileFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0]

    if (!file) {
      return
    }

    void uploadImage(
      file,
      "profile",
    )

    event.target.value = ""
  }

  // ==================================================
  // COVER IMAGE CHANGE
  // ==================================================

  function handleCoverFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0]

    if (!file) {
      return
    }

    void uploadImage(
      file,
      "cover",
    )

    event.target.value = ""
  }

  // ==================================================
  // UPDATE PROFILE TEXT
  // ==================================================

  async function handleUpdate() {
    if (!userId) {
      alert("You must be logged in.")
      return
    }

    if (!name.trim()) {
      alert("Please enter your name.")
      return
    }

    if (!title.trim()) {
      alert("Please enter your designation.")
      return
    }

    if (about.length > 200) {
      alert(
        "About section cannot exceed 200 characters.",
      )
      return
    }

    try {
      setSavingProfile(true)

      const { error } =
        await supabase
          .from("profiles")
          .update({
            name: name.trim(),
            title: title.trim(),
            about: about.trim(),
          })
          .eq("id", userId)

      if (error) {
        throw error
      }

      setOriginalName(
        name.trim(),
      )

      setOriginalTitle(
        title.trim(),
      )

      setOriginalAbout(
        about.trim(),
      )

      alert(
        "Profile updated successfully!",
      )
    } catch (error) {
      console.error(
        "Profile update error:",
        error,
      )

      const message =
        error instanceof Error
          ? error.message
          : "Failed to update profile."

      alert(message)
    } finally {
      setSavingProfile(false)
    }
  }

  // ==================================================
  // CANCEL CHANGES
  // ==================================================

  function handleCancel() {
    setName(originalName)
    setTitle(originalTitle)
    setAbout(originalAbout)

    setProfileImage(
      originalProfileImage,
    )

    setCoverImage(
      originalCoverImage,
    )
  }

  return (
    <ResponsiveAppShell
      topTabs={renderSettingsTopTabs(
        "profile",
      )}
    >
      <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)_360px]">

        {/* ================= LEFT MENU ================= */}

        <div className="w-full min-w-0 lg:w-[220px]">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              SELECT MENU
            </p>

            <nav className="flex flex-col gap-1">
              {menuItems.map((item) => {
                const href =
                  item.label === "User Info"
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
                    key={item.label}
                    href={href}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm ${
                      item.active
                        ? "bg-blue-50 font-medium text-[#4361ee]"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="size-4" />
                    {item.label}
                  </a>
                )
              })}
            </nav>
          </div>
        </div>

        {/* ================= CENTER FORM ================= */}

        <div className="min-w-0">

          {/* PROFILE PICTURE */}

          <div className="mb-6">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Profile Picture
            </h3>

            <div className="flex items-center gap-4">
              <div className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="size-10 text-gray-400" />
                )}
              </div>

              <div className="flex-1">
                <p className="mb-2 text-sm text-gray-600">
                  Select file or drag and drop one here
                </p>

                <input
                  ref={profileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={
                    handleProfileFileChange
                  }
                />

                <Button
                  type="button"
                  variant="outline"
                  className="gap-2"
                  disabled={
                    uploadingProfile
                  }
                  onClick={() =>
                    profileInputRef.current?.click()
                  }
                >
                  <Upload className="size-4" />

                  {uploadingProfile
                    ? "Uploading..."
                    : "Upload"}
                </Button>
              </div>
            </div>
          </div>

          {/* COVER PHOTO */}

          <div className="mb-6">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Cover Photo
            </h3>

            <div className="flex flex-col gap-3">
              {coverImage && (
                <div className="h-32 w-full overflow-hidden rounded-xl border border-gray-200">
                  <img
                    src={coverImage}
                    alt="Cover"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <p className="text-sm text-gray-600">
                Select or drag a file here
              </p>

              <input
                ref={coverInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={
                  handleCoverFileChange
                }
              />

              <div>
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2"
                  disabled={
                    uploadingCover
                  }
                  onClick={() =>
                    coverInputRef.current?.click()
                  }
                >
                  <Upload className="size-4" />

                  {uploadingCover
                    ? "Uploading..."
                    : "Upload"}
                </Button>
              </div>
            </div>
          </div>

          {/* NAME */}

          <div className="mb-6">
            <Label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-gray-900"
            >
              Your Name
              <span className="text-red-500">
                *
              </span>
            </Label>

            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(event) =>
                setName(
                  event.target.value,
                )
              }
              className="h-10"
            />
          </div>

          {/* TITLE */}

          <div className="mb-6">
            <Label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold text-gray-900"
            >
              Title
              <span className="text-red-500">
                *
              </span>
            </Label>

            <Input
              id="title"
              placeholder="Enter your designation"
              value={title}
              onChange={(event) =>
                setTitle(
                  event.target.value,
                )
              }
              className="h-10"
            />
          </div>

          {/* ABOUT */}

          <div className="mb-6">
            <Label
              htmlFor="about"
              className="mb-2 flex items-center justify-between"
            >
              <span className="text-sm font-semibold text-gray-900">
                About{" "}
                <span className="text-gray-500">
                  (Optional)
                </span>
              </span>

              <span className="text-xs text-gray-400">
                {about.length}/200
              </span>
            </Label>

            <Textarea
              id="about"
              placeholder="Describe your about us..."
              rows={4}
              maxLength={200}
              value={about}
              onChange={(event) =>
                setAbout(
                  event.target.value,
                )
              }
              className="min-h-[100px]"
            />

            <p className="mt-2 flex items-start gap-1 text-xs text-gray-500">
              <span className="mt-0.5">
                💡
              </span>
              Please briefly explain your background here.
            </p>
          </div>

          {/* ACTION BUTTONS */}

          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              className="px-6"
              onClick={
                handleCancel
              }
              disabled={
                savingProfile ||
                uploadingProfile ||
                uploadingCover
              }
            >
              Cancel
            </Button>

            <Button
              type="button"
              className="bg-[#4361ee] px-6 hover:bg-[#3a56d4]"
              onClick={
                handleUpdate
              }
              disabled={
                savingProfile ||
                uploadingProfile ||
                uploadingCover
              }
            >
              {savingProfile
                ? "Updating..."
                : "Update"}
            </Button>
          </div>
        </div>

        {/* ================= LIVE PREVIEW ================= */}

        <div className="w-full min-w-0 lg:w-[360px]">
          <VCardPreview
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
            contactAddress={
              contactAddress
            }
          />
        </div>
      </div>
    </ResponsiveAppShell>
  )
}