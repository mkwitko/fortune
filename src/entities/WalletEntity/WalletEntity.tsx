import CoreEntity from '../Core/Core'
import WalletEntityHook from './hooks/WalletEntityHook'
import { HttpMethods } from './methods'

export default class WalletEntity extends CoreEntity {
  constructor() {
    super({
      collection: 'wallets',
    })
  }

  public getMethods = HttpMethods.GET
  public putMethods = HttpMethods.PUT
  public postMethods = HttpMethods.POST
  public deleteMethods = HttpMethods.DELETE

  public hook = WalletEntityHook()
}
