import { Outlet, createRootRoute, useNavigate } from '@tanstack/react-router'
import { Box } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { onAuthStateChanged } from 'firebase/auth'
import { FirebaseService } from '../services/FirebaseService'
import { useAppDispatch } from '../hooks/reduxHooks'
import {fetchUser} from '../api/user'
import { setToken, setUser, type UserProps } from '../redux/userSlice'
import { getHistoryList } from '../api/history'
import { setHistoryList, type HistoryItemProps } from '../redux/historySlice'

const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  onAuthStateChanged(FirebaseService.auth, async (user) => {

    const token = await user?.getIdToken();
    if(token){
      const user = await fetchUser(token);
      const history = await getHistoryList(token)
    
      dispatch(setHistoryList((history ?? []) as HistoryItemProps[]))
      dispatch(setUser(user as UserProps))
      dispatch(setToken({token}))
      //navigate({to: "/main/newMail"})
    }
    else{
      navigate({to: "signIn"})
    }
    
  })

  return <QueryClientProvider client={queryClient}>
    <Box height={1} width={1} position="relative">
    <Outlet />
  </Box>
  </QueryClientProvider>
}
