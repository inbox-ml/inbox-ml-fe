import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import "./SignInPage.css"
import IMLCard from "../../components/Card/IMLCard";
import { Google } from "@mui/icons-material";
import {IMLAuthService} from "../../services/IMLAuthService"
import { setUser, type UserProps } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "@tanstack/react-router";
import UserService from "../../services/UserServie";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";

type SignInWithCredentialsProps = {
    email: string;
    password: string;
}

export default function SingInPage(){

    const {register, handleSubmit} = useForm<SignInWithCredentialsProps>({defaultValues: {
        email: "",
        password: ""
    }})

    const navigate = useNavigate()

    const dispatch = useDispatch()

    async function handleSignIn(vals: SignInWithCredentialsProps){
       try{
         const auth = new IMLAuthService();
        const token  = await auth.signInWithCredentials(vals)
        const user = await UserService.get(token);
        dispatch(setUser(user as UserProps))
        navigate({to: "/main/newMail"})
       }
       catch(e){
         if(e instanceof Error){
            enqueueSnackbar(e.message, {variant: "error", anchorOrigin: {horizontal: "center", vertical: "top"}})
        }
       }
    }


    async function handleSignInWithGoogle(){
        const auth = new IMLAuthService();
        const token = await auth.signInWithGoogle()
        const user = await UserService.get(token);
        dispatch(setUser(user as UserProps))
        navigate({to: "/main/newMail"})
    }

    return <Grid container height={1} alignItems="center" justifyContent="center" padding={2}>
        <Grid size={{xs: 12, xl: 6, lg: 6, md: 6}}>
            <IMLCard sx={{p: 2}}>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <TextField {...register("email")} label="Email" variant="outlined" fullWidth />
                    </Grid>
                     <Grid size={12}>
                        <TextField {...register("password")} label="Password" variant="outlined" type="password" fullWidth />
                    </Grid>
                    <Grid size={12} textAlign="right">
                        <Button variant="contained" sx={{background: "rgba(61, 89, 233, 0.6)"}} onClick={() => {
                            console.log("ok")
                            handleSubmit(handleSignIn)()
                         }}>Sign In</Button>
                    </Grid>
                    <Grid size={12} textAlign="right"><Divider /></Grid>
                     <Grid size={12} textAlign="center">
                         <Button variant="text" sx={{color: "rgba(61, 89, 233, 0.6)"}} onClick={handleSignInWithGoogle}>
                            <span style={{display: "flex", alignItems: "center"}}>Sign In With Google</span>
                            <span style={{display: "flex", alignItems: "center"}}><Google /></span>
                         </Button>
                     </Grid>
                     <Grid size={12}>
                       <Typography variant="subtitle2" color="textSecondary" textAlign="center">
                         <span style={{marginRight: "5px"}}>Don't have account?</span>
                         <span style={{color: "rgba(61, 89, 233, 0.6)", cursor: "pointer"}} onClick={() => {navigate({to: "/signUp"})}}>Sign Up</span>
                        </Typography>
                     </Grid>
                </Grid>
            </IMLCard>
        </Grid>
    </Grid>
}