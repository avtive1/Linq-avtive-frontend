"use client"

import { supabase } from "@/lib/supabase/client"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Star,
  Settings,
  Crown,
  Diamond,
  ChevronDown,
} from "lucide-react"
import {
  createClient,
  type SupabaseClient,
} from "@supabase/supabase-js"

import { Button } from "@/components/ui/button"
import { ResponsiveAppShell } from "@/components/layout/ResponsiveAppShell"
import { renderSettingsTopTabs } from "@/components/layout/settingsTopTabs"

type ThemeId = "basic" | "standard" | "premium" | "platinum"
type SelectableThemeId = "basic" | "standard"
type LanguageId = "en-US" | "en-GB" | "ur-PK"

type SettingsRow = {
  user_id: string
  language: LanguageId | null
  subscription_theme: ThemeId | null
  vcard_theme: SelectableThemeId | null
  updated_at?: string
}

type SavedSettings = {
  language: LanguageId
  subscriptionTheme: ThemeId
}

const themes = [
  {
    id: "basic" as const,
    label: "Basic",
    icon: Star,
    available: true,
  },
  {
    id: "standard" as const,
    label: "Standard",
    icon: Settings,
    available: true,
  },
  {
    id: "premium" as const,
    label: "Premium",
    icon: Crown,
    available: false,
  },
  {
    id: "platinum" as const,
    label: "Platinum",
    icon: Diamond,
    available: false,
  },
]

const languageOptions: {
  id: LanguageId
  label: string
}[] = [
  {
    id: "en-US",
    label: "🇺🇸 English (US)",
  },
  {
    id: "en-GB",
    label: "🇬🇧 English (UK)",
  },
  {
    id: "ur-PK",
    label: "🇵🇰 Urdu (Pakistan)",
  },
]

function getSupabaseClient(): SupabaseClient | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return null
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  })
}

export default function SettingsPage() {
  const router = useRouter()

  
  const [savedSettings, setSavedSettings] =
    useState<SavedSettings>({
      language: "en-US",
      subscriptionTheme: "basic",
    })

  const [draftLanguage, setDraftLanguage] =
    useState<LanguageId>("en-US")

  const [draftTheme, setDraftTheme] =
    useState<ThemeId>("basic")

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)

  const hasChanges = useMemo(() => {
    return (
      draftLanguage !== savedSettings.language ||
      draftTheme !== savedSettings.subscriptionTheme
    )
  }, [
    draftLanguage,
    draftTheme,
    savedSettings.language,
    savedSettings.subscriptionTheme,
  ])

  useEffect(() => {
    if (!supabase) {
      setMessage(
        "Supabase configuration is missing. Please check your environment variables.",
      )
      setIsError(true)
      setLoading(false)
      return
    }

    let isMounted = true

    const loadSettings = async () => {
      try {
        setLoading(true)
        setMessage("")
        setIsError(false)

        /*
         * First check whether the user has a valid session.
         */
        const {
          data: sessionData,
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError) {
          if (isMounted) {
            setMessage(
              `Authentication error: ${sessionError.message}`,
            )
            setIsError(true)
          }
          return
        }

        const session = sessionData.session

        /*
         * If there is no session, do not try to save/load
         * settings with an invalid user.
         */
        if (!session?.user) {
          if (isMounted) {
            setMessage(
              "You are not logged in. Please sign in again.",
            )
            setIsError(true)
          }
          return
        }

        const userId = session.user.id

        /*
         * Load existing user settings.
         */
        const { data, error } = await supabase
          .from("user_settings")
          .select(
            "user_id, language, subscription_theme, vcard_theme, updated_at",
          )
          .eq("user_id", userId)
          .maybeSingle()

        if (error) {
          if (isMounted) {
            setMessage(
              `Unable to load settings: ${error.message}`,
            )
            setIsError(true)
          }
          return
        }

        /*
         * No settings saved yet.
         */
        if (!data) {
          if (isMounted) {
            setSavedSettings({
              language: "en-US",
              subscriptionTheme: "basic",
            })

            setDraftLanguage("en-US")
            setDraftTheme("basic")
          }
          return
        }

        const settings = data as SettingsRow

        const loadedLanguage =
          settings.language &&
          languageOptions.some(
            (item) => item.id === settings.language,
          )
            ? settings.language
            : "en-US"

        const loadedTheme =
          settings.subscription_theme &&
          themes.some(
            (item) =>
              item.id === settings.subscription_theme,
          )
            ? settings.subscription_theme
            : "basic"

        if (isMounted) {
          setSavedSettings({
            language: loadedLanguage,
            subscriptionTheme: loadedTheme,
          })

          setDraftLanguage(loadedLanguage)
          setDraftTheme(loadedTheme)
        }
      } catch (error) {
        if (isMounted) {
          setMessage(
            error instanceof Error
              ? `Unable to load settings: ${error.message}`
              : "Unable to load settings.",
          )
          setIsError(true)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    void loadSettings()

    return () => {
      isMounted = false
    }
  }, [supabase])

  const handleThemeSelect = (themeId: ThemeId) => {
    const selectedTheme = themes.find(
      (theme) => theme.id === themeId,
    )

    if (!selectedTheme?.available) {
      setMessage(
        `${selectedTheme?.label || "This theme"} is coming soon.`,
      )
      setIsError(false)
      return
    }

    setDraftTheme(themeId)
    setMessage("")
    setIsError(false)
  }

  const handleDiscard = () => {
    setDraftLanguage(savedSettings.language)
    setDraftTheme(savedSettings.subscriptionTheme)
    setMessage("")
    setIsError(false)
  }

  const handleApplyChanges = async () => {
    if (saving || loading) {
      return
    }

    /*
     * Only Basic and Standard can be selected.
     */
    if (
      draftTheme !== "basic" &&
      draftTheme !== "standard"
    ) {
      setMessage(
        "Only Basic and Standard themes are currently available.",
      )
      setIsError(true)
      return
    }

    if (!supabase) {
      setMessage(
        "Supabase configuration is missing. Please check NEXT_PUBLIC_SUPABASE_URL and your Supabase key.",
      )
      setIsError(true)
      return
    }

    try {
      setSaving(true)
      setMessage("")
      setIsError(false)

      /*
       * Check the currently stored session.
       */
      const {
        data: sessionData,
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError) {
        setMessage(
          `Authentication error: ${sessionError.message}`,
        )
        setIsError(true)
        return
      }

      let session = sessionData.session

      /*
       * Extra user check.
       * This gives us the actual authenticated user when
       * a valid session exists.
       */
      if (!session?.user) {
        const {
          data: userData,
          error: userError,
        } = await supabase.auth.getUser()

        if (userError || !userData.user) {
          setMessage(
            "Your login session is missing or has expired. Please sign in again.",
          )
          setIsError(true)

          /*
           * IMPORTANT:
           * Change /login below only if your actual login
           * page uses a different route.
           */
          setTimeout(() => {
            router.push("/login")
          }, 800)

          return
        }

        /*
         * If getUser succeeds but getSession did not,
         * reload the page so Supabase can restore storage.
         */
        const {
          data: refreshedSession,
        } = await supabase.auth.getSession()

        session = refreshedSession.session
      }

      /*
       * Final authentication validation.
       */
      if (!session?.user) {
        setMessage(
          "Authentication session missing. Please log in again.",
        )
        setIsError(true)

        setTimeout(() => {
          router.push("/login")
        }, 800)

        return
      }

      const userId = session.user.id

      const selectedVcardTheme: SelectableThemeId =
        draftTheme === "standard"
          ? "standard"
          : "basic"

      /*
       * Save selected language and theme to Supabase.
       */
      const { data, error } = await supabase
        .from("user_settings")
        .upsert(
          {
            user_id: userId,
            language: draftLanguage,
            subscription_theme: draftTheme,
            vcard_theme: selectedVcardTheme,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "user_id",
          },
        )
        .select(
          "user_id, language, subscription_theme, vcard_theme, updated_at",
        )
        .single()

      if (error) {
        setMessage(
          `Unable to save settings: ${error.message}`,
        )
        setIsError(true)
        return
      }

      const savedData = data as SettingsRow

      const finalLanguage =
        savedData.language || draftLanguage

      const finalTheme =
        savedData.subscription_theme || draftTheme

      setSavedSettings({
        language: finalLanguage,
        subscriptionTheme: finalTheme,
      })

      setDraftLanguage(finalLanguage)
      setDraftTheme(finalTheme)

      setMessage(
        "Settings saved successfully. Redirecting to your V-Card...",
      )
      setIsError(false)

      /*
       * Selected category is now saved.
       * Redirect user to the V-Card page.
       */
      setTimeout(() => {
        setTimeout(() => {
        router.push(`/settings/v-card?theme=${draftTheme}`)
      }, 700)
      }, 700)
    } catch (error) {
      setMessage(
        error instanceof Error
          ? `Unable to save settings: ${error.message}`
          : "Unable to save settings.",
      )
      setIsError(true)
    } finally {
      setSaving(false)
    }
  }

  return (
    <ResponsiveAppShell
      topTabs={renderSettingsTopTabs("general")}
    >
      <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)_340px] lg:gap-7">
        {/* ================= LEFT SIDEBAR ================= */}

        <aside className="min-w-0 lg:pt-1">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Select Menu
            </h3>

            <div className="flex flex-col gap-1">
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-lg bg-gray-100 px-3.5 py-2.5 text-left text-sm font-medium text-gray-800"
              >
                Subscription Theme
              </button>

              <button
                type="button"
                onClick={() => setTimeout(() => {
                router.push(`/settings/v-card?theme=${draftTheme}`)
              }, 700)}
                className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-left text-sm text-gray-600 transition hover:bg-gray-50"
              >
                V-Card
              </button>
            </div>
          </div>
        </aside>

        {/* ================= MAIN CONTENT ================= */}

        <main className="min-w-0">
          {/* LANGUAGE */}

          <div className="mb-7">
            <label
              htmlFor="language"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Language*
            </label>

            <div className="relative">
              <select
                id="language"
                value={draftLanguage}
                onChange={(event) => {
                  setDraftLanguage(
                    event.target.value as LanguageId,
                  )
                  setMessage("")
                  setIsError(false)
                }}
                disabled={loading || saving}
                className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm text-gray-700 outline-none transition focus:border-[#4361ee] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {languageOptions.map((language) => (
                  <option
                    key={language.id}
                    value={language.id}
                  >
                    {language.label}
                  </option>
                ))}
              </select>

              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* SUBSCRIPTION THEME */}

          <section>
            <h1 className="text-xl font-semibold text-gray-800">
              Subscription Theme
            </h1>

            <p className="mb-5 mt-1 text-sm text-gray-500">
              Pick a category to personalize your V-Card.
            </p>

            <div className="grid grid-cols-1 gap-3">
              {themes.map((theme) => {
                const Icon = theme.icon

                const selected =
                  draftTheme === theme.id

                return (
                  <button
                    key={theme.id}
                    type="button"
                    disabled={
                      loading ||
                      saving ||
                      !theme.available
                    }
                    onClick={() =>
                      handleThemeSelect(theme.id)
                    }
                    className={[
                      "flex w-full items-center gap-3 rounded-xl border bg-white p-3.5 text-left transition",
                      !theme.available
                        ? "cursor-not-allowed opacity-60"
                        : "cursor-pointer hover:border-gray-300",
                      selected
                        ? "border-[#4361ee] shadow-[0_0_0_2px_rgba(67,97,238,0.08)]"
                        : "border-gray-200",
                    ].join(" ")}
                  >
                    <Icon
                      className={[
                        "size-5 shrink-0",
                        selected
                          ? "text-[#4361ee]"
                          : "text-gray-400",
                      ].join(" ")}
                    />

                    <div className="min-w-0">
                      <span className="block text-sm font-medium text-gray-800">
                        {theme.label}
                      </span>

                      <span className="text-xs text-gray-500">
                        {theme.available
                          ? "Select this category"
                          : "Coming soon"}
                      </span>
                    </div>

                    <span
                      className={[
                        "ml-auto flex size-4 shrink-0 items-center justify-center rounded-full border-2",
                        selected
                          ? "border-[#4361ee]"
                          : "border-gray-300",
                      ].join(" ")}
                    >
                      {selected && (
                        <span className="size-1.5 rounded-full bg-[#4361ee]" />
                      )}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* STATUS MESSAGE */}

            {message && (
              <p
                className={[
                  "mt-4 text-sm",
                  isError
                    ? "text-red-500"
                    : "text-green-600",
                ].join(" ")}
              >
                {message}
              </p>
            )}

            {/* ACTION BUTTONS */}

            <div className="mt-8 flex flex-wrap items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleDiscard}
                disabled={
                  loading ||
                  saving ||
                  !hasChanges
                }
              >
                Discard
              </Button>

              <Button
                type="button"
                onClick={handleApplyChanges}
                disabled={loading || saving}
                className="bg-[#4361ee] text-white hover:bg-[#3a56d4]"
              >
                {saving
                  ? "Saving..."
                  : "Apply Changes"}
              </Button>
            </div>
          </section>
        </main>

        {/* ================= RIGHT PREVIEW ================= */}

        <aside className="w-full min-w-0 lg:w-[340px]">
          <div className="rounded-xl border border-gray-100 bg-white p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-gray-800">
                Card Live Preview
              </h3>

              <Button
                type="button"
                onClick={() => setTimeout(() => {
                router.push(`/settings/v-card?theme=${draftTheme}`)
                }, 700)}
                disabled={saving}
                className="shrink-0 rounded-lg bg-[#4361ee] px-4 text-xs font-medium text-white hover:bg-[#3a56d4]"
              >
                View Card
              </Button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div
                className={[
                  "min-h-[170px] p-5 transition",
                  draftTheme === "standard"
                    ? "bg-[#7BD0BA]"
                    : "bg-gradient-to-br from-gray-800 to-gray-950",
                ].join(" ")}
              >
                <p className="text-base font-bold text-white">
                  Your Name
                </p>

                <p className="mt-1 text-xs text-white/70">
                  Your professional title
                </p>
              </div>

              <div className="p-4">
                <p className="text-xs font-semibold text-gray-800">
                  {draftTheme === "standard"
                    ? "Standard V-Card"
                    : "Basic V-Card"}
                </p>

                <p className="mt-2 text-[11px] leading-relaxed text-gray-500">
                  Your selected category will be saved
                  and automatically used for your V-Card.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </ResponsiveAppShell>
  )
}
