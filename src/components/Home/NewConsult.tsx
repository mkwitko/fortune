import Title from '@/components/PageBuilder/Title'
import {
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

export default function NewConsult() {
  const {
    Wallet: {
      hook: { data },
    },
  } = useWalletEntityContext()

  const { Consultations } = useConsultationsEntityContext()
  const [question, setQuestion] = useState('')

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
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
            {data ? data.balance : 0}
          </Text>
        </View>
      </View>

      <View>
        <View
          style={{
            backgroundColor: '#1F0437',
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            padding: 20,
          }}
        >
          <TextInput
            onChange={(e) => {
              setQuestion(e.nativeEvent.text)
            }}
            style={{
              color: '#FFD86E',
              opacity: 0.38,
              fontSize: 12,
            }}
            placeholder=" Exemplo: Como eu posso melhorar minha sorte?"
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
            }}
            onPress={() => {
              Consultations.makeConsultation({
                question,
              })
            }}
          >
            <Text
              style={{
                color: '#1F0437',
                fontWeight: '800',
              }}
            >
              Enviar pergunta
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#FFFFFF',
              flex: 0.4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
              borderBottomRightRadius: 15,
            }}
            onPress={() => {
              Consultations.makeConsultation({})
            }}
          >
            <Text
              style={{
                color: '#1F0437',
                fontSize: 10,
                fontWeight: '800',
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
