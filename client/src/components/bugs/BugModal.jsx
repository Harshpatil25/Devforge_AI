import { AnimatePresence, motion } from 'framer-motion'
import { BugForm } from './BugForm'

export function BugModal({ open, bug, onClose, onSubmit }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <BugForm bug={bug} onClose={onClose} onSubmit={onSubmit} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
