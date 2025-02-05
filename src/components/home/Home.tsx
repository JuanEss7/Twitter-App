import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Perfil from './sections/Perfil';
import Users from './sections/Users';
import { TailSpin } from 'react-loader-spinner'
import { useUserStore } from '../../store/user_store';
import { useTweetStore } from '../../store/twitter_store';
import Tweets from './sections/Tweets';
import './style.css'
function Home() {
    const user = useUserStore(state => state.user)
    const fillStateDataTweets = useTweetStore(state => state.fillStateDataTweets)
    const navigate = useNavigate();
    useEffect(()=>{
        if(!user && user === undefined){
            navigate('/login')
            return
        }
        //Cargando los tweets de firebase db
        fillStateDataTweets()
    },[user,navigate,fillStateDataTweets])
    return (
        <div className='container-home'>
            {user ?
                <>
                    <Perfil />
                    <Tweets />
                    <Users />
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