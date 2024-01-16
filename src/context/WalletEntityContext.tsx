import React, { useContext, useEffect } from 'react'

import Entities from '@/entities'
import WalletEntity from '@/entities/WalletEntity/WalletEntity'
import Authentication from '@/services/Auth'

interface WalletEntityContextProps {
  Wallet: WalletEntity
}

const WalletEntityContext = React.createContext({} as WalletEntityContextProps)

export function WalletEntityContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const entities = Entities()
  const {
    Wallet,
  }: {
    Wallet: WalletEntity
  } = entities

  const { auth } = Authentication()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        Wallet.getHttp(user.uid).then((res: any) => {
          Wallet.hook.setData(res)
          Wallet.setCache(res)
        })
      }
    })
  }, [])

  return (
    <WalletEntityContext.Provider
      value={{
        Wallet,
      }}
    >
      {children}
    </WalletEntityContext.Provider>
  )
}

export const useWalletEntityContext = () => {
  const context = useContext(WalletEntityContext)

  return context
}
