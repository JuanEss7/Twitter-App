import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase";
interface Props {
    photoURL: string
}
export async function getUserImageOfStorage({ photoURL }: Props) {
    console.log({ photoURL })
    try {
        const imageRef = ref(storage, photoURL);
        const imageUrl = await getDownloadURL(imageRef);
        console.log({ imageUrl })
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