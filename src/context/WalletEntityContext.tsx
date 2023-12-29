import React, { useContext, useEffect } from 'react'

import Entities from '@/entities'
import WalletEntity from '@/entities/WalletEntity/WalletEntity'
import Authentication from '@/services/Auth'
import { decrypt } from '@/services/Encrypt'
import firebaseApp from '@/infra/Firebase'
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import { id } from 'date-fns/locale'
import { toast } from 'react-toastify'

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
          const data = +decrypt(res.balance)
          Wallet.hook.setData(data)
          Wallet.setCache(data)
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
