interface SectionHeaderProps {
  tag?: string
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
}

export default function SectionHeader({ tag, title, subtitle, centered = true, light = false }: SectionHeaderProps) {
  return (
    <div className={`mb-10 md:mb-14 ${centered ? 'text-center' : ''}`}>
      {tag && (
        <div className="flex items-center gap-2 mb-3 justify-center">
          <div className="h-px flex-1 max-w-8 bg-amber-400 opacity-60" />
          <span className={`text-xs font-semibold tracking-[0.2em] uppercase ${light ? 'text-amber-300' : 'text-amber-600'}`}>
            {tag}
          </span>
          <div className="h-px flex-1 max-w-8 bg-amber-400 opacity-60" />
        </div>
      )}
      <h2 className={`font-heading text-3xl md:text-4xl font-bold leading-tight ${light ? 'text-white' : 'text-forest-800'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-base md:text-lg max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-gray-300' : 'text-gray-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
