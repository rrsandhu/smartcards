import { cn } from '@/lib/utils'

interface Props {
  label?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeader({ label, title, subtitle, align = 'left', className }: Props) {
  return (
    <div className={cn(align === 'center' && 'text-center', className)}>
      {label && <p className="section-label mb-2">{label}</p>}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-gray-600 text-base sm:text-lg max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}
