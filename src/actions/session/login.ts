import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { FirebaseError } from "firebase/app";
interface Props {
    email: string,
    password: string
}
export async function loginWithEmail({ email: eml, password }: Props) {
    try {
        const credentials = await signInWithEmailAndPassword(auth, eml, password);
        const { uid } = credentials.user;
        return {
            ok: true,
            uid
        }
    } catch (err) {
        if (err instanceof FirebaseError) {
            let message = '';
            switch (err.code) {
                case 'auth/missing-email':
                    message = "Email invalido"
                    break;
                case 'auth/invalid-credential':
                    message = 'Credenciales incorrectas.';
                    break
                default:
                    message = "Ocurrio un error inesperado, intentalo mas tarde.";
                    break
            }
            return {
                ok: false,
                message
            }
        } else {
            console.log(err)
            return {
                ok: false,
                message: 'Error desconocido ocurrido',
            };
        }

    }
}