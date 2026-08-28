"use client"

import { CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BasicCard } from "./BasicCard"
import { StandardCard } from "./StandardCard"

import type {
  CardTemplate,
  PortfolioLink,
  SkillItem,
  SocialLink,
} from "./card-types"

type VCardPreviewProps = {
  selectedCardTemplate?: CardTemplate
  coverImage: string | null
  profileImage: string | null
  name: string
  title: string
  about: string
  contactEmail: string
  contactPhone: string
  contactCountryCode: string
  contactAddress: string
  socialLinks?: SocialLink[]
  portfolioLinks?: PortfolioLink[]
  services?: string[]
  skills?: SkillItem[]
  coverLetter?: string
}

export function VCardPreview({
  selectedCardTemplate = "basic",
  coverImage,
  profileImage,
  name,
  title,
  about,
  contactEmail,
  contactPhone,
  contactCountryCode,
  contactAddress,
  socialLinks = [],
  portfolioLinks = [],
  services = [],
  skills = [],
  coverLetter = "",
}: VCardPreviewProps) {
  return (
    <div className="w-full min-w-0 lg:w-[360px]">
      <div className="sticky top-8">
        {/* ================= PREVIEW HEADER ================= */}
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

        {/* ================= TEMPLATE ================= */}
        {selectedCardTemplate === "standard" ? (
          <StandardCard
            coverImage={coverImage}
            profileImage={profileImage}
            name={name}
            title={title}
            about={about}
            contactEmail={contactEmail}
            contactPhone={contactPhone}
            contactCountryCode={contactCountryCode}
            contactAddress={contactAddress}
            socialLinks={socialLinks}
            portfolioLinks={portfolioLinks}
            services={services}
            skills={skills}
            coverLetter={coverLetter}
          />
        ) : (
          <BasicCard
            coverImage={coverImage}
            profileImage={profileImage}
            name={name}
            title={title}
            about={about}
            contactEmail={contactEmail}
            contactPhone={contactPhone}
            contactCountryCode={contactCountryCode}
            contactAddress={contactAddress}
            socialLinks={socialLinks}
            portfolioLinks={portfolioLinks}
            services={services}
            skills={skills}
            coverLetter={coverLetter}
          />
        )}
      </div>
    </div>
  )
}