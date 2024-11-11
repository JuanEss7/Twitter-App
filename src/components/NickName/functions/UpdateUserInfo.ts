import { updateUser } from "../../../actions/db/updateUser";
import { verifyExistUserName } from "../../../actions/db/verifyExistUserName";
import { verifyNickInDb } from "../../../actions/db/verifyExistUserNick";
import { getUserImageOfStorage } from "../../../actions/storage/getImageUser";
import { setUserPhotoInStorage } from "../../../actions/storage/saveImageUser";
import { notification } from "../../../utils/notification";
import { ContextInterface } from "../../../interfaces/context";
import { User } from "../../../interfaces/user";
interface Props {
    context: ContextInterface,
    imageToSave: File,
    result: string,
    nick: string,
    name: string
}
export async function updateUserInfo({ context, imageToSave, name, nick, result }: Props) {
    const { user, setUserProfile } = context;
    const { ok, uploadRef } = await setUserPhotoInStorage({ uid: user!.uid, image: imageToSave, base64: result });
    if (!ok) {
        notification({ message: 'Ocurrio un error al subir la imagen.', type: 'error' });
        return
    }
    //Verificar si ya existe el nick del usuario
    const responseVerifyNick = await verifyNickInDb(nick as string);
    if (responseVerifyNick?.exist || responseVerifyNick?.error) {
        notification({ message: responseVerifyNick?.message, type: 'error' })
        return
    }
    //Verificar si ya existe el nombre del usurio
    const responseVerifyName = await verifyExistUserName(name as string);
    if (responseVerifyName.exist || responseVerifyName.error) {
        notification({ message: responseVerifyName.message, type: 'error' })
        return
    }
    //Actualizar el usuario en la base de datos
    const url = await getUserImageOfStorage({ photoURL: uploadRef?.metadata.fullPath ?? '' });
    if (!url.ok) {
        notification({ message: url.message, type: 'error' });
        return
    }
    const newInfoUser: User = { ...user!, photoURL: url.imageUrl!, nick, name, following: [] };
    const responseUpdateUser = await updateUser({ newInfoUser });
    const save = responseUpdateUser?.save;
    if (!save) {
        notification({ message: "Ocurrio un error al actualizar la informacion, por favor intentalo mas tarde.", type: 'error' })
        return
    }
    setUserProfile(newInfoUser)
}