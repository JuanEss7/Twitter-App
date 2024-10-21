import { User } from '../../../../interfaces/user'
interface Props {
    user: User,
    following: string[],
    setFollowing: React.Dispatch<React.SetStateAction<string[]>>,
    style?: { [x: any]: string }
}
function ButtonFollow({ user, following, setFollowing, style }: Props) {
    function handleClick(userid: string) {
        console.log({ userid, user })
        //Verificar si ya esta siguiendo al usuario.
        // const isFollow = user.follow.includes(userid);
        const isFollowing = following.includes(userid);
        const newArray = structuredClone(following);
        //Agregar o eliminar una vez verificado
        console.log({ isFollowing })
        if (isFollowing) {
            setFollowing(newArray.filter(id => id !== userid))
            return
        } else {
            newArray.push(userid)
            setFollowing(newArray)
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