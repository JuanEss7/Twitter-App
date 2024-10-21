import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { registerUserWithEmail } from "../../actions/session/register";
import { Context } from "../../context/context";
import { notification } from "../../utils/notification";

function Register() {
    const { setUserProfile } = useContext(Context);
    const navigate = useNavigate();
    async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const email = data.get('email') as string;
        const password = data.get('password') as string;

        const { ok, message } = await registerUserWithEmail({ email, password });
        if (!ok) {
            notification({ message, type: 'error' });
            return
        }
        navigate('/nickname');
    }
    useEffect(() => {
        setUserProfile(null)
    }, [])
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