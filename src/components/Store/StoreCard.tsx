import { StoreType } from '@/data/store/StoreType'
import { View, Text, TouchableOpacity } from 'react-native'
import { FontAwesome5, AntDesign } from '@expo/vector-icons'

export default function StoreCard({ store }: { store: StoreType }) {
  return (
    <View
      style={{
        backgroundColor: '#643F84',
        borderRadius: 10,
        paddingVertical: 20,
        paddingBottom: 0,
        width: '30%',
        height: 150,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingHorizontal: 10,
          alignSelf: 'center',
          gap: 5,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {store.type === 'coin' ? (
            <FontAwesome5 name="coins" size={22} color="yellow" />
          ) : (
            <AntDesign name="star" size={22} color="yellow" />
          )}
          <Text
            style={{
              color: '#fff',
              fontSize: 32,
              fontWeight: '800',
            }}
          >
            {store.amount}
          </Text>
        </View>

        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
            fontWeight: '800',
            fontSize: 12,
          }}
        >
          {store.type === 'coin' ? 'Moedas da Sorte' : 'Estrelas da Sorte'}
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          borderBottomRightRadius: 15,
          borderBottomLeftRadius: 15,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: '#FFD86E',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}
          onPress={() => {
            //
          }}
        >
          <Text
            style={{
              color: '#1F0437',
              fontWeight: '800',
              fontSize: 12,
            }}
          >
            {!store.isFree && `R$`} {store.price}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
