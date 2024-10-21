import { FaTwitter } from "react-icons/fa";
import "./header.css"
function Header() {
    return (
        <header>
            <div className='header_container_items'>
                <FaTwitter size={25} />
            </div>
        </header>
    )
}

export default Header