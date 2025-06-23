import { Outlet } from "@tanstack/react-router"
import IMLCard from "../components/Card/IMLCard"
import {Grid, IconButton, Typography } from "@mui/material"
import { useAppSelector } from "../hooks/reduxHooks"
import { AccountCircle } from "@mui/icons-material"

export const Route = createFileRoute({
  component: RouteComponent,
})

function MainHeader(){

     const user = useAppSelector(state => state.user)

    return <IMLCard sx={{height: "60px", m: 2, mb:1, mt:1, borderRadius: "4px!important"}}>
        <Grid container justifyContent="flex-end" width={1} p={1}>
            <Grid size={{xs: 4, xl: 2}} display="flex" alignItems="center" justifyContent="flex-end" textAlign="end" gap={1}>
               <IMLCard sx={{p: "3px", pr: "5px", pl: "10px"}}>
                 <Typography width="100%">{user.firstName} {user.lastName}</Typography>
                  <IconButton><AccountCircle /></IconButton>
               </IMLCard>
            </Grid>
        </Grid>
    </IMLCard>
}

function RouteComponent() {
  return <>
    <MainHeader />
    <Outlet />
  </>
}
