import { Button, Divider, Grid, TextField } from "@mui/material";
import "./SignInPage.css"
import IMLCard from "../../components/Card/IMLCard";
import { Google } from "@mui/icons-material";

export default function SingInPage(){
    return <Grid container height={1} alignItems="center" justifyContent="center">
        <Grid size={{xs: 12, xl: 6, lg: 6}}>
            <IMLCard sx={{p: 2}}>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <TextField label="Email" variant="outlined" fullWidth />
                    </Grid>
                     <Grid size={12}>
                        <TextField label="Password" variant="outlined" type="password" fullWidth />
                    </Grid>
                    <Grid size={12} textAlign="right">
                        <Button variant="contained" sx={{background: "rgba(61, 89, 233, 0.6)"}}>Sign In</Button>
                    </Grid>
                    <Grid size={12} textAlign="right"><Divider /></Grid>
                     <Grid size={12} textAlign="center">
                         <Button variant="text" sx={{color: "rgba(61, 89, 233, 0.6)"}}>
                            <span style={{display: "flex", alignItems: "center"}}>Sign In With Google</span>
                            <span style={{display: "flex", alignItems: "center"}}><Google /></span>
                         </Button>
                     </Grid>
                </Grid>
            </IMLCard>
        </Grid>
    </Grid>
}