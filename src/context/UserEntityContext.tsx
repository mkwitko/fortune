import React, { useContext, useEffect } from 'react'

import Entities from '@/entities'
import UserEntity from '@/entities/UserEntity/UserEntity'
import Authentication from '@/services/Auth'

interface UserEntityContextProps {
  User: UserEntity
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const UserEntityContext = React.createContext({} as UserEntityContextProps)

export function UserEntityContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const entities = Entities()
  const { auth } = Authentication()

  const [loading, setLoading] = React.useState(false)

  const {
    User,
  }: {
    User: UserEntity
  } = entities

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        User.getHttp(user.uid).then((user: any) => {
          User.hook.setData(user)
          User.setCache(user)
        })
      }
    })
  }, [])

  return (
    <UserEntityContext.Provider
      value={{
        User,
        loading,
        setLoading,
      }}
    >
      {children}
    </UserEntityContext.Provider>
  )
}

export const useUserEntityContext = () => {
  const context = useContext(UserEntityContext)

  return context
}
