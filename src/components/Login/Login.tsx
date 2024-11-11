import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useContext, useEffect } from 'react';
import { Context } from '../../context/context';
import { notification } from '../../utils/notification';
import { getUserInfo } from './functions/GetUserInfo';
import './style.css'
function Login() {
    const context = useContext(Context);
    const navigate = useNavigate();
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        const { setUserProfile } = context!;
        if (!email || !password) {
            notification({ message: "Completa los campos por favor.", type: 'error' })
            return
        }
        const userInfo = await getUserInfo({ email, password, setUserProfile });
        if (userInfo) {
            navigate(`/home/${userInfo.nick}`);
            return
        }
    }
    useEffect(() => {
        if (!context) {
            return
        }
        const { setUserProfile } = context;
        //Reset de informacion de usuario al momento de cargar el componente
        setUserProfile(null)
    }, [context])
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