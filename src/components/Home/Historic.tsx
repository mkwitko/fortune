import { Text, View } from 'react-native'
import Title from '../PageBuilder/Title'
import PurpleBox from '../PageBuilder/PurpleBox'
import Subtitle from '../PageBuilder/Subtitle'
import Paragraph from '../PageBuilder/Text'

export default function Historic() {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <Title title="Histórico" />

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          overflowY: 'scroll',
          gap: 20,
        }}
      >
        {[0, 1, 2, 3, 4, 5].map((e, i) => (
          <PurpleBox
            style={{
              width: 200,
              height: 125,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            key={`historic_purple_box_${i}`}
          >
            <Subtitle
              style={{
                textAlign: 'center',
              }}
              subtitle="Como eu posso melhorar minha sorte?"
            />
            <Paragraph
              style={{
                textAlign: 'center',
              }}
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
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
          </PurpleBox>
        ))}
      </View>
    </View>
  )
}
