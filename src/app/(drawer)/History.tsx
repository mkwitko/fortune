import { Text, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import Title from '@/components/PageBuilder/Title'
import Container from '@/components/PageBuilder/Container'
import DateText from '@/components/PageBuilder/Date'
import PurpleBox from '@/components/PageBuilder/PurpleBox'
import Subtitle from '@/components/PageBuilder/Subtitle'
import Paragraph from '@/components/PageBuilder/Text'
import { useConsultationsEntityContext } from '@/context/ConsultationsEntityContext'
import { CardsData0, CardsData1, CardsData2 } from '@/data/cards/CardsData'
import { setCache } from '@/services/Cache'
import { Link, router } from 'expo-router'

export default function History() {
  const {
    Consultations: {
      hook: { data, setCurrent },
    },
  } = useConsultationsEntityContext()

  const reverse = data.consultations.slice()

  reverse.reverse()

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
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) router.back()
            else router.push('/')
          }}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Title title="Histórico de consultas:" />
      </View>
      {reverse &&
        reverse.length > 0 &&
        reverse
          .filter((e: any) => e.randomNumbers)
          .map((e: any, i: number) => {
            const card1 = e && CardsData0[e.randomNumbers[0] - 1]
            const card2 = e && CardsData1[e.randomNumbers[1] - 1]
            const card3 = e && CardsData2[e.randomNumbers[2] - 1]
            const cards = e && [card1, card2, card3]
            return (
              <PurpleBox key={`history_purple_box_${i}`}>
                <Subtitle subtitle={(e && e.question) || 'Toque do Destino'} />
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                  }}
                >
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 12,
                    }}
                  >
                    {cards &&
                      cards.length > 0 &&
                      `${
                        e && e.question ? cards[0].kativo4 : cards[0].kassivo1
                      } ${
                        e && e.question
                          ? cards[1].kativo4.toLowerCase()
                          : cards[1].kassivo1.toLowerCase()
                      } ${
                        e && e.question
                          ? cards[2].kativo4.toLowerCase()
                          : cards[2].kassivo1.toLowerCase()
                      }`}
                  </Text>
                </View>
                <Link href="/consultation" asChild>
                  <TouchableOpacity
                    onPress={() => {
                      setCurrent(e)
                      setCache('currentConsultation', e)
                    }}
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
                  </TouchableOpacity>
                </Link>
              </PurpleBox>
            )
          })}
    </Container>
  )
}
