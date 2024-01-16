import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'
import Authentication from '@/services/Auth'
import { router } from 'expo-router'

export default function CustomDrawer(props: any) {
  const { signOut } = Authentication()
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#1F0437',
          height: 100,
          paddingHorizontal: 20,
          gap: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) router.back()
            else router.push('/')
          }}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Text
          style={{
            color: '#FFF',
            fontWeight: '800',
          }}
        >
          Maurício
        </Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{
          display: 'flex',
          alignItems: 'center',
          height: 60,
        }}
        onPress={() => {
          signOut()
        }}
      >
        <Text
          style={{
            color: '#FF9292',
            fontWeight: '800',
          }}
        >
          Sair da conta
        </Text>
      </TouchableOpacity>
    </View>
  )
}
