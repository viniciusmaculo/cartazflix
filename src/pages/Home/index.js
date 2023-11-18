import { useEffect, useState } from "react"
import api from '../../services/api'
import {Link } from 'react-router-dom'
import './home.css'
import PaginationComponent from "../../components/Home/PaginationComponent"
import PaginationSelector from "../../components/Home/PaginationSelector"
import SearchBar from "../../components/Home/searchBar"

// URL da API: movie/now_playing?api_key=fddf91cf08fe228fb7489d20b4752e0e&language=pt-BR

function Home() {

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

    // Paginação:

    const [itensPerPage, setItensPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)

    const pages = Math.ceil(movies.length / itensPerPage)
    const startIndex = currentPage * itensPerPage
    const endIndex = startIndex + itensPerPage
    const currentItens = movies.slice(startIndex, endIndex)

    // Busca:

    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {

        async function loadMovies(){

            try {
                const response = searchQuery
                    ? await api.get('search/movie', {
                        params: {
                            api_key: "fddf91cf08fe228fb7489d20b4752e0e",
                            language: "pt-BR",
                            query: searchQuery,
                        }
                    })
                    : await api.get('movie/now_playing', {
                        params: {
                            api_key: "fddf91cf08fe228fb7489d20b4752e0e",
                            language: "pt-BR",
                            page: 1,
                        }
                    })

                if (searchQuery) {
                    const nowPlayingResponse = await api.get('movie/now_playing', {
                        params: {
                            api_key: "fddf91cf08fe228fb7489d20b4752e0e",
                            language: "pt-BR",
                            page: 1,
                        }
                    })

                    // Filtrar os resultados da pesquisa para incluir apenas os filmes em cartaz
                    const filteredResults = response.data.results.filter((result) => {
                        return nowPlayingResponse.data.results.some((movie) => movie.id === result.id)
                    })
                    setMovies(filteredResults)

                } else {
                    setMovies(response.data.results)
                }

            } catch (error) {
                console.error("Erro na busca:", error)
            }

            setLoading(false) // Define loading como false após a busca
        }

        loadMovies()
    }, [searchQuery, itensPerPage, currentPage])

    useEffect(() => {
        setCurrentPage(0)
    }, [itensPerPage, searchQuery])

    const handleSearch = (query) => {
        setSearchQuery(query)
    }

    if (loading) {
        return (
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return(
        <div className="container">

            <div className="container-header">
            <SearchBar onSearch={handleSearch} /> {/* Adicione o componente de busca aqui */}

            <div className="wrapper-pagination">
            <PaginationSelector itensPerPage={itensPerPage} setItensPerPage={setItensPerPage} />
            <PaginationComponent pages={pages} setCurrentPage={setCurrentPage}/>
            </div>

            </div>

            <div className="container-list">
                {currentItens.map((item) => {
                    return (
                        <article key={item.id}>
                            <h2>{item.title}</h2>
                            <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="item.title"/>
                            <Link to={`/movie/${item.id}`}>Acessar</Link>
                        </article> 
                    )     
                })}
            </div>

        </div>
    )
}

export default Home