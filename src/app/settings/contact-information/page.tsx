import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import ContactInformationForm from "./contact_information_form"

export default async function ContactInformationPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const [{ data: contact, error: contactError }, { data: profile, error: profileError }] =
    await Promise.all([
      supabase
        .from("contact_information")
        .select("email, country_code, phone, address")
        .eq("user_id", user.id)
        .maybeSingle(),

      supabase
        .from("profiles")
        .select("avatar_url, cover_url, name, title, about")
        .eq("id", user.id)
        .maybeSingle(),
    ])

  if (contactError) {
    console.error("Error loading contact information:", contactError)
  }

  if (profileError) {
    console.error("Error loading profile:", profileError)
  }

  return (
    <ContactInformationForm
      initialContact={{
        email: contact?.email ?? "",
        countryCode: contact?.country_code ?? "+92",
        phone: contact?.phone ?? "",
        address: contact?.address ?? "",
      }}
      initialProfile={{
        profileImage: profile?.avatar_url ?? null,
        coverImage: profile?.cover_url ?? null,
        name: profile?.name ?? "",
        title: profile?.title ?? "",
        about: profile?.about ?? "",
      }}
    />
  )
}