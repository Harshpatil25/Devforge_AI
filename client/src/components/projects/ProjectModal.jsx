import { AnimatePresence, motion } from 'framer-motion'
import { ProjectForm } from './ProjectForm'

export function ProjectModal({ open, project, onClose, onSubmit }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <ProjectForm project={project} onClose={onClose} onSubmit={onSubmit} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
