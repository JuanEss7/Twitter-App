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
    const context = useContext(Context);
    const [userInfo, setUserInfo] = useState<User>();
    const [hasCheckedContext, setHasCheckedContext] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (hasCheckedContext || !context) {
            return;
        }
        const { fillStateDataTweets, user } = context;
        if (user === null || user.nick === '' || user.nick === undefined || user.nick === null) {
            navigate('/login');
            return;
        }
        setUserInfo(user);
        fillStateDataTweets();
        setHasCheckedContext(true);
    }, [context, hasCheckedContext, navigate, userInfo]);
    return (
        <div className='container-home'>
            {userInfo && context ?
                <>
                    <Perfil user={context.user!} />
                    <Tweets
                        user={userInfo}
                        dataTweets={context.dataTweets}
                        updateDataTweets={context.updateDataTweets}
                    />
                    <Users
                        user={userInfo}
                        setUserProfile={context.setUserProfile}
                        dataTweets={context.dataTweets}
                    />
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