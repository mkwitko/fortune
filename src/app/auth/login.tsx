import Authentication from '@/services/Auth'
import { Link } from 'expo-router'
import { useState } from 'react'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const image = {
    uri: 'https://docs.expo.dev/static/images/tutorial/splash.png',
  }

  const { signIn } = Authentication()
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ImageBackground source={image} resizeMode="cover"></ImageBackground>
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
          Login:
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
        <TextInput
          placeholder="*********"
          placeholderTextColor={'#320B54'}
          onChange={(e) => setPassword(e.nativeEvent.text)}
          secureTextEntry={true}
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
            signIn(email, password)
          }}
          style={{
            backgroundColor: '#FFD86E',
            borderRadius: 24,
            width: 300,
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
            Entrar
          </Text>
        </TouchableOpacity>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 300,
          }}
        >
          <Link asChild href="/auth/forgot">
            <Text
              style={{
                color: '#fff',
                fontSize: 12,
              }}
            >
              Esqueci minha senha
            </Text>
          </Link>
          <Link asChild href="/auth/register">
            <Text
              style={{
                color: '#FFD86E',
                fontWeight: '800',
                fontSize: 12,
              }}
            >
              Criar nova conta
            </Text>
          </Link>
        </View>
      </View>
    </View>
  )
}
