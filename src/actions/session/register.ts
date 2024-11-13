import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/firebase'
import { addUserToDb } from '../db/addUser';
import { FirebaseError } from "firebase/app"
interface Props {
    email: string,
    password: string
}
export async function registerUserWithEmail({ email, password }: Props) {
    try {
        const resp = await createUserWithEmailAndPassword(auth, email, password);
        const user = {
            uid: resp.user.uid,
            email: resp.user.email,
            image: resp.user.photoURL,
            nick: '',
        }
        //Se agrega el usuaio nuevo a la base de datos.
        await addUserToDb(user)
        return {
            ok: true,
            user
        }
    } catch (err) {
        if (err instanceof FirebaseError) {
            let message = '';
            const code = err.code;
            switch (code) {
                case 'auth/weak-password':
                    message = 'La contraseña debe tener al menos 6 caracteres.';
                    break;
                case 'auth/email-already-in-use':
                    message = 'El usuario que estás intentando registrar ya existe.';
                    break;
                default:
                    message = 'Ocurrió un error inesperado, intentalo más tarde.';
                    break;
            }
            return {
                ok: false,
                message,
            };
        } else {
            console.log(err)
            return {
                ok: false,
                message: 'Error desconocido ocurrido',
            };
        }

    }
}
