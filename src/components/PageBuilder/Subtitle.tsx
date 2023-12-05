import { StyleProp, Text, TextStyle } from 'react-native'
export default function Subtitle({
  subtitle,
  style = {},
}: {
  subtitle: string
  style?: StyleProp<TextStyle>
}) {
  const styled = style as TextStyle
  return (
    <Text
      style={{
        color: '#FFD86E',
        fontSize: 12,
        fontWeight: '800',
        ...styled,
      }}
    >
      {subtitle}
    </Text>
  )
}
