import { View } from 'react-native'
import { Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'

export default function HeaderRight() {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
        paddingHorizontal: 20,
      }}
    >
      <FontAwesome5 name="wallet" size={20} color="white" />
      <FontAwesome name="bell" size={20} color="white" />
      <Ionicons name="person-add-sharp" size={20} color="white" />
    </View>
  )
}
