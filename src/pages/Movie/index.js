import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './movie.css'
import { toast } from 'react-toastify'

import api from '../../services/api'

function Movie(){
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function loadFilme(){
      await api.get(`/movie/${id}`, {
        params:{
          api_key: "28fc232cc001c31e8a031f419d0a14ca",
          language: "pt-BR",
        }
      })
      .then((response)=>{
        setMovie(response.data)
        setLoading(false)
      })
      .catch(()=>{
        console.log("FILME NAO ENCONTRADO")
        navigate("/", {replace: true})
        return
      })
    }

    loadFilme()


    return () => {
      console.log("Componente foi desmontado")
    }
  }, [navigate, id])

  function saveMovie(){
    const movieList = localStorage.getItem("@movies")
    let savedMovies = JSON.parse(movieList) || []

    const hasFilme = savedMovies.some( (savedMovie) => savedMovie.id === movie.id)

    if(hasFilme) {
      toast.warn("Já está na lista!")
      return
    }
    
    savedMovies.push(movie)
    localStorage.setItem("@movies", JSON.stringify(savedMovies))
    toast.success("Filme salvo com sucesso!")
  }

  if(loading){
    return(
      <div className="loading">
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }
  
  return(
    <div className="container-movie">
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />

      <h3>Sinopse</h3>
      <p>{movie.overview}</p>

      <strong>Avalição: {movie.vote_average} / 10</strong>

      <div className='wrapper-buttons'>
        <button onClick={saveMovie}>Salvar</button>
          <button>
            <a href={`https://www.youtube.com/results?search_query=Trailer ${movie.title}`} target='_blank' rel='external'>
              Trailer
            </a>
          </button>    
      </div>
    </div>
  )
}

export default Movie