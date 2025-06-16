import { initializeApp, type FirebaseApp, type FirebaseOptions } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"

export class FirebaseService {

    private static _app: FirebaseApp
    private static _auth: Auth

    public static init(config: FirebaseOptions){
        FirebaseService._app = initializeApp(config)
        FirebaseService._auth = getAuth(FirebaseService._app)

    }

    public static get app(){return FirebaseService._app}

    public static get auth(){return FirebaseService._auth}



}