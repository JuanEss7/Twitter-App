import { getAllUsersOfDb } from "../../../../../actions/db/getAllUsers";
import { User } from "../../../../../interfaces/user";
interface Props {
    user: User,
    setStateUsers: (users: User[] | []) => void
}
export async function getAllUsers({ user, setStateUsers }: Props) {
    const { ok, usersInDb } = await getAllUsersOfDb({ uid: user?.uid });
    if (!ok) {
        setStateUsers([])
        return
    }
    setStateUsers(usersInDb)
}