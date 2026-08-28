export type CardTemplate = "basic" | "standard"

export type SocialPlatformKey =
  | "facebook"
  | "instagram"
  | "twitter"
  | "linkedin"
  | "behance"
  | "pinterest"
  | "snapchat"

export type SocialLink = {
  platform: SocialPlatformKey
  username: string
}

export type PortfolioLink = {
  id: string
  platform: string
  username: string
}

export type SkillItem = {
  id: string
  name: string
  featured: boolean
}