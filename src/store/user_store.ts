import { create } from "zustand";
import { User } from "../interfaces/user";
import { loginWithEmail } from "../actions/session/login";
import { notification } from "../utils/notification";
import { setUserPhotoInStorage } from "../actions/storage/saveImageUser";
import { verifyNickInDb } from "../actions/db/verifyExistUserNick";
import { verifyExistUserName } from "../actions/db/verifyExistUserName";
import { getUserImageOfStorage } from "../actions/storage/getImageUser";
import { updateUser } from "../actions/db/updateUser";
import { registerUserWithEmail } from "../actions/session/register";
import { logOut } from "../actions/session/logout";

interface LoginProps {
    email: string,
    password: string
}
interface Props {
    imageToSave: File,
    base64: string,
    nick: string,
    name: string
}
interface UserStoreInterface {
    user?: User
    setUserState: (userinfo?: User) => void,
    logIn: ({ email, password }: LoginProps) => Promise<void>
    register: ({ email, password }: LoginProps) => Promise<void>
    logOut: () => void
    updatePhotoUrlUser: ({ base64, imageToSave, name, nick }: Props) => Promise<boolean>
}
export const useUserStore = create<UserStoreInterface>((set, get) => ({
    user: undefined,
    setUserState: (userinfo) => set(() => ({ user: userinfo })),
    register: async ({ email, password }) => {
        //Registrando en firebaseDb
        const { ok, message } = await registerUserWithEmail({ email, password });
        if (!ok) {
            notification({ message, type: 'error' });
            return
        }
        //LA ACTUALIZACION DEL ESTADO SE HACE EN EL COMPONENTE AUTHLISTENER
    },
    logIn: async ({ email, password }) => {
        //Login en firebase Auth
        const { ok, message} = await loginWithEmail({ email, password });
        if (!ok) {
            notification({ message, type: 'error' });
            return
        }
        //LA ACTUALIZACION DEL ESTADO SE HACE EN EL COMPONENTE AUTHLISTENER
    },
    logOut: () => {
        //LogOut en firebase
        logOut()
        //LA ACTUALIZACION DEL ESTADO SE HACE EN EL COMPONENTE AUTHLISTENER
    },
    updatePhotoUrlUser: async ({ base64, imageToSave, name, nick }) => {
        const { user, setUserState } = get()
        const { ok, uploadRef } = await setUserPhotoInStorage({ uid: user!.uid, image: imageToSave, base64 });
        if (!ok) {
            notification({ message: 'Ocurrio un error al subir la imagen.', type: 'error' });
            return false
        }
        //Verificar si ya existe el nick del usuario
        const responseVerifyNick = await verifyNickInDb(nick as string);
        if (responseVerifyNick?.exist || responseVerifyNick?.error) {
            notification({ message: responseVerifyNick?.message, type: 'error' })
            return false
        }
        //Verificar si ya existe el nombre del usurio
        const responseVerifyName = await verifyExistUserName(name as string);
        if (responseVerifyName.exist || responseVerifyName.error) {
            notification({ message: responseVerifyName.message, type: 'error' })
            return false
        }
        //Obteniendo imagen de Firebase
        const url = await getUserImageOfStorage({ photoURL: uploadRef?.metadata.fullPath ?? '' });
        if (!url.ok) {
            notification({ message: url.message, type: 'error' });
            return false
        }
        //Creando nueva informacion del usuario
        const newInfoUser: User = { ...user!, photoURL: url.imageUrl!, nick, name, following: [] };
        //Actualizando informacion en Base de datos
        const responseUpdateUser = await updateUser({ newInfoUser });
        const save = responseUpdateUser?.save;
        if (!save) {
            notification({ message: "Ocurrio un error al actualizar la informacion, por favor intentalo mas tarde.", type: 'error' })
            return false
        }
        //Actualizando informacion de usuario en el contexto
        setUserState(newInfoUser)
        return true
    },
}))