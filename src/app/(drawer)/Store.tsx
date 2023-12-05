import { FlatList, Text, View, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import Title from '@/components/PageBuilder/Title'
import Container from '@/components/PageBuilder/Container'
import DateText from '@/components/PageBuilder/Date'
import PurpleBox from '@/components/PageBuilder/PurpleBox'
import Subtitle from '@/components/PageBuilder/Subtitle'
import Paragraph from '@/components/PageBuilder/Text'
import { StoreData } from '@/data/store/StoreData'
import StoreCard from '@/components/Store/StoreCard'
import { StoreType } from '@/data/store/StoreType'

export default function Store() {
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
        <Title title="Loja de Moedas da Sorte:" />
      </View>

      <Title title="Comprar Moedas da Sorte:" />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
        }}
      >
        {StoreData.filter((e: StoreType) => {
          return !e.promotion
        }).map((e, i) => (
          <StoreCard key={`store_card_${i}`} store={e} />
        ))}
      </View>

      <Title title="Promoções:" />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
        }}
      >
        {StoreData.filter((e: StoreType) => {
          return e.promotion
        }).map((e, i) => (
          <StoreCard key={`store_card_${i}`} store={e} />
        ))}
      </View>
    </Container>
  )
}
