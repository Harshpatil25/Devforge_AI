export function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow ? <p className="text-sm font-medium uppercase tracking-[0.24em] text-violet-400">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-slate-400">{description}</p> : null}
    </div>
  )
}
