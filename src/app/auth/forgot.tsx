import Container from '@/components/PageBuilder/Container'
import { useUserEntityContext } from '@/context/UserEntityContext'
import Authentication from '@/services/Auth'
import { Link } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

export default function Forgot() {
  const [email, setEmail] = useState('')
  const { forgotPassword } = Authentication()

  const { loading, setLoading } = useUserEntityContext()

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
          flex: 0.4,
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
          flex: 0.6,
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
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
          placeholderTextColor={'#320B54'}
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

        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <Text
            style={{
              color: '#fff',
              paddingHorizontal: 60,
              textAlign: 'center',
              fontSize: 10,
            }}
          >
            Se o e-mail acima estiver associado à uma conta, você receberá um
            link para alteração da sua senha de segurança.
          </Text>
          <Text
            style={{
              color: '#fff',
              paddingHorizontal: 60,
              textAlign: 'center',
              fontSize: 10,
            }}
          >
            Caso não tenha solicitado, desconsidere.
          </Text>
        </View>

        <TouchableOpacity
          disabled={loading}
          onPress={async () => {
            setLoading(true)
            await forgotPassword(email)
            setLoading(false)
          }}
          style={{
            backgroundColor: '#FFD86E',
            borderRadius: 24,
            width: 300,
            height: 48,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: loading ? 0.5 : 1,
          }}
        >
          {loading && <ActivityIndicator />}
          {!loading && (
            <Text
              style={{
                color: '#1F0437',
                fontSize: 14,
                fontWeight: '800',
              }}
            >
              Enviar e-mail de recuperação
            </Text>
          )}
        </TouchableOpacity>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: 300,
          }}
        >
          <Link disabled={loading} asChild href="/auth/login">
            <Text
              style={{
                color: '#FFD86E',
                fontWeight: '800',
                fontSize: 12,
                opacity: loading ? 0.5 : 1,
              }}
            >
              Voltar
            </Text>
          </Link>
        </View>
      </View>
    </View>
  )
}
