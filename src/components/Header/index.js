import './header.css'
import { Link } from 'react-router-dom'

function Header() {
    return(
        <header>
            <Link to={"/cartazflix"} className='logo'><h1>Cartaz Flix</h1></Link>
            <Link to={"/favorites"} className='favorites'><button>Meus Filmes</button></Link>
        </header>

    )
}

export default Header