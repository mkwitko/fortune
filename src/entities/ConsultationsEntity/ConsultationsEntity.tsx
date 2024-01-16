import Authentication from '@/services/Auth'
import CoreEntity from '../Core/Core'
import ConsultationsEntityHook from './hooks/ConsultationsEntityHook'
import { HttpMethods } from './methods'
import { router } from 'expo-router'
import { RandomNumbers } from '@/services/RandomNumbers'
import generateUUID from '@/services/GenerateUUID'
import Consultation from '@/app/consultation'
import { parseISO } from 'date-fns'

export default class ConsultationsEntity extends CoreEntity {
  constructor() {
    super({
      collection: 'Consultations',
    })
  }

  authentication = Authentication()

  public getMethods = HttpMethods.GET
  public putMethods = HttpMethods.PUT
  public postMethods = HttpMethods.POST
  public deleteMethods = HttpMethods.DELETE

  public hook = ConsultationsEntityHook()

  async makeConsultation(data: any) {
    const uuid = generateUUID()
    const randomNumbers = RandomNumbers().getRandomNumbers(1, 12, 3)
    const dataToAdd = {
      ...data,
      randomNumbers,
      uuid,
      createdAt: parseISO(new Date().toISOString()),
    }
    router.push('/consultation')
    this.hook.setCurrent(dataToAdd)
    this.setCache(dataToAdd, true, 'currentConsultation')
    if (!this.hook.data) {
      this.insert({
        data: {
          id: this.authentication.auth.currentUser?.uid,
          consultations: [dataToAdd],
        },
        customId: this.authentication.auth.currentUser?.uid,
      })
      this.hook.setData(dataToAdd)
    } else {
      this.update({
        data: {
          id: this.authentication.auth.currentUser?.uid,
          consultations: [...this.hook.data.consultations, dataToAdd],
        },
      })
      this.hook.setData({
        ...this.hook.data,
        consultations: [...this.hook.data.consultations, dataToAdd],
      })
    }
  }
}
