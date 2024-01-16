import { Text, Touchable, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import Title from '@/components/PageBuilder/Title'
import Container from '@/components/PageBuilder/Container'
import DateText from '@/components/PageBuilder/Date'
import PurpleBox from '@/components/PageBuilder/PurpleBox'
import Subtitle from '@/components/PageBuilder/Subtitle'
import Paragraph from '@/components/PageBuilder/Text'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { router } from 'expo-router'

export default function BuyHistory() {
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

        <Title title="Histórico de compras:" />
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
