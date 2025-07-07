import { Outlet, createRootRoute, useNavigate } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { onAuthStateChanged } from 'firebase/auth'
import { FirebaseService } from '../services/FirebaseService'
import { useAppDispatch } from '../hooks/reduxHooks'
import { setToken, setUser, type UserProps } from '../redux/userSlice'
import { getHistoryList } from '../api/history'
import { setHistoryList, type HistoryItemProps } from '../redux/historySlice'
import IMLPage from '../components/IMLPage/IMLPage'
import { useEffect, useState } from 'react'
import UserService from '../services/UserServie'

const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    onAuthStateChanged(FirebaseService.auth, async (user) => {

    const token = await user?.getIdToken();
    if(token){
      setLoading(true)
      const user = await UserService.get(token);
      const history = await getHistoryList(token)
    
      dispatch(setHistoryList((history ?? []) as HistoryItemProps[]))
      dispatch(setUser(user as UserProps))
      dispatch(setToken({token}))
      setLoading(false)
      navigate({to: "/main/newMail"})
    }
    else{
      navigate({to: "signIn"})
    }
    
  })
  }, [dispatch, navigate])

  return <QueryClientProvider client={queryClient}>
    <IMLPage height={1} width={1} position="relative" isLoading={loading}>
      <Outlet />
    </IMLPage>
  </QueryClientProvider>
}
