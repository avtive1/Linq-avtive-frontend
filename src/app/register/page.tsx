"use client"

import { useState } from "react"
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BackButton, SocialLoginButtons, LeftPanel, LanguageSelector } from "@/components/avtive"
import { createClient } from '@supabase/supabase-js';
import { useRouter } from "next/navigation";


export default function RegisterPage() {
const [showPassword, setShowPassword] = useState(false);

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const router = useRouter();

const handleRegister = async () => {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim().toLowerCase();

  if (!trimmedName || !trimmedEmail) {
    setError("Please fill all fields.");
    return;
  }

  try {
    setLoading(true);
    setError("");

    const supabase = createClient('https://lmwnwinkjlyebtlgfwac.supabase.co', 'sb_publishable_h4Hh52S6-nZCwNiUsSC0Ng_iPqsolwF');

    const { data, error } = await supabase.auth.signInWithOtp({
      email: trimmedEmail,
      options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
  },
    });

    if (error) {
      setError(error.message);
      return;
    }

    router.push(`/verify-email?email=${encodeURIComponent(trimmedEmail)}`);
  } catch (err: unknown) {
    setError(
      err instanceof Error
        ? err.message
        : "Registration failed. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden">
      {/* Left Panel - Branding */}
      <LeftPanel variant="light" />

      {/* Right Panel - Registration Form */}
      <div className="flex w-full min-w-0 flex-col bg-white px-4 py-8 sm:px-8 lg:w-1/2 lg:px-12">
        {/* Top bar */}
        <div className="mx-auto flex w-full max-w-md flex-wrap items-center justify-between gap-2">
          <BackButton />
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Already have an account?</span>
            <a
              href="/login"
              className="inline-flex h-8 items-center rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              Login
            </a>
          </div>
        </div>

        {/* Center content */}
        <div className="flex flex-1 items-center justify-center">
          <div className="flex w-full max-w-md flex-col items-center gap-6">
            {/* Avatar */}
            <div className="flex size-16 items-center justify-center rounded-full bg-gray-100">
              <User className="size-8 text-gray-400" />
            </div>

            {/* Title */}
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-gray-800">
                Create a new account
              </h1>
              <p className="text-sm text-gray-500">Enter your details to register.</p>
            </div>

            {/* Social Login */}
            <SocialLoginButtons />

            {/* Divider */}
            <div className="flex w-full items-center gap-4">
              <Separator className="flex-1" />
              <span className="text-xs font-medium text-gray-400">OR</span>
              <Separator className="flex-1" />
            </div>

            {/* Form */}
            <div className="flex w-full flex-col gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                  <Input
                      id="fullName"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="h-11 rounded-lg border-gray-200 bg-gray-50/50 pl-10 text-sm focus:border-[#4361ee] focus:ring-[#4361ee]/20"
                    />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="h-11 rounded-lg border-red-300 bg-gray-50/50 pl-10 text-sm focus:border-red-400 focus:ring-red-200"
                  />
                </div>
                {error && (
                    <p className="text-xs font-medium text-red-500">
                          {error}
                    </p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-11 rounded-lg border-gray-200 bg-gray-50/50 pl-10 pr-10 text-sm focus:border-[#4361ee] focus:ring-[#4361ee]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-400">
                  Must contain 1 uppercase letter, 1 number, min. 8 characters.
                </p>
              </div>
            </div>

            {/* Register Button */}
            <Button
               onClick={handleRegister}
                disabled={loading}
                className="h-12 w-full rounded-lg bg-[#4361ee] text-base font-semibold text-white hover:bg-[#3a56d4]"
            >
                {loading ? "Creating Account..." : "Register"}
            </Button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex w-full max-w-md mx-auto items-center justify-end">
          <LanguageSelector />
        </div>
      </div>
    </div>
  )
}
