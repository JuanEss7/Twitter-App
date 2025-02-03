import { FormEvent, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom"
import { useUserStore } from "../../store/user_store";

function Register() {
    const registerUser = useUserStore(state => state.register)
    const logOut = useUserStore(state => state.logOut)
    const navigate = useNavigate();
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        await registerUser({email,password})
        navigate('/nickname');
        return
    }
    useEffect(()=>{
        //Limpindo informacion de usuario al momento de renderizar el componente
        logOut()
    },[logOut])
    return (
        <>
            <form onSubmit={handleSubmit} className="register-form form">
                <h2>Registrarse</h2>
                <label>
                    <input type="email" name='email' placeholder='user@use.com' required />
                </label>
                <label >
                    <input type="password" name='password' placeholder='password' required />
                </label>
                <button type='submit'>Registrarse</button>
                <Link to={'/login'}>Login</Link>
            </form>
        </>
    )
}

export default Register