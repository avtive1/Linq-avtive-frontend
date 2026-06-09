import { Button } from "@/components/ui/button"

export function SocialLoginButtons() {
  return (
    <div className="flex items-center justify-center gap-3">
      <Button
        type="button"
        variant="outline"
        className="h-11 w-11 rounded-full border-gray-200 bg-white p-0 hover:bg-gray-50"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-black">
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.53 9.42 7.82c1.32.07 2.22.72 2.98.77.99-.2 1.94-.87 3-.94 1.24-.08 2.18.33 2.82 1.04-2.58 1.56-1.97 4.97.57 5.93-.54 1.36-1.23 2.7-2.74 2.72zM12.03 7.8c-.15-2.3 1.66-4.2 3.82-4.4.29 2.66-2.37 4.63-3.82 4.4z" />
        </svg>
      </Button>
      <Button
        type="button"
        variant="outline"
        className="h-11 w-11 rounded-full border-gray-200 bg-white p-0 hover:bg-gray-50"
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
      </Button>
      <Button
        type="button"
        variant="outline"
        className="h-11 w-11 rounded-full border-gray-200 bg-white p-0 hover:bg-gray-50"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </Button>
    </div>
  )
}
