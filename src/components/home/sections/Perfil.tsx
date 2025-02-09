import { useState } from 'react'
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../../store/user_store';
import './styles/perfil.css'
function Perfil() {
    const user = useUserStore(state => state.user)
    const logOut = useUserStore(state => state.logOut)
    const [check, setCheck] = useState(false);
    const navigate = useNavigate();
    function handleClick() {
        if (user !== null) {
            logOut();
            navigate('/login');
            return
        }
    }
    return (
        <aside className='section_perfil'>
            <label>
                <input
                    type="checkbox"
                    checked={check}
                    onChange={(e) => setCheck(e.target.checked)}
                />
                {!check ? <FaArrowRight width={30} /> : <FaArrowLeft width={30} />}
            </label>
            {user && <div className='content_user'>
                <img src={user.photoURL!} alt={`Imagen de perfil de ${user.name}`} />
                <h3>{user?.name}</h3>
                <span className='nick'>@{user.nick}</span>
                <p><span style={{ fontWeight: 'bold' }}>{user.following?.length ?? 0}</span> Siguiendo</p>
                <button type='button' onClick={handleClick}>Salir</button>
            </div>}
        </aside>
    )
}

export default Perfil