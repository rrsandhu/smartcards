import Link from 'next/link'
import { Home, DollarSign, TrendingUp, CreditCard, ArrowLeftRight, CheckCircle, Calculator } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Tool } from '@/types'

interface Props {
  tool: Tool
  variant?: 'grid' | 'compact'
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  DollarSign,
  TrendingUp,
  CreditCard,
  ArrowLeftRight,
  CheckCircle,
  Calculator,
}

const categoryColors: Record<string, string> = {
  mortgage:     'bg-blue-100 text-blue-700',
  'credit-card': 'bg-navy-100 text-navy-700',
  debt:         'bg-red-100 text-red-700',
  savings:      'bg-green-100 text-green-700',
  tax:          'bg-gold-100 text-gold-700',
}

export default function ToolCard({ tool, variant = 'grid' }: Props) {
  const Icon = iconMap[tool.icon] ?? Calculator
  const colorClass = categoryColors[tool.category] ?? 'bg-parchment-100 text-gray-700'

  if (variant === 'compact') {
    return (
      <Link href={`/tools/${tool.slug}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-parchment-100 transition-colors group">
        <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0', colorClass)}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900 group-hover:text-navy-600 transition-colors leading-snug">{tool.name}</p>
          <p className="text-xs text-gray-500 truncate">{tool.description.slice(0, 60)}…</p>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/tools/${tool.slug}`} className="card-surface p-6 flex flex-col gap-4 group hover:border-navy-200 transition-colors">
      <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', colorClass)}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 group-hover:text-navy-600 transition-colors mb-1">
          {tool.name}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">{tool.description}</p>
      </div>
      <span className="text-sm text-navy-600 font-medium mt-auto">
        Use Calculator →
      </span>
    </Link>
  )
}
