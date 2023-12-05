import Container from '@/components/PageBuilder/Container'
import Authentication from '@/services/Auth'
import { Link } from 'expo-router'
import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

export default function Forgot() {
  const [email, setEmail] = useState('')
  const { forgotPassword } = Authentication()
  return (
    <Container
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          flex: 0.3,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 21,
            color: '#fff',
            fontWeight: '800',
          }}
        >
          Tell My Fortune
        </Text>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          flex: 0.7,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: '#fff',
            fontWeight: '800',
          }}
        >
          Esqueci minha senha:
        </Text>
        <TextInput
          placeholder="seu@email.com.br"
          onChange={(e) => setEmail(e.nativeEvent.text)}
          style={{
            backgroundColor: '#643F84',
            borderRadius: 24,
            borderWidth: 2,
            borderColor: '#FFD86E',
            width: 300,
            height: 48,
            padding: 10,
            color: '#fff',
            paddingHorizontal: 20,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            forgotPassword(email)
          }}
          style={{
            backgroundColor: '#FFD86E',
            borderRadius: 24,
            width: '100%',
            height: 48,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#1F0437',
              fontSize: 14,
              fontWeight: '800',
            }}
          >
            Enviar e-mail de recuperação
          </Text>
        </TouchableOpacity>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Link asChild href="/auth/login">
            <Text
              style={{
                color: '#FFD86E',
                fontWeight: '800',
                fontSize: 12,
              }}
            >
              Voltar
            </Text>
          </Link>
        </View>
      </View>
    </Container>
  )
}
