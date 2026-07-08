import { AnimatePresence, motion } from 'framer-motion'
import {
  Command,
  Search,
  Sparkles,
  Bug,
  FolderKanban,
  Settings,
  BookOpenText,
  Bot,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const commands = [
  {
    id: 'project',
    label: 'Create Project',
    icon: FolderKanban,
    action: '/projects',
  },
  {
    id: 'bug',
    label: 'New Bug',
    icon: Bug,
    action: '/bug-vault',
  },
  {
    id: 'settings',
    label: 'Open Settings',
    icon: Settings,
    action: '/settings',
  },
  {
    id: 'readme',
    label: 'Generate README',
    icon: BookOpenText,
    action: '/ai-workspace',
  },
  {
    id: 'ai',
    label: 'Open AI',
    icon: Bot,
    action: '/ai-workspace',
  },
]

export function CommandPalette({ open, onClose }) {
  const navigate = useNavigate()

  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  // Filter commands FIRST
  const filteredCommands = useMemo(() => {
    const value = query.trim().toLowerCase()

    if (!value) return commands

    return commands.filter((item) =>
      item.label.toLowerCase().includes(value)
    )
  }, [query])

  useEffect(() => {
    if (!open) {
      setQuery('')
      setActiveIndex(0)
      return
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()

        if (filteredCommands.length === 0) return

        setActiveIndex((current) => (current + 1) % filteredCommands.length)
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()

        if (filteredCommands.length === 0) return

        setActiveIndex(
          (current) =>
            (current - 1 + filteredCommands.length) %
            filteredCommands.length
        )
      }

      if (event.key === 'Enter') {
        event.preventDefault()

        const item = filteredCommands[activeIndex]

        if (item) {
          navigate(item.action)
          onClose()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, activeIndex, filteredCommands, navigate, onClose])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  if (!open) return null

  return (
    <AnimatePresence>
      <motion.div
        className="command-palette-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="command-palette"
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="command-palette__header">
            <div className="command-palette__icon">
              <Command size={16} />
            </div>

            <div className="command-palette__input-shell">
              <Search size={16} />

              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search commands..."
              />
            </div>
          </div>

          <div className="command-palette__body">
            {filteredCommands.length > 0 ? (
              filteredCommands.map((command, index) => {
                const Icon = command.icon

                return (
                  <button
                    key={command.id}
                    type="button"
                    className={`command-palette__item ${
                      index === activeIndex ? 'is-active' : ''
                    }`}
                    onClick={() => {
                      navigate(command.action)
                      onClose()
                    }}
                  >
                    <Icon size={16} />

                    <span>{command.label}</span>

                    <Sparkles size={14} />
                  </button>
                )
              })
            ) : (
              <div className="command-palette__empty">
                No matching commands
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}