import { View } from 'react-native'
import Title from '../PageBuilder/Title'
import Cards from '../Shared/Cards'

export default function LastConsult() {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <Title title="Última consulta:" />

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
          overflow: 'scroll',
        }}
      >
        <Cards backgroundImage="https://www.2spirits.com/wp-content/uploads/2022/12/What-Is-a-Mystic-Witch-and-Mother-Earth.jpg" />
        <Cards backgroundImage="https://www.2spirits.com/wp-content/uploads/2022/12/What-Is-a-Mystic-Witch-and-Mother-Earth.jpg" />
        <Cards backgroundImage="https://www.2spirits.com/wp-content/uploads/2022/12/What-Is-a-Mystic-Witch-and-Mother-Earth.jpg" />
      </View>
    </View>
  )
}
