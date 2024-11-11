import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase";
interface Props {
    photoURL: string
}
export async function getUserImageOfStorage({ photoURL }: Props) {
    try {
        const imageRef = ref(storage, photoURL);
        const imageUrl = await getDownloadURL(imageRef);
        return {
            ok: true,
            imageUrl
        }
    } catch (err) {
        console.log(err)
        return {
            ok: false,
            message: 'Ocurrio un error al obtener la imagen.'
        }
    }

}