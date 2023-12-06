import Historic from '@/components/Home/Historic'
import LastConsult from '@/components/Home/LastConsult'
import NewConsult from '@/components/Home/NewConsult'
import Container from '@/components/PageBuilder/Container'

export default function App() {
  return (
    <Container>
      <NewConsult />
      <LastConsult />
      <Historic />
    </Container>
  )
}
