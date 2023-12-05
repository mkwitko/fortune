import { ConsultationsEntityContextProvider } from './ConsultationsEntityContext'
import { UserEntityContextProvider } from './UserEntityContext'
import { WalletEntityContextProvider } from './WalletEntityContext'

export default function ContextWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ConsultationsEntityContextProvider>
      <UserEntityContextProvider>
        <WalletEntityContextProvider>{children}</WalletEntityContextProvider>
      </UserEntityContextProvider>
    </ConsultationsEntityContextProvider>
  )
}
