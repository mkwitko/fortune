import { StyleProp, View, ViewStyle } from 'react-native'

export default function PurpleBox({
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
        backgroundColor: '#643F84',
        borderRadius: 10,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        ...styled,
      }}
    >
      {children}
    </View>
  )
}
