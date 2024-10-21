import { ref, uploadBytes } from "firebase/storage"
import { storage } from "../../../firebase/firebase";
import { dataUrlToArrayBuffer } from "../../../utils/dataUrlToBuffer";

interface Props {
    tweetId: string,
    image: File | null,
    base64: string | null
}
export async function saveTweetPhotoInStorage({ base64, tweetId, image }: Props) {
    if (!base64 || !image) return
    try {
        const imageRef = ref(storage, `tweets/${tweetId}/${image.name}`);
        const buffer = dataUrlToArrayBuffer(base64);
        const uploadRef = await uploadBytes(imageRef, buffer);
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