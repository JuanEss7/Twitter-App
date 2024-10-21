import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
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
    } catch (error) {
        console.log(error);
        let message = '';
        switch (error.code) {
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
        console.log({ code: error.code, msj: error.message })
        return {
            ok: false,
            message
        }
    }
}