/* eslint-disable @typescript-eslint/no-var-requires */
import Container from '@/components/PageBuilder/Container'
import Title from '@/components/PageBuilder/Title'
import { Text, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import Subtitle from '@/components/PageBuilder/Subtitle'
import DateText from '@/components/PageBuilder/Date'
import Cards from '@/components/Shared/Cards'
import { useEffect, useState } from 'react'
import { useConsultationsEntityContext } from '@/context/ConsultationsEntityContext'
import { CardsData0, CardsData1, CardsData2 } from '@/data/cards/CardsData'
import { Link } from 'expo-router'

export default function Consultation() {
  const [currentCard, setCurrentCard] = useState(0)

  const {
    Consultations: {
      hook: { current },
    },
  } = useConsultationsEntityContext()

  const card1 = current && CardsData0[current.randomNumbers[0] - 1]
  const card2 = current && CardsData1[current.randomNumbers[1] - 1]
  const card3 = current && CardsData2[current.randomNumbers[2] - 1]
  const cards = current && [card1, card2, card3]

  useEffect(() => {
    console.log('current consultatin - ', current)
  }, [current])
  return (
    <Container
      style={{
        gap: 30,
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
        <Link asChild href="/">
          <TouchableOpacity
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <AntDesign name="arrowleft" size={24} color="white" />
            <Title title="Consulta Completa:" />
          </TouchableOpacity>
        </Link>
      </View>

      <View
        style={{
          gap: 5,
        }}
      >
        <Subtitle
          subtitle={`${
            current.question ? current.question : 'Toque do destino'
          }`}
        />
        <DateText
          text={`Realizado em ${new Date(
            current.createdAt,
          ).toLocaleDateString()}`}
        />
      </View>

      <View
        style={{
          gap: 20,
        }}
      >
        <Subtitle subtitle="Os Regentes" />
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            overflow: 'scroll',
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
                      fontSize: 16,
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
                      width={i === currentCard ? 150 : 85}
                      opacity={i === currentCard ? 1 : 0.3}
                      backgroundImage={e.image}
                    />
                  </TouchableOpacity>
                </View>
              )
            })}
        </View>
      </View>

      <View
        style={{
          gap: 8,
        }}
      >
        <Subtitle subtitle="Karma Passivo" />
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
                cards[0].kassivo1
              } ${cards[1].kassivo1.toLowerCase()} ${cards[2].kassivo1.toLowerCase()}`}
          </Text>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 12,
            }}
          >
            {cards &&
              cards.length > 0 &&
              `${
                cards[0].kassivo2
              } ${cards[1].kassivo2.toLowerCase()} ${cards[2].kassivo2.toLowerCase()}`}
          </Text>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 12,
            }}
          >
            {cards &&
              cards.length > 0 &&
              `${
                cards[0].kassivo3
              } ${cards[1].kassivo3.toLowerCase()} ${cards[2].kassivo3.toLowerCase()}`}
          </Text>
        </View>
      </View>

      <View
        style={{
          gap: 8,
        }}
      >
        <Subtitle subtitle="Karma Ativo" />
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
                cards[0].kativo4
              } ${cards[1].kativo4.toLowerCase()} ${cards[2].kativo4.toLowerCase()}`}
          </Text>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 12,
            }}
          >
            {cards &&
              cards.length > 0 &&
              `${
                cards[0].kativo5
              } ${cards[1].kativo5.toLowerCase()} ${cards[2].kativo5.toLowerCase()}`}
          </Text>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 12,
            }}
          >
            {cards &&
              cards.length > 0 &&
              `${
                cards[0].kativo6
              } ${cards[1].kativo6.toLowerCase()} ${cards[2].kativo6.toLowerCase()}`}
          </Text>
        </View>
      </View>

      {/* <View
        style={{
          gap: 5,
        }}
      >
        <Subtitle subtitle="Números" />
        <Paragraph text="99 - 99 - 99 - 99 - 99 - 99" />
      </View>

      <View
        style={{
          gap: 5,
        }}
      >
        <Subtitle subtitle="Sorte" />
        <Paragraph text="Lorem ipsum dolor sit amet," />
      </View> */}
    </Container>
  )
}
