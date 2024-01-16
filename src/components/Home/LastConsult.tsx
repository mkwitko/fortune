import { View, Text, TouchableOpacity } from 'react-native'
import Title from '../PageBuilder/Title'
import Cards from '../Shared/Cards'
import PurpleBox from '../PageBuilder/PurpleBox'
import Subtitle from '../PageBuilder/Subtitle'
import Paragraph from '../PageBuilder/Text'
import { useConsultationsEntityContext } from '@/context/ConsultationsEntityContext'
import { CardsData0, CardsData1, CardsData2 } from '@/data/cards/CardsData'
import { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import { setCache } from '@/services/Cache'
import { ScrollView } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'

export default function LastConsult() {
  const {
    Consultations: {
      hook: { data, setCurrent },
    },
  } = useConsultationsEntityContext()

  const [currentCard, setCurrentCard] = useState(0)

  const [lastConsult, setLastConsult] = useState<any>(
    data &&
      data.consultations &&
      data.consultations.length > 0 &&
      data.consultations[data.consultations.length - 1],
  )

  useEffect(() => {
    if (data && data.consultations) {
      setLastConsult(data.consultations[data.consultations.length - 1])
    }
  }, [data])

  const card1 = lastConsult && CardsData0[lastConsult.randomNumbers[0] - 1]
  const card2 = lastConsult && CardsData1[lastConsult.randomNumbers[1] - 1]
  const card3 = lastConsult && CardsData2[lastConsult.randomNumbers[2] - 1]
  const cards = lastConsult && [card1, card2, card3]
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <Title title="Última consulta:" />
        <ScrollView
          horizontal
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              flex: 1,
            }}
          >
            {cards &&
              cards.length > 0 &&
              cards.map((e: any, i: number) => {
                return (
                  <View
                    style={{
                      alignItems: 'center',
                      gap: 5,
                    }}
                    key={`consultation_card_${i}`}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#fff',
                        fontWeight: '800',
                      }}
                    >
                      {e.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setCurrentCard(i)
                      }}
                    >
                      <Cards
                        width={i === currentCard ? 165 : 80}
                        opacity={i === currentCard ? 1 : 0.3}
                        backgroundImage={e.image}
                      />
                    </TouchableOpacity>
                  </View>
                )
              })}
          </View>
        </ScrollView>
      </View>
      <PurpleBox>
        <Subtitle
          subtitle={(lastConsult && lastConsult.question) || 'Toque do Destino'}
        />
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
                lastConsult && lastConsult.question
                  ? cards[0].kativo4
                  : cards[0].kassivo1
              } ${
                lastConsult && lastConsult.question
                  ? cards[1].kativo4.toLowerCase()
                  : cards[1].kassivo1.toLowerCase()
              } ${
                lastConsult && lastConsult.question
                  ? cards[2].kativo4.toLowerCase()
                  : cards[2].kassivo1.toLowerCase()
              }`}
          </Text>
        </View>
        <Link href="/consultation" asChild>
          <TouchableOpacity
            onPress={() => {
              setCurrent(lastConsult)
              setCache('currentConsultation', lastConsult)
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
    </View>
  )
}
