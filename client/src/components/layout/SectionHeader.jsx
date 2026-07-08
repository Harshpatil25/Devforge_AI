export function SectionHeader({ eyebrow, title, description, action }) {
  return (
    <div className="section-header">
      <div>
        {eyebrow && <p className="section-header__eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {description && <p className="section-header__description">{description}</p>}
      </div>
      {action}
    </div>
  )
}
