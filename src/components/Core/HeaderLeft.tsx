import { View, Text } from 'react-native'

export default function HeaderLeft() {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Text style={{ flex: 1, color: '#FFF', fontWeight: '800' }}>
        Maurício
      </Text>
    </View>
  )
}
