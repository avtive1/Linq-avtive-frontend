import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import ProfileSettingsForm from "./ProfileSettingsForm"

export default async function ProfileSettingsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const [{ data: profile, error: profileError }, { data: contact, error: contactError }] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("avatar_url, cover_url, name, title, about")
        .eq("id", user.id)
        .maybeSingle(),

      supabase
        .from("contact_information")
        .select("email, country_code, phone, address")
        .eq("user_id", user.id)
        .maybeSingle(),
    ])

  if (profileError) {
    console.error("Error loading profile:", profileError)
  }

  if (contactError) {
    console.error("Error loading contact information:", contactError)
  }

  return (
    <ProfileSettingsForm
      userId={user.id}
      initialProfile={{
        profileImage: profile?.avatar_url ?? null,
        coverImage: profile?.cover_url ?? null,
        name: profile?.name ?? "",
        title: profile?.title ?? "",
        about: profile?.about ?? "",
      }}
      initialContact={{
        email: contact?.email ?? "",
        countryCode: contact?.country_code ?? "+92",
        phone: contact?.phone ?? "",
        address: contact?.address ?? "",
      }}
    />
  )
}