import { useEffect, useState } from 'react'
import { fetchBugs } from '../services/bugs'

export function useBugs(userId) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setData([])
      setLoading(false)
      return
    }

    let active = true
    fetchBugs().then((result) => {
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
