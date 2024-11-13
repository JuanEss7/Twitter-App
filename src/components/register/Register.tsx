import { FormEvent, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Context } from "../../context/context";
import { regiterUserDb } from "./functions/RegisterUserDB";

function Register() {
    const context = useContext(Context);
    const navigate = useNavigate();
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        await regiterUserDb({ email, password, context: context! })
        navigate('/nickname');
        return
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