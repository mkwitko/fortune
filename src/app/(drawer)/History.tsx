import { Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import Title from '@/components/PageBuilder/Title'
import Container from '@/components/PageBuilder/Container'
import DateText from '@/components/PageBuilder/Date'
import PurpleBox from '@/components/PageBuilder/PurpleBox'
import Subtitle from '@/components/PageBuilder/Subtitle'
import Paragraph from '@/components/PageBuilder/Text'

export default function History() {
  return (
    <Container
      style={{
        gap: 20,
      }}
    >
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <AntDesign name="arrowleft" size={24} color="white" />
        <Title title="Histórico de consultas:" />
      </View>
      <DateText text="10/10/2021" />
      {[0, 1, 2, 3, 4, 5].map((e, i) => (
        <PurpleBox key={`history_purple_box_${i}`}>
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
      ))}
    </Container>
  )
}
