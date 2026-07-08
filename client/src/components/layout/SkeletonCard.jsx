export function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-card__line skeleton-card__line--short" />
      <div className="skeleton-card__line" />
      <div className="skeleton-card__line skeleton-card__line--short" />
    </div>
  )
}
