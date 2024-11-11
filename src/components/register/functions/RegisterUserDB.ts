import { registerUserWithEmail } from "../../../actions/session/register";
import { notification } from "../../../utils/notification";
interface Props {
    email: string,
    password: string
}
export async function regiterUserDb({ email, password }: Props) {
    const { ok, message } = await registerUserWithEmail({ email, password });
    if (!ok) {
        notification({ message, type: 'error' });
        return
    }
}