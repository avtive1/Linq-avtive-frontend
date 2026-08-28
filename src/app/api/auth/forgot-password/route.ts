import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Please enter your email address." },
        { status: 400 }
      )
    }

    const normalizedEmail = email.trim().toLowerCase()

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

    if (!supabaseUrl || !supabaseSecretKey) {
      console.error("Supabase server environment variables are missing.")

      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      )
    }

    if (!siteUrl) {
      console.error("NEXT_PUBLIC_SITE_URL is missing.")

      return NextResponse.json(
        { error: "Site URL is not configured." },
        { status: 500 }
      )
    }

    // Server-side Supabase Admin client
    // IMPORTANT: secret key is used only on the server.
    const supabaseAdmin = createClient(
      supabaseUrl,
      supabaseSecretKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
          detectSessionInUrl: false,
        },
      }
    )

    // Check Supabase Auth users
    let page = 1
    const perPage = 1000
    let userFound = false

    while (true) {
      const { data, error } =
        await supabaseAdmin.auth.admin.listUsers({
          page,
          perPage,
        })

      if (error) {
        console.error("Error checking user:", error)

        return NextResponse.json(
          { error: "Something went wrong. Please try again." },
          { status: 500 }
        )
      }

      const foundUser = data.users.find(
        (user) =>
          user.email?.toLowerCase() === normalizedEmail
      )

      if (foundUser) {
        userFound = true
        break
      }

      if (data.users.length < perPage) {
        break
      }

      page++
    }

    // User does not exist
    if (!userFound) {
      return NextResponse.json(
        { error: "This email is not registered." },
        { status: 404 }
      )
    }

    // User exists → send password reset email
    const { error: resetError } =
      await supabaseAdmin.auth.resetPasswordForEmail(
        normalizedEmail,
        {
          redirectTo: `${siteUrl}/update-password`,
        }
      )

    if (resetError) {
      console.error(
        "Password reset error:",
        resetError
      )

      return NextResponse.json(
        {
          error:
            "Failed to send password reset email.",
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message:
        "Password reset email sent successfully.",
    })
  } catch (error) {
    console.error(
      "Forgot password API error:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Something went wrong. Please try again.",
      },
      { status: 500 }
    )
  }
}