import { registerUserWithEmail } from "../../../actions/session/register";
import { ContextInterface } from "../../../interfaces/context";
import { notification } from "../../../utils/notification";
interface Props {
    email: string,
    password: string
    context: ContextInterface
}
export async function regiterUserDb({ email, password, context }: Props) {
    const { ok, message, user } = await registerUserWithEmail({ email, password });
    const { setUserProfile } = context;
    if (!ok) {
        notification({ message, type: 'error' });
        return
    }
    setUserProfile(user!)

}