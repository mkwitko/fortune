import { StyleProp, Text, TextStyle } from 'react-native'
export default function Paragraph({
  text,
  style,
}: {
  text: string
  style?: StyleProp<TextStyle>
}) {
  const styled = style as TextStyle
  return (
    <Text
      style={{
        color: '#FFFFFF',
        fontSize: 12,
        ...styled,
      }}
    >
      {text}
    </Text>
  )
}
