import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export function QuickActionCard({ title, description, icon: Icon, to }) {
  return (
    <motion.div whileHover={{ y: -2, scale: 1.01 }} transition={{ duration: 0.2 }} className="workspace-card workspace-card--compact">
      <Link to={to} className="workspace-card__link">
        <div className="workspace-card__icon">
          <Icon size={18} />
        </div>
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <ArrowRight size={16} className="workspace-card__arrow" />
      </Link>
    </motion.div>
  )
}
