import { getCache } from '@/services/Cache'
import React, { useEffect } from 'react'

export default function ConsultationsEntityHook() {
  const [data, setData] = React.useState<any>(null)
  const [current, setCurrent] = React.useState<any>(null)

  useEffect(() => {
    getCache('currentConsultation').then((e) => {
      setCurrent(e)
    })
  }, [])

  return { data, setData, current, setCurrent }
}
