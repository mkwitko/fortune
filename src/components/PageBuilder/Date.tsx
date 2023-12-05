import { Text } from 'react-native'

export default function DateText({ text }: { text: string }) {
  return (
    <Text
      style={{
        color: '#fff',
      }}
    >
      {text}
    </Text>
  )
}
