import Link from 'next/link'
import { ArrowLeft } from 'phosphor-react'

interface Props {
  backButton: string
  color: string
  title?: string
  subtitle?: string
  invertColor?: boolean
}

export function Header({ backButton, color, title, subtitle, invertColor }: Props) {
  return (
    <div className="flex h-12">
      <div className="flex items-center justify-center w-12">
        <Link href={backButton}>
          <a
            style={{ backgroundColor: "rgba(0, 0, 0, .1)" }}
            className={invertColor
              ? "h-12 w-12 flex justify-center items-center rounded-md"
              : ""
            }
          >
            <ArrowLeft size={24} color={invertColor ? "#fff" : color} />
          </a>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center flex-1">
        {title && (
          <h1
            className="text-2xl font-semibold text-neutral-800"
            style={{ color: invertColor ? "#fff" : "#1b1b1b" }}
          >
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="text-sm font-normal text-neutral-400">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center justify-center w-12"></div>
    </div>
  )
}
