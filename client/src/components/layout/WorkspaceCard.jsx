import { motion } from 'framer-motion'

export function WorkspaceCard({ title, subtitle, meta, children, compact = false }) {
  return (
    <motion.div whileHover={{ y: -2, scale: 1.005 }} transition={{ duration: 0.2 }} className={`workspace-card ${compact ? 'workspace-card--compact' : ''}`}>
      {(title || subtitle || meta) && (
        <div className="workspace-card__header">
          <div>
            {title && <h3>{title}</h3>}
            {subtitle && <p>{subtitle}</p>}
          </div>
          {meta && <span className="workspace-card__meta">{meta}</span>}
        </div>
      )}
      <div className="workspace-card__body">{children}</div>
    </motion.div>
  )
}
