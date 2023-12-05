import React, { useContext, useEffect } from 'react'
import Authentication from '@/services/Auth'
import { usePathname, router } from 'expo-router'

const AuthContext = React.createContext({})

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const { auth } = Authentication()

  auth.onAuthStateChanged((user: any) => {
    if (user && user.uid && pathname.includes('auth')) {
      router.replace('/')
    }

    if (!user && !pathname.includes('auth')) {
      router.replace('/auth/login')
    }
  })

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  return context
}
