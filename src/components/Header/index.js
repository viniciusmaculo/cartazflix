import './header.css'
import { Link, useLocation } from 'react-router-dom'

function Header() {
    const location = useLocation();

    const handleLogoClick = () => {
        // Recarregar a página apenas quando o logo for clicado na página inicial
        if (location.pathname === '/') {
            window.location.reload();
          }
      };    

    return(
        <header>
            <Link to={"/"} className='logo' onClick={handleLogoClick}><h1>Cartaz Flix</h1></Link>
            <Link to={"/favorites"} className='favorites'><button>Meus Filmes</button></Link>
        </header>

    )
}

export default Header