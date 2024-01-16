import Title from '@/components/PageBuilder/Title'
import {
  ActivityIndicator,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { useWalletEntityContext } from '@/context/WalletEntityContext'
import { useConsultationsEntityContext } from '@/context/ConsultationsEntityContext'
import { useState } from 'react'
import Toast from 'react-native-toast-message'
import { exampleQuestions } from './data/questions'
import generateUUID from '@/services/GenerateUUID'
import { RandomNumbers } from '@/services/RandomNumbers'
import { parseISO } from 'date-fns'
import { router } from 'expo-router'

export default function NewConsult() {
  const { Wallet } = useWalletEntityContext()
  const {
    hook: { data },
  } = Wallet

  const { Consultations } = useConsultationsEntityContext()
  const [question, setQuestion] = useState('')

  const randomNumber = Math.floor(Math.random() * exampleQuestions.length - 1)

  const makeConsultation = async (data: any) => {
    const uuid = generateUUID()
    const randomNumbers = RandomNumbers().getRandomNumbers(1, 12, 3)
    const dataToAdd = {
      ...data,
      randomNumbers,
      uuid,
      createdAt: parseISO(new Date().toISOString()),
    }
    router.push('/consultation')
    Consultations.hook.setCurrent(dataToAdd)
    Consultations.setCache(dataToAdd, true, 'currentConsultation')
    if (!Consultations.hook.data) {
      Consultations.insert({
        data: {
          id: Consultations.authentication.auth.currentUser?.uid,
          consultations: [dataToAdd],
        },
        customId: Consultations.authentication.auth.currentUser?.uid,
      })
      Consultations.hook.setData(dataToAdd)
    } else {
      Consultations.update({
        data: {
          id: Consultations.authentication.auth.currentUser?.uid,
          consultations: [...Consultations.hook.data.consultations, dataToAdd],
        },
      })
      Consultations.hook.setData({
        ...Consultations.hook.data,
        consultations: [...Consultations.hook.data.consultations, dataToAdd],
      })
    }
  }

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Title title="Realizar nova consulta:" />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <FontAwesome5 name="coins" size={18} color="yellow" />
          <Text
            style={{
              color: '#fff',
              fontSize: 12,
              fontWeight: '800',
            }}
          >
            {data?.balance || 0}
          </Text>
        </View>
      </View>

      <View>
        <View
          style={{
            backgroundColor: '#1F0437',
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            padding: 10,
          }}
        >
          <TextInput
            onChange={(e) => {
              setQuestion(e.nativeEvent.text)
            }}
            placeholderTextColor={'#978E74'}
            style={{
              color: '#FFD86E',
              fontSize: 12,
            }}
            value={question || ''}
            placeholder={`Exemplo: ${exampleQuestions[randomNumber]}`}
          ></TextInput>
        </View>

        <View
          style={{
            backgroundColor: '#1F0437',
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
          }}
        >
          <TouchableOpacity
            disabled={question.length < 10}
            style={{
              backgroundColor: '#FFD86E',
              flex: 0.6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
              borderBottomLeftRadius: 15,
              opacity: question.length < 10 ? 0.5 : 1,
            }}
            onPress={() => {
              if (data && data?.balance > 0) {
                makeConsultation({
                  question,
                }).then(() => {
                  Wallet.update({
                    data: {
                      balance: data.balance - 1,
                      id: data.id,
                    },
                  }).then(() => {
                    Wallet.setClass(true).then(() => {
                      Wallet.hook.setData({
                        balance: data.balance - 1,
                        id: data.id,
                      })
                    })
                  })
                })
              } else {
                Toast.show({
                  type: 'error',
                  text1: 'Erro ao enviar pergunta',
                  text2: 'Você não tem moedas suficientes.',
                })
              }
            }}
          >
            <Text
              style={{
                color: '#1F0437',
                fontWeight: '800',
                opacity: question.length < 10 ? 0.5 : 1,
              }}
            >
              Enviar pergunta
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={question.length > 0}
            style={{
              backgroundColor: '#FFFFFF',
              flex: 0.4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
              borderBottomRightRadius: 15,
              opacity: question.length > 0 ? 0.5 : 1,
            }}
            onPress={() => {
              if (question.length === 0) Consultations.makeConsultation({})
            }}
          >
            <Text
              style={{
                color: '#1F0437',
                fontSize: 10,
                fontWeight: '800',
                opacity: question.length > 0 ? 0.5 : 1,
              }}
            >
              Toque do Destino
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
