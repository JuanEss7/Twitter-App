import ButtonFollow from './ButtonFollow';
import { User } from '../../../../interfaces/user';
interface Props {
    user: User,
    following: string[],
    updateUsersFollowing: (users: string[]) => void,
    openModal: () => void,
    updateUserModalInfo: (user: User) => void
}
function UserCard({ user, following, openModal, updateUsersFollowing, updateUserModalInfo }: Props) {
    return (
        <>
            <li
                className='user_card'
            >
                <img src={user.photoURL!} alt={`Imagen del usurio ${user.name}`} />
                <div>
                    <h5
                        onClick={() => {
                            updateUserModalInfo(user);
                            openModal()
                        }}
                    >{user?.name}</h5>
                    <span className='nick'>@{user?.nick}</span>
                </div>
                <ButtonFollow
                    user={user}
                    following={following}
                    updateUsersFollowing={updateUsersFollowing}
                    style={{ position: 'absolute', right: '.4rem', padding: '.5rem .4rem' }}
                />
            </li>
        </>
    )
}

export default UserCard