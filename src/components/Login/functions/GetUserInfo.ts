import { getUserInfoById } from "../../../actions/db/getUserInfo";
import { loginWithEmail } from "../../../actions/session/login";
import { User } from "../../../interfaces/user";
import { notification } from "../../../utils/notification";
interface Props {
    email: string,
    password: string,
    setUserProfile: (user: User) => void
}
export async function getUserInfo({ email, password, setUserProfile }: Props) {
    const { ok, message, uid } = await loginWithEmail({ email, password });
    if (!ok) {
        notification({ message, type: 'error' });
        return
    }
    const { find, message: msj, userInfo } = await getUserInfoById(uid!);
    if (!find) {
        notification({ message: msj, type: 'error' });
        return
    }
    setUserProfile(userInfo!)
    return userInfo!
}