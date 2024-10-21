import { Link, useNavigate } from 'react-router-dom';
import './style.css'
import { useContext, useEffect } from 'react';
import { Context } from '../../context/context';
import { notification } from '../../utils/notification';
import { loginWithEmail } from '../../actions/session/login';
import { getUserInfoById } from '../../actions/db/getUserInfo';
function Login() {
    const { setUserProfile } = useContext(Context);
    const navigate = useNavigate();
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const data = new FormData(form);
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        const { ok, message, uid } = await loginWithEmail({ email, password });
        if (!ok) {
            notification({ message, type: 'error' });
            return
        }
        const { find, message: msj, userInfo } = await getUserInfoById(uid!);
        if (!find) {
            notification({ message: msj, type: 'error' });
            return
        }
        setUserProfile(userInfo)
        navigate(`/home/${userInfo?.nick}`);
    }
    useEffect(() => {
        setUserProfile(null)
    }, [])
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