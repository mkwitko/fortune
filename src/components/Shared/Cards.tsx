/* eslint-disable @typescript-eslint/no-var-requires */
import { Image, StyleProp, View, ViewStyle } from 'react-native'

export default function Cards({
  backgroundImage,
  width = 110,
  opacity = 1,
}: {
  backgroundImage: any
  width?: number
  opacity?: number
}) {
  //   const imagePath = require('./../../data/cards/assets/h01_desejo.jpg')
  return (
    <View
      style={{
        height: 252,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#FFD86E',
        borderRadius: 10,
      }}
    >
      <Image
        style={{
          height: 250,
          width,
          borderRadius: 10,
          opacity,
        }}
        source={backgroundImage}
        alt=""
      />
    </View>
  )
}
