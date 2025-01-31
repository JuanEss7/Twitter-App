import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../firebase/firebase";
import { useUserStore } from "../context/store/user_store";
import { getUserInfoById } from "../actions/db/getUserInfo";
import { useNavigate } from "react-router-dom";
import { notification } from "../utils/notification";
//Componente que cuando se haya renderizado tendra un useEffect que escuchara todas las funciones de firebase auth
function AuthListener() {
    const setUserInfo = useUserStore(state => state.setUserState)
    const navigete = useNavigate()
    useEffect(() => {
        //onAuthStateChanged se ejecuta cada vez que se usan las funciones de firebase signin,signout y create(register)
        //SI se ejecuta signin o create el usercount contendra informacion(email, photoURL, uid)
        //Si es ejecuta el signout el usercount sera null
        const unsubscribe = onAuthStateChanged(auth, async (usercount) => {
            if (usercount) {
                const { email, photoURL, uid,} = usercount;
                const { find,message,userInfo } = await getUserInfoById(uid!);
                if(!find){
                    notification({message,type:'error'})
                    setTimeout(()=>{
                        navigete('/')
                    },3000)
                    return
                }
                //Actulizando contexto de usuario
                setUserInfo({ email, photoURL, uid,...userInfo });
            } else {
                //Actulizando contexto de usuario
                setUserInfo(undefined);
                console.log("No hay usuario");
            }
        });
        return () => unsubscribe()
    }, [setUserInfo]);
    return null
}

export default AuthListener;
