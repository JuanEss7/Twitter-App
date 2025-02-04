interface Props {
    userId: string,
    following: string[],
    style?: React.CSSProperties
    updateUsersFollowing: (users: string[]) => void,
}
function ButtonFollow({ userId, following, updateUsersFollowing, style }: Props) {
    function handleClick(user_id: string) {
        //Verificar si ya esta siguiendo al usuario.
        // const isFollow = user.follow.includes(userid);
        const isFollowing = following.includes(user_id);
        const newArray = structuredClone(following);
        //Agregar o eliminar una vez verificado)
        if (isFollowing) {
            updateUsersFollowing(newArray.filter(id => id !== user_id))
            return
        } else {
            newArray.push(user_id)
            updateUsersFollowing(newArray)
            return
        }
    }

    return (
        <button
            type='button'
            className={`buttonFollow ${following.includes(userId) ? 'following' : 'follow'}`}
            onClick={() => { handleClick(userId) }}
            style={style ?? {}}
        >
            {following.includes(userId)
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