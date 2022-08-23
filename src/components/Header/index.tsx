import Link from 'next/link'
import { ArrowLeft } from 'phosphor-react'

interface Props {
  backButton: string
  color: string
  title?: string
  subtitle?: string
}

export function Header({ backButton, color, title, subtitle }: Props) {
  return (
    <div className="flex h-12">
      <div className="flex items-center justify-center w-12">
        <Link href={backButton}>
          <ArrowLeft size={24} color={color} />
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center flex-1">
        {title && (
          <h1 className="text-2xl font-semibold text-neutral-800">{title}</h1>
        )}
        {subtitle && (
          <p className="text-sm font-normal text-neutral-400">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center justify-center w-12"></div>
    </div>
  )
}
