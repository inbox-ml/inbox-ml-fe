import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Box } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return <QueryClientProvider client={queryClient}>
    <Box height={1} width={1} position="relative">
    <Outlet />
  </Box>
  </QueryClientProvider>
}
