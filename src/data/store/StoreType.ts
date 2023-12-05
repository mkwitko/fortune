export interface StoreType {
  amount: number
  name: string
  price: string
  promotion: boolean
  type: 'coin' | 'touch'
  isFree: boolean
}
