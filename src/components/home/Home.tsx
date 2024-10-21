import { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/context'
import { useNavigate } from 'react-router-dom';
import Perfil from './sections/Perfil';
import { User } from '../../interfaces/user';
import Users from './sections/Users';
import Tweets from './sections/Tweets';
import { TailSpin } from 'react-loader-spinner'
import './style.css'
function Home() {
    const {
        user,
        setUserProfile,
        fillStateDataTweets
    } = useContext(Context);
    const [userInfo, setUserInfo] = useState<User>()
    const navigate = useNavigate();
    useEffect(() => {
        console.log({ user })
        if (user === null) {
            navigate('/login')
            return
        }
        if (user.nick === '' || user.nick === undefined || user.nick === null) {
            navigate('/login')
            return
        }
        setUserInfo(user)
    }, [navigate, user])
    useEffect(() => {
        fillStateDataTweets()
    }, [])
    return (
        <div className='container-home'>
            {userInfo ?
                <>
                    <Perfil user={userInfo} />
                    <Tweets user={userInfo} />
                    <Users user={userInfo} setUserProfile={setUserProfile} />
                </> :
                <TailSpin
                    visible={true}
                    height="80"
                    width="80"
                    color="#fff"
                />
            }
        </div>
    )
}

export default Home