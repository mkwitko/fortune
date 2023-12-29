import React, { useContext, useEffect } from 'react'

import Entities from '@/entities'
import ConsultationsEntity from '@/entities/ConsultationsEntity/ConsultationsEntity'
import Authentication from '@/services/Auth'

interface ConsultationsEntityContextProps {
  Consultations: ConsultationsEntity
}

const ConsultationsEntityContext = React.createContext(
  {} as ConsultationsEntityContextProps,
)

export function ConsultationsEntityContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const entities = Entities()
  const {
    Consultations,
  }: {
    Consultations: ConsultationsEntity
  } = entities

  const { auth } = Authentication()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        Consultations.getHttp(user.uid).then((res: any) => {
          Consultations.hook.setData(res)
          Consultations.setCache(res)
        })
      }
    })
  }, [])

  return (
    <ConsultationsEntityContext.Provider
      value={{
        Consultations,
      }}
    >
      {children}
    </ConsultationsEntityContext.Provider>
  )
}

export const useConsultationsEntityContext = () => {
  const context = useContext(ConsultationsEntityContext)

  return context
}
