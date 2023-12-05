import CustomDrawer from '@/components/Core/CustomDrawer'
import { Drawer } from 'expo-router/drawer'
import HeaderLeft from '@/components/Core/HeaderLeft'
import HeaderRight from '@/components/Core/HeaderRight'
import { AuthContextProvider } from '@/context/AuthContext'
import ContextWrapper from '@/context'
import { usePathname } from 'expo-router'

export default function Layout() {
  return (
    <AuthContextProvider>
      <ContextWrapper>
        <MyDrawer />
      </ContextWrapper>
    </AuthContextProvider>
  )
}

const MyDrawer = () => {
  const pagesToRemove = [
    'consultation',
    'auth/forgot',
    'auth/login',
    'auth/register',
  ]

  const pathname = usePathname()

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: !pathname.includes('auth'),
        headerTitle: () => {
          return <HeaderLeft />
        },
        headerRight: () => {
          return <HeaderRight />
        },
        headerStyle: {
          backgroundColor: `rgba(31, 4, 55, 1)`,
          height: 100,
        },
        headerTintColor: '#FFF',
        drawerStyle: {
          backgroundColor: `rgba(31, 4, 55, 1)`,
        },
        drawerLabelStyle: {
          fontWeight: '800',
          color: '#FFF',
        },
        sceneContainerStyle: {
          backgroundColor: `#320B54`,
        },
      }}
    >
      <Drawer.Screen
        name="index" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'Home',
        }}
      />
      <Drawer.Screen
        name="(drawer)/Store" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'Loja de Moedas',
        }}
      />
      <Drawer.Screen
        name="(drawer)/History" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'Histórico de Consultas',
        }}
      />
      <Drawer.Screen
        name="(drawer)/BuyHistory" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'Histórico de Compras',
        }}
      />
      <Drawer.Screen
        name="(drawer)/InviteFriend" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'Convide um Amigo',
          drawerLabelStyle: {
            color: '#FFD86E',
            fontWeight: '800',
          },
        }}
      />

      {pagesToRemove.map((page) => (
        <Drawer.Screen
          key={page}
          name={page}
          options={{
            drawerItemStyle: { height: 0 },
          }}
        />
      ))}
    </Drawer>
  )
}
