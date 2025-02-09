import { ref, uploadBytes } from "firebase/storage"
import { storage } from "../../firebase/firebase"
import defaultImage from '/perfil.webp'
import { dataUrlToArrayBuffer } from "../../utils/dataUrlToBuffer";
interface Props {
    uid: string,
    image: File | undefined,
    base64: string | null
}
export async function setUserPhotoInStorage({ uid, image, base64 }: Props) {
    console.log({ uid, image, base64 })
    try {
        //Convierto la imagen a blob
        const resp = await fetch(defaultImage);
        const blob = await resp.blob();
        const bufferToSave = base64 ? dataUrlToArrayBuffer(base64) : blob;
        const imageToSave = image?.name ?? defaultImage;
        console.log({ bufferToSave, blob })
        console.log({ imageToSave })
        //Subir la imagen en el alojamiento de firebase
        const imageRef = ref(storage, `users/${uid}/${imageToSave}`);
        const uploadRef = await uploadBytes(imageRef, bufferToSave);
        return {
            ok: true,
            uploadRef
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            uploadRef: null
        }
    }
}
