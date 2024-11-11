import { addTweet } from "../../../../../actions/db/tweets/addTweet";
import { getTweetImageOfStorage } from "../../../../../actions/storage/tweets/getImageTweet";
import { saveTweetPhotoInStorage } from "../../../../../actions/storage/tweets/saveTweetImage";
import { Tweet } from "../../../../../interfaces/tweet";
import { User } from "../../../../../interfaces/user";
import { notification } from "../../../../../utils/notification";
interface Props {
    src: string,
    user: User,
    tweet: string,
    imageFile: File
}
export async function makeTweet({ src, tweet, user, imageFile }: Props) {
    const tweetId = crypto.randomUUID();
    let imageTweetUrl;
    if (src) {
        const response = await saveTweetPhotoInStorage({ base64: src, image: imageFile, tweetId })
        if (!response?.ok) {
            notification({ message: 'Ocurrio un error al subir la imagen del tweet, intentalo mas tarde', type: 'error' });
            return
        }
        const urlImg = response.uploadRef?.metadata.fullPath;
        const { ok, imageUrl, message } = await getTweetImageOfStorage({ photoURL: urlImg! });
        if (!ok) {
            notification({ message, type: 'error' });
            return
        }
        imageTweetUrl = imageUrl;
    }
    const date = new Date().toDateString().split(' ');
    const newTweet: Tweet = {
        uid: user.uid,
        tweetId,
        photoUser: user.photoURL!,
        nick: user.nick!,
        name: user.name!,
        date: `${date[2]} ${date[1]} ${date[3]}`,
        tweet,
        imageTweet: imageTweetUrl ?? '',
        like: [],
        retweet: []
    }
    //Agregar tweet a la base de datos
    const success = await addTweet({ tweet: newTweet });
    if (!success) {
        notification({ message: 'Ocurrio un error al hacer el tweet, intentalo mas tarde', type: 'error' });
        return
    }
    return newTweet
}