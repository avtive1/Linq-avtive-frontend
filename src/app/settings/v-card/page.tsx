"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Check, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ResponsiveAppShell } from "@/components/layout/ResponsiveAppShell"
import { renderSettingsTopTabs } from "@/components/layout/settingsTopTabs"
import { createClient } from "@/lib/supabase/client"

import { BasicCard } from "@/components/vcard/BasicCard"
import { StandardCard } from "@/components/vcard/StandardCard"

type CardCategory = "basic" | "standard"

export default function VCardSelectionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [category, setCategory] =
    useState<CardCategory>("basic")

  const [saving, setSaving] =
    useState(false)

  const [loading, setLoading] =
    useState(true)

  const [message, setMessage] =
    useState("")

  useEffect(() => {
    const theme = searchParams.get("theme")

    if (theme === "standard") {
      setCategory("standard")
    } else {
      setCategory("basic")
    }

    setLoading(false)
  }, [searchParams])

  async function handleApplyChanges() {
    if (saving) {
      return
    }

    try {
      setSaving(true)
      setMessage("")

      const supabase = createClient()

      const {
        data: {
          user,
        },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        router.push("/login")
        return
      }

      /*
       * The current project already stores the selected
       * Basic/Standard category inside user_settings.
       *
       * We keep that existing value synchronized here.
       */
      const { error } = await supabase
        .from("user_settings")
        .upsert(
          {
            user_id: user.id,
            subscription_theme: category,
            vcard_theme: category,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "user_id",
          },
        )

      if (error) {
        setMessage(
          `Unable to save card selection: ${error.message}`,
        )
        return
      }

      /*
       * Card selection is complete.
       * Move to the profile page where the user can
       * enter/edit profile data, profile picture and background.
       */
      router.push("/settings/profile")
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to save card selection.",
      )
    } finally {
      setSaving(false)
    }
  }

  function handleBack() {
    router.push("/settings")
  }

  if (loading) {
    return (
      <ResponsiveAppShell
        topTabs={renderSettingsTopTabs("general")}
      >
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-sm text-gray-500">
            Loading card...
          </p>
        </div>
      </ResponsiveAppShell>
    )
  }

  return (
    <ResponsiveAppShell
      topTabs={renderSettingsTopTabs("general")}
    >
      <main className="w-full min-w-0">
        {/* ================= HEADER ================= */}

        <div className="mb-8">
          <button
            type="button"
            onClick={handleBack}
            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900"
          >
            <ArrowLeft className="size-4" />
            Back to Settings
          </button>

          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gray-100">
              <CreditCard className="size-5 text-gray-700" />
            </div>

            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Choose Your V-Card
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Select the {category} card assigned to your
                selected category.
              </p>
            </div>
          </div>
        </div>

        {/* ================= CARD COLLECTION ================= */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                {category === "basic"
                  ? "Basic Card"
                  : "Standard Card"}
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                This card design is fixed and cannot be
                customized.
              </p>
            </div>

            <div className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium capitalize text-gray-700">
              {category}
            </div>
          </div>

          {/* ================= FIXED CARD ================= */}

          <div className="flex justify-center overflow-x-auto py-6">
            <div className="relative shrink-0">
              {category === "standard" ? (
                <StandardCard
                  coverImage={null}
                  profileImage={null}
                  name="Your Name"
                  title="Your professional title"
                  about=""
                  contactEmail=""
                  contactPhone=""
                  contactCountryCode="+92"
                  contactAddress=""
                  socialLinks={[]}
                  portfolioLinks={[]}
                  services={[]}
                  skills={[]}
                  coverLetter=""
                />
              ) : (
                <BasicCard
                  coverImage={null}
                  profileImage={null}
                  name="Your Name"
                  title="Your professional title"
                  about=""
                  contactEmail=""
                  contactPhone=""
                  contactCountryCode="+92"
                  contactAddress=""
                  socialLinks={[]}
                  portfolioLinks={[]}
                  services={[]}
                  skills={[]}
                  coverLetter=""
                />
              )}

              {/* ================= SELECTED BADGE ================= */}

              <div className="absolute right-4 top-4 z-30 flex items-center gap-2 rounded-full bg-black px-3 py-2 text-xs font-medium text-white shadow-lg">
                <Check className="size-3.5" />
                Selected
              </div>
            </div>
          </div>

          {/* ================= LOCKED DESIGN MESSAGE ================= */}

          <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50 px-5 py-4">
            <p className="text-sm font-medium text-gray-800">
              Fixed card design
            </p>

            <p className="mt-1 text-xs leading-relaxed text-gray-500">
              The card layout and design are fixed. You will
              only be able to edit your profile information,
              profile picture and background on the next
              page.
            </p>
          </div>

          {/* ================= MESSAGE ================= */}

          {message && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {message}
            </div>
          )}

          {/* ================= APPLY ================= */}

          <div className="mt-8 flex justify-end">
            <Button
              type="button"
              onClick={handleApplyChanges}
              disabled={saving}
              className="bg-[#4361ee] px-7 text-white hover:bg-[#3a56d4]"
            >
              {saving
                ? "Applying..."
                : "Apply Changes"}
            </Button>
          </div>
        </section>
      </main>
    </ResponsiveAppShell>
  )
}