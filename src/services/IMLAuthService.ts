import {type Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword} from "firebase/auth"
import { FirebaseService } from "./FirebaseService"


type SignUpWithPasswordProps = {
    email: string;
    password: string;
}

 export class IMLAuthService {

    private _auth: Auth

    constructor(){
        this._auth = FirebaseService.auth 
    }

    async signUpWithCredentials(props: SignUpWithPasswordProps){
        return await createUserWithEmailAndPassword(this._auth, props.email, props.password)
    }

    async signInWithCredentials(props: SignUpWithPasswordProps){
        const {user} = await signInWithEmailAndPassword(this._auth, props.email, props.password)
        const token = await user.getIdToken()
        return token
    }

    async signOut(){ await signOut(this._auth)}

    async signInWithGoogle(): Promise<string> {
        const provider = new GoogleAuthProvider();
        const {user} = await signInWithPopup(this._auth, provider);
        const token = await user.getIdToken()
        return token
    }

}