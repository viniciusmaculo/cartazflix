import axios from "axios";

// URL Base: https://api.themoviedb.org/3/
// URL da API: movie/now_playing?api_key=fddf91cf08fe228fb7489d20b4752e0e&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api