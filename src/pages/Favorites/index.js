import { useEffect, useState } from 'react'
import './favorites.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function Favorites(){
    const [savedMovies, setSavedMovies] = useState([])

    useEffect(() => {
        const moviesList = localStorage.getItem("@movies")
        setSavedMovies(JSON.parse(moviesList) || [])
    }, [])

    function removeMovie(id) {
        let movieFilter = savedMovies.filter((item) => item.id !== id)

        setSavedMovies(movieFilter)
        localStorage.setItem("@movies", JSON.stringify(movieFilter))
        toast.success("Filme removido!")

    }

    return(
        <div className='container'>

            <h1>Meus Filmes:</h1>

            {savedMovies.length == 0 && <span id='no-film'>Nenhum filme favoritado!</span>}

            <ul>
            {savedMovies.map((item) => {
                return (
                    <li key={item.id} className='wrapper-movie'>
                    <span>{item.title}</span>
                    <div className='movie-options'>
                        <Link to={`/movie/${item.id}`}><button>Acessar</button></Link>
                        <button onClick={() => removeMovie(item.id)}>Excluir</button>
                    </div>
                </li>
                )
            })}
            </ul>
            
        </div>
    )       
}

export default Favorites