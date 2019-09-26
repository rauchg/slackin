import { useState, useEffect } from 'react'
import { getUsers } from './slack'

export const useUsers = () => {
  const [users, setUsers] = useState()

  useEffect(() => {
    let isMounted = true
    let timeout

    const fetchData = async () => {
      const data = await getUsers()

      if (isMounted) {
        setUsers(data.users)
        timeout = setTimeout(fetchData, 2000)
      }
    }

    fetchData()

    return () => {
      isMounted = false
      clearTimeout(timeout)
    }
  }, [])

  return users
}

// Watches an object and returns a new object indicating changed properties, it resets the changes
// after a timeout has finished. It's used for animations.
export const useChanged = (data, ms) => {
  const [copy, setCopy] = useState({ data, changed: {} })

  useEffect(() => {
    let timeout

    if (!data) return
    if (!copy.data) {
      setCopy({ data, changed: {} })
    } else {
      const changed = Object.keys(data).reduce(
        (obj, k) => Object.assign(obj, { [k]: data[k] !== copy.data[k] }),
        {}
      )

      if (Object.keys(changed).length) {
        setCopy({ data, changed })
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => setCopy({ data, changed: {} }), ms)
      }
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [data])

  return copy.changed
}
