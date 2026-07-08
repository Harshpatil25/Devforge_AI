import { useEffect, useState } from 'react'
import { fetchProjects } from '../services/projects'

export function useProjects(userId) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setData([])
      setLoading(false)
      return
    }

    let active = true
    fetchProjects().then((result) => {
      if (active) setData(result)
    }).catch(() => {
      if (active) setData([])
    }).finally(() => {
      if (active) setLoading(false)
    })

    return () => {
      active = false
    }
  }, [userId])

  return { data, loading }
}
