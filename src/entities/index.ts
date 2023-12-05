import ConsultationsEntity from './ConsultationsEntity/ConsultationsEntity'
import UserEntity from './UserEntity/UserEntity'
import WalletEntity from './WalletEntity/WalletEntity'

export default function Entities() {
  const Consultations = new ConsultationsEntity()
  const User = new UserEntity()
  const Wallet = new WalletEntity()

  return {
    Consultations,
    User,
    Wallet,
  }
}
