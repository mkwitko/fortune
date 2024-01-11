import { StyleProp, Text, TextStyle } from 'react-native'
export default function Title({
  title,
  style,
}: {
  title: string
  style?: StyleProp<TextStyle>
}) {
  const styled = style as TextStyle
  return (
    <Text
      style={{
        color: '#FFF',
        fontWeight: '800',
        fontSize: 16,
        ...styled,
      }}
    >
      {title}
    </Text>
  )
}
