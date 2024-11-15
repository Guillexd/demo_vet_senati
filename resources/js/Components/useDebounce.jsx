import { useState, useEffect } from 'react'

export default function useDebounce(value, delay = 300) {

  const [debounceValue, setDebounceValue] = useState('')

  useEffect(()=>{
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, delay)
    return ()=>{
      clearTimeout(handler)
    }
  }, [value])

  return { debounceValue }
}
