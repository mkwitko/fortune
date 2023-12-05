import CoreEntity from '../Core/Core'
import UserEntityHook from './hooks/UserEntityHook'
import { HttpMethods } from './methods'

export default class UserEntity extends CoreEntity {
  constructor() {
    super({
      collection: 'users',
    })
  }

  public getMethods = HttpMethods.GET
  public putMethods = HttpMethods.PUT
  public postMethods = HttpMethods.POST
  public deleteMethods = HttpMethods.DELETE

  public hook = UserEntityHook()
}
