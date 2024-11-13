import { User } from '../../../../interfaces/user'
interface Props {
    user: User,
    following: string[],
    style?: React.CSSProperties
    updateUsersFollowing: (users: string[]) => void,
}
function ButtonFollow({ user, following, updateUsersFollowing, style }: Props) {
    function handleClick(userid: string) {
        //Verificar si ya esta siguiendo al usuario.
        // const isFollow = user.follow.includes(userid);
        const isFollowing = following.includes(userid);
        const newArray = structuredClone(following);
        //Agregar o eliminar una vez verificado)
        if (isFollowing) {
            updateUsersFollowing(newArray.filter(id => id !== userid))
            return
        } else {
            newArray.push(userid)
            updateUsersFollowing(newArray)
            return
        }
    }

    return (
        <button
            type='button'
            className={`buttonFollow ${following.includes(user.uid) ? 'following' : 'follow'}`}
            onClick={() => { handleClick(user.uid) }}
            style={style ?? {}}
        >
            {following.includes(user.uid)
                ?
                <>
                    <span>Siguiendo</span>
                    <span>Dejar de seguir</span>
                </>
                :
                <span>Seguir</span>
            }
        </button>
    )
}

export default ButtonFollow