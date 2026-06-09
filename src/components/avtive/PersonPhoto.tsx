import Image from "next/image"

interface PersonPhotoProps {
  className?: string
}

export function PersonPhoto({ className = "" }: PersonPhotoProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src="/card.png"
        alt="Syed Mesum Raza"
        fill
        className="object-cover object-top"
        sizes="(max-width: 100px) 50px, (max-width: 400px) 200px, 400px"
      />
    </div>
  )
}