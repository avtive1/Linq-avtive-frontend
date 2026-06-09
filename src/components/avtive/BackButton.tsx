"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function BackButton() {
  const router = useRouter()
  
  return (
    <Button
      variant="outline"
      onClick={() => router.back()}
      className="gap-1.5 rounded-lg border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
    >
      <ArrowLeft className="size-4" />
      Back
    </Button>
  )
}
