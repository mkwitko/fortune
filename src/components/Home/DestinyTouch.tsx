import { View, Text } from 'react-native'
import PurpleBox from '../PageBuilder/PurpleBox'
import Subtitle from '../PageBuilder/Subtitle'
import Paragraph from '../PageBuilder/Text'

export default function DestinyTouch() {
  return (
    <PurpleBox>
      <Subtitle subtitle="Toque do destino" />
      <Paragraph text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod eleifend." />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontSize: 12,
            fontWeight: '800',
            textAlign: 'center',
          }}
        >
          Ler Completo
        </Text>
      </View>
    </PurpleBox>
  )
}
