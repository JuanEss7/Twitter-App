import { getAllUsersOfDb } from "../../../../../actions/db/getAllUsers";
import { User } from "../../../../../interfaces/user";
import { notification } from "../../../../../utils/notification";
interface Props {
    user: User,
}
export async function getAllUsers({ user }: Props) {
    const { ok, usersInDb } = await getAllUsersOfDb({ uid: user.uid! });
    if (!ok) {
        notification({message:'Error al cargar los usuarios',type:'error'})
        return []
    }
    return usersInDb
}