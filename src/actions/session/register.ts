import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/firebase'
import { addUserToDb } from '../db/addUser';
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
        }
    } catch (error) {
        let message = '';
        switch (error.code) {
            case 'auth/weak-password':
                message = 'La contraseña debe tener 6 caracteres.'
                break
            case 'auth/email-already-in-use':
                message = 'El usuario que estas intentando registrar ya existe.'
                break
            default:
                message = 'Ocurrio un error inesperado, intentalo mas tarde.'
                break
        }
        return {
            ok: false,
            message
        }
    }
}