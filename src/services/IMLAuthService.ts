import {type Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth"
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
        const result = await createUserWithEmailAndPassword(this._auth, props.email, props.password)
        return result
    }

    signInWithCredentials(){

    }

    async signOut(){ await signOut(this._auth)}

    async signInWithGoogle(): Promise<string> {
        const provider = new GoogleAuthProvider();
        const {user} = await signInWithPopup(this._auth, provider);
        const token = await user.getIdToken()
        return token
    }

}