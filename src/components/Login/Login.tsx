import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useEffect } from 'react';
import { notification } from '../../utils/notification';
import { useUserStore } from '../../store/user_store';
import './style.css'
 // useEffect(() => {
    //     if (!context) {
    //         return
    //     }
    //     const { setUserProfile } = context;
    //     //Reset de informacion de usuario al momento de cargar el componente
    //     setUserProfile(null)
    // }, [context])
function Login() {
    const user = useUserStore(state => state.user)
    const login = useUserStore(state => state.logIn)
    const logOut = useUserStore(state => state.logOut)
    const navigate = useNavigate();
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        if (!email || !password) {
            notification({ message: "Completa los campos por favor.", type: 'error' })
            return
        }
        await login({email,password})
    }
    useEffect(()=>{
        if(user !== undefined && user.nick){
            // navigate(`/home/${user.nick}`);
            console.log({user})
            return
        }
    },[user, navigate])
    useEffect(()=>{
        //Limpindo informacion de usuario al momento de renderizar el componente
        logOut()
    },[logOut])

    return (
        <form className='login-form form' onSubmit={handleSubmit}>
            <h2>Ingresar</h2>
            <label>
                <input type="email" name='email' placeholder='user@use.com' required />
            </label>
            <label >
                <input type="password" name='password' placeholder='password' required />
            </label>
            <button type='submit'>Ingresar</button>
            <Link to={'/'}>Registrarse</Link>
        </form>
    )
}

export default Login