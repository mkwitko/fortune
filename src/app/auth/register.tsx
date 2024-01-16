import { useUserEntityContext } from '@/context/UserEntityContext'
import { useWalletEntityContext } from '@/context/WalletEntityContext'
import Authentication from '@/services/Auth'
import { Link } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const { signUp } = Authentication()
  const { User, loading, setLoading } = useUserEntityContext()
  const { Wallet } = useWalletEntityContext()

  const [showPassword, setShowPassword] = useState(false)
  return (
    <View
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
          Criar nova conta:
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 10,
          }}
        >
          <Text
            style={{
              color: '#fff',
            }}
          >
            E-mail
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
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 10,
          }}
        >
          <Text
            style={{
              color: '#fff',
            }}
          >
            Senha
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#643F84',
              borderRadius: 24,
              borderWidth: 2,
              borderColor: '#FFD86E',
              width: 300,
              height: 48,
              padding: 10,
              paddingHorizontal: 20,
            }}
          >
            <TextInput
              placeholder="*********"
              placeholderTextColor={'#320B54'}
              onChange={(e) => setPassword(e.nativeEvent.text)}
              secureTextEntry={!showPassword}
              style={{
                color: '#fff',
              }}
            />
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#aaa"
              onPress={() => {
                setShowPassword(!showPassword)
              }}
            />
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 10,
          }}
        >
          <Text
            style={{
              color: '#fff',
            }}
          >
            Confirmar Senha
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#643F84',
              borderRadius: 24,
              borderWidth: 2,
              borderColor: '#FFD86E',
              width: 300,
              height: 48,
              padding: 10,
              paddingHorizontal: 20,
            }}
          >
            <TextInput
              placeholder="*********"
              placeholderTextColor={'#320B54'}
              onChange={(e) => setPassword(e.nativeEvent.text)}
              secureTextEntry={!showPassword}
              style={{
                color: '#fff',
              }}
            />
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#aaa"
              onPress={() => {
                setShowPassword(!showPassword)
              }}
            />
          </View>
        </View>

        <Text
          style={{
            color: '#fff',
            paddingHorizontal: 80,
            textAlign: 'center',
            fontSize: 10,
          }}
        >
          Ao criar conta, você aceita nossos termos de uso e confirma ter mais
          de 16 anos:
        </Text>

        <TouchableOpacity
          disabled={loading}
          onPress={async () => {
            console.log('click')
            setLoading(true)
            await signUp(email, password, passwordConfirmation).then((res) => {
              if (res?.error) return res.error
              User.insert({
                data: {
                  id: res?.result?.user.uid,
                  email,
                  createdAt: new Date(),
                },
                customId: res?.result?.user.uid,
              })
              Wallet.insert({
                data: {
                  id: res?.result?.user.uid,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  balance: 5,
                },
                customId: res?.result?.user.uid,
              })
            })
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
              Criar conta
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
