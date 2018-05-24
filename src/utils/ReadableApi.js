const api = 'http://localhost:3001'

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

export const getCategorias = () =>
    fetch(`${api}/categories`, {headers})
            .then(res => res.json())
            .then(data => data.categories)

export const getPostagens = () =>
    fetch(`${api}/posts`, {headers})
            .then(res => res.json())

export const getComentariosDaPostagem = (idPostagem) =>
    fetch(`${api}/posts/${idPostagem}/comments`, {headers})
            .then(res => res.json())

export const getPostagemPorId = (idPostagem) =>
    fetch(`${api}/posts/${idPostagem}`, {headers})
            .then(res => res.json())
