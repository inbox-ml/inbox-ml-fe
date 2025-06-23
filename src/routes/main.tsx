import { Outlet } from "@tanstack/react-router"
import IMLCard from "../components/Card/IMLCard"
import {Button, Grid, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from "@mui/material"
import { useAppSelector } from "../hooks/reduxHooks"
import { AccountCircle, Logout } from "@mui/icons-material"
import { useState } from "react"
import { IMLAuthService } from "../services/IMLAuthService"

export const Route = createFileRoute({
  component: RouteComponent,
})

function MainHeader(){

     const user = useAppSelector(state => state.user)
     const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

     function handleOnClose(){
        setAnchorEl(null)
     }

     async function handleSignOut(){
        const auth = new IMLAuthService();
        await auth.signOut()
     }

     function renderMenu(){
        return <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleOnClose} anchorOrigin={{horizontal: "right", vertical: "bottom"}}>
            <MenuItem>
                <ListItemIcon><AccountCircle /></ListItemIcon>
                <ListItemText>My Preferences</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleSignOut}>
                <ListItemIcon><Logout /></ListItemIcon>
                <ListItemText>Log Out</ListItemText>
            </MenuItem>
        </Menu>
     }

    return <IMLCard sx={{height: "60px", m: 2, mb:1, mt:1, borderRadius: "4px!important"}}>
        <Grid container justifyContent="flex-end" width={1} p={1}>
            <Grid size={{xs: 4, xl: 2}} display="flex" alignItems="center" justifyContent="flex-end" textAlign="end">
               <Button sx={{background: "rgba(61, 89, 233, 0.6)!important"}} size="large" onClick={(el) => {setAnchorEl(el.currentTarget)}}>
                 <Typography color="white" width="100%" mr={1}>{user.firstName} {user.lastName}</Typography>
                <AccountCircle sx={{color: "white"}} />
               </Button>
            </Grid>
        </Grid>
        {renderMenu()}
    </IMLCard>
}

function RouteComponent() {
  return <>
    <MainHeader />
    <Outlet />
  </>
}
