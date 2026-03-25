import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Crumb {
  label: string
  href?: string
}

interface Props {
  crumbs: Crumb[]
}

export default function Breadcrumbs({ crumbs }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-gray-500">
      <Link href="/" className="hover:text-navy-600 transition-colors">Home</Link>
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          {crumb.href && i < crumbs.length - 1 ? (
            <Link href={crumb.href} className="hover:text-navy-600 transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
