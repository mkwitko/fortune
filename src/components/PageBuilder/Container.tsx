import { StyleProp, View, ViewStyle } from 'react-native'

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
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
        backgroundColor: `#320B54`,
        ...styled,
      }}
    >
      {children}
    </View>
  )
}
