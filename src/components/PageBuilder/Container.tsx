import { StyleProp, View, ViewStyle } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function Container({
  children,
  style = {},
}: {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}) {
  const styled = style as ViewStyle
  return (
    <View
      style={{
        padding: 30,
        paddingVertical: 0,
        flex: 1,
        ...styled,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 40,
            flex: 1,
            backgroundColor: `#320B54`,
            marginVertical: 40,
          }}
        >
          {children}
        </View>
      </ScrollView>
    </View>
  )
}
