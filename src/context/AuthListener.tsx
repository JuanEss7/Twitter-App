import { onAuthStateChanged } from "firebase/auth";
import { createContext, ReactNode, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { getUserInfoById } from "../actions/db/getUserInfo";
import { useNavigate } from "react-router-dom";
import { notification } from "../utils/notification";
import { useUserStore } from "../store/user_store";
import Header from "../components/header/Header";
import { useTweetStore } from "../store/twitter_store";
interface ContextProps {
    children: ReactNode
}
const AuthListenerContext = createContext<ContextProps | null>(null)
//Componente que cuando se haya renderizado tendra un useEffect que escuchara todas las funciones de firebase auth
function AuthListenerProvider({children}: ContextProps) {
    const setUserInfo = useUserStore(state => state.setUserState)
    const resetDataTweets = useTweetStore(state => state.resetDataTweets)
    const navigete = useNavigate()
    useEffect(() => {
        //onAuthStateChanged se ejecuta cada vez que se usan las funciones de firebase signin,signout y create(register)
        //SI se ejecuta signin o create el usercount contendra informacion(email, photoURL, uid)
        //Si es ejecuta el signout el usercount sera null
        const unsubscribe = onAuthStateChanged(auth, async (usercount) => {
            if (usercount && usercount !== undefined && usercount.uid) {
                const { email, photoURL, uid} = usercount;
                if(!uid) return
                const { find,message,userInfo } = await getUserInfoById(uid);
                if(!find){
                    notification({message,type:'error'})
                    navigete('/')
                    return
                }
                //Actulizando contexto de usuario
                setUserInfo({ email, photoURL, uid,...userInfo });
            } else {
                //Actulizando contexto de usuario
                setUserInfo(undefined);
                //Reseteando informacion de estado de tweets en caso de existir
                resetDataTweets()
                console.log("No hay usuario");
            }
        });
        return () => unsubscribe()
    }, [setUserInfo,navigete,resetDataTweets]);
    return (
        <AuthListenerContext.Provider value={null}>
            <Header/>
            {children}
        </AuthListenerContext.Provider>
    )
}

export default AuthListenerProvider;
