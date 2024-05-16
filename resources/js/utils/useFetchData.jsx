import { useState, useEffect } from 'react'
import { fetchData } from './utils'

export default function useFetchData(url, dependency = [null], conditional = true) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (conditional) {
      setLoading(true)
      fetchData(url)
        .then(data => {
          setLoading(false)
          setData(data)
        })
    }
  }, dependency)

  return { data, loading }
}
