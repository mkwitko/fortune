import { View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import Title from '@/components/PageBuilder/Title'
import Container from '@/components/PageBuilder/Container'
import { StoreData } from '@/data/store/StoreData'
import StoreCard from '@/components/Store/StoreCard'
import { StoreType } from '@/data/store/StoreType'
import { useEffect } from 'react'
import firebaseApp from '@/infra/Firebase'
import {
  getFirestore,
  query,
  collection,
  where,
  onSnapshot,
} from 'firebase/firestore'
import { useUserEntityContext } from '@/context/UserEntityContext'
import { decrypt } from '@/services/Encrypt'
import { useWalletEntityContext } from '@/context/WalletEntityContext'
import Toast from 'react-native-toast-message'

import { router } from 'expo-router'

export default function Store() {
  const { Wallet } = useWalletEntityContext()
  const {
    User: {
      hook: { data },
    },
  } = useUserEntityContext()
  const db = getFirestore(firebaseApp)

  useEffect(() => {
    const q = query(collection(db, 'wallets'), where('id', '==', data.id))
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        const data = change.doc.data()
        if (change.type === 'modified') {
          Wallet.getHttp(data.id)
            .then((res: any) => {
              const data = +decrypt(res.balance)
              Wallet.hook.setData(data)
              Wallet.setCache(data)
              Toast.show({
                type: 'success',
                text1: 'Saldo atualizado!',
                text2: 'Seu saldo foi atualizado com sucesso!',
              })
              router.replace('/')
            })
            .catch((err) => {
              Toast.show({
                type: 'error',
                text1: 'Erro ao atualizar saldo!',
                text2: 'Tente novamente mais tarde!',
              })
              console.warn(err)
            })
        }
      })
    })
  }, [])

  return (
    <Container
      style={{
        gap: 20,
      }}
    >
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <AntDesign name="arrowleft" size={24} color="white" />
        <Title title="Loja de Moedas da Sorte:" />
      </View>

      <Title title="Comprar Moedas da Sorte:" />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
        }}
      >
        {StoreData.filter((e: StoreType) => {
          return !e.promotion
        }).map((e, i) => (
          <StoreCard key={`store_card_${i}`} store={e} />
        ))}
      </View>

      <Title title="Promoções:" />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
        }}
      >
        {StoreData.filter((e: StoreType) => {
          return e.promotion
        }).map((e, i) => (
          <StoreCard key={`store_card_${i}`} store={e} />
        ))}
      </View>
    </Container>
  )
}
