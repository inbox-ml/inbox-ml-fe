
import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import IMLCard from "../../components/Card/IMLCard";
import {useForm} from "react-hook-form"
import { Google } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";
import { IMLAuthService } from "../../services/IMLAuthService";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { useNavigate } from "@tanstack/react-router";
import { setUser, type UserProps } from "../../redux/userSlice";
import UserService from "../../services/UserServie";

type SingUpForm = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatedPassword: string
}

type FieldProps = {
    id: keyof SingUpForm
    label: string
}

export default function SignUpPage(){

    const DEFAULT_VALUES = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatedPassword: "",
    }

    const{register, handleSubmit} = useForm<SingUpForm>({defaultValues: DEFAULT_VALUES})

     const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const FIELDS: FieldProps[] = [
        {id: "firstName", label: "First Name"},
        {id: "lastName", label: "Last Name"},
        {id: "email", label: "Email"},
        {id: "password", label: "Password"},
        {id: "repeatedPassword", label: "Repeat Password"}
    ]

    async function handleUserCreation(token: string){
        const user = await UserService.create(token);
        dispatch(setUser(user as UserProps));
    }


    async function handleGoogleSignUp(){
       try {
            const auth = new IMLAuthService();
            const token = await auth.signInWithGoogle() 
            if(!token){ throw new Error("Failed to get token")};
            await handleUserCreation(token)
       }
       catch(err){
        if(err instanceof Error){
            enqueueSnackbar(err.message, {variant: "error", anchorOrigin: {horizontal: "center", vertical: "top"}})
        }
       }
    }

    async function handleEmailPasswordSignUp(values: SingUpForm){
       try{
        const auth = new IMLAuthService();
        const {password, repeatedPassword, ...userInfo} = values
       if(password !== repeatedPassword){
         throw new Error("Repeated password is not matching")
       }
       const res = await auth.signUpWithCredentials({email: userInfo.email, password})
       const token = await res.user.getIdToken()
       if(!token){ throw new Error("Failed to get token")}
       await handleUserCreation(token)
       navigate({to: "/main/newMail"})
       }
       catch(e){
        if(e instanceof Error){
            enqueueSnackbar(e.message, {variant: "error", anchorOrigin: {horizontal: "center", vertical: "top"}})
        }
       }
    }

    function renderSingIn(){
        return  <Grid size={12}>
                    <Typography variant="subtitle2" color="textSecondary" textAlign="center">
                        <span style={{marginRight: "5px"}}>Already have account?</span>
                        <span style={{color: "rgba(61, 89, 233, 0.6)", cursor: "pointer"}} onClick={() => {navigate({to: "/signIn"})}}>Sign In</span>
                    </Typography>
                </Grid>
    }


    return <Grid container height={1} alignItems="center" justifyContent="center" padding={2}>
        <Grid size={{xs: 12, xl: 6, lg: 6, md: 6}}>
            <IMLCard sx={{p: 2}}>
                <Grid container spacing={2}>
                    {FIELDS.map(field =>  <Grid key={field.id} size={12}>
                        <TextField label={field.label} variant="outlined" fullWidth {...register(field.id)} />
                    </Grid>)}
                    <Grid size={12} textAlign="right">
                        <Button variant="contained" sx={{background: "rgba(61, 89, 233, 0.6)"}} onClick={handleSubmit(handleEmailPasswordSignUp)}>Sign Up</Button>
                    </Grid>
                    <Grid size={12} textAlign="right"><Divider /></Grid>
                     <Grid size={12} textAlign="center">
                         <Button variant="text" sx={{color: "rgba(61, 89, 233, 0.6)"}} onClick={handleGoogleSignUp}>
                            <span style={{display: "flex", alignItems: "center"}}>Sign Up With Google</span>
                            <span style={{display: "flex", alignItems: "center"}}><Google /></span>
                         </Button>
                     </Grid>
                    {renderSingIn()} 
                </Grid>
            </IMLCard>
        </Grid>
    </Grid>
}