import { Text, TouchableOpacity, View } from 'react-native'
import Title from '../PageBuilder/Title'
import PurpleBox from '../PageBuilder/PurpleBox'
import Subtitle from '../PageBuilder/Subtitle'
import Paragraph from '../PageBuilder/Text'
import { useConsultationsEntityContext } from '@/context/ConsultationsEntityContext'
import { useEffect, useState } from 'react'
import { CardsData0, CardsData1, CardsData2 } from '@/data/cards/CardsData'
import { Link } from 'expo-router'
import { setCache } from '@/services/Cache'

export default function Historic() {
  const {
    Consultations: {
      hook: { data, setCurrent },
    },
  } = useConsultationsEntityContext()

  const [reversedArray, setReversedArray] = useState<any>([])

  useEffect(() => {
    if (data && data.consultations) {
      const reverse = data.consultations.slice()
      setReversedArray(reverse.reverse())
    }
  }, [data])

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
        {reversedArray &&
          reversedArray.length > 0 &&
          reversedArray
            .filter((_: any, i: number) => i > 0 && i < 4)
            .map((e: any, i: number) => {
              if (!e.randomNumbers) return null
              const card1 = e && CardsData0[e.randomNumbers[0] - 1]
              const card2 = e && CardsData1[e.randomNumbers[1] - 1]
              const card3 = e && CardsData2[e.randomNumbers[2] - 1]
              const cards = e && [card1, card2, card3]
              return (
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
                    subtitle={e.question || 'Toque do Destino'}
                  />
                  <Paragraph
                    style={{
                      textAlign: 'center',
                    }}
                    text={`${
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
                  />
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
      </View>
    </View>
  )
}
