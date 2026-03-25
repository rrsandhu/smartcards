import { cn } from '@/lib/utils'

type Variant = 'navy' | 'gold' | 'green' | 'gray' | 'red' | 'blue' | 'teal'

interface Props {
  children: React.ReactNode
  variant?: Variant
  className?: string
}

const variantStyles: Record<Variant, string> = {
  navy:  'bg-blue-50 text-blue-700 ring-1 ring-blue-100',
  gold:  'bg-teal-50 text-teal-700 ring-1 ring-teal-100',
  teal:  'bg-teal-50 text-teal-700 ring-1 ring-teal-100',
  green: 'bg-green-50 text-green-700 ring-1 ring-green-100',
  gray:  'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
  red:   'bg-red-50 text-red-700 ring-1 ring-red-100',
  blue:  'bg-blue-50 text-blue-700 ring-1 ring-blue-100',
}

export default function Badge({ children, variant = 'gray', className }: Props) {
  return (
    <span className={cn('badge', variantStyles[variant], className)}>
      {children}
    </span>
  )
}
