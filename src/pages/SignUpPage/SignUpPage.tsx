
import { Button, Divider, Grid, TextField } from "@mui/material";
import IMLCard from "../../components/Card/IMLCard";
import {useForm} from "react-hook-form"
import { Google } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";
import { IMLAuthService } from "../../services/IMLAuthService";
import { createUser } from "../../api/user";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { useNavigate } from "@tanstack/react-router";
import { setUser, type UserProps } from "../../redux/userSlice";

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

    const{register, handleSubmit, getValues} = useForm<SingUpForm>({defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatedPassword: "",
    }})

     const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const FIELDS: FieldProps[] = [
        {id: "firstName", label: "First Name"},
        {id: "lastName", label: "Last Name"},
        {id: "email", label: "Email"},
        {id: "password", label: "Password"},
        {id: "repeatedPassword", label: "Repeat Password"}
    ]


    function handleGoogleSignUp(){
        const values = getValues();

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
       const user = await createUser(token)
       dispatch(setUser(user as UserProps))
       navigate({to: "/main/newMail"})
       }
       catch(e){
        if(e instanceof Error){
            enqueueSnackbar(e.message, {variant: "error"})
        }
       }
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
                </Grid>
            </IMLCard>
        </Grid>
    </Grid>
}