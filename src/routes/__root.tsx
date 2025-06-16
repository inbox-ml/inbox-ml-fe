import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Box } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { onAuthStateChanged } from 'firebase/auth'
import { FirebaseService } from '../services/FirebaseService'

const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {



  onAuthStateChanged(FirebaseService.auth, (user) => {

    //TODO: if user exisst request user info otherwise navigate to sign-in page
    console.log({user})
  })

  return <QueryClientProvider client={queryClient}>
    <Box height={1} width={1} position="relative">
    <Outlet />
  </Box>
  </QueryClientProvider>
}
