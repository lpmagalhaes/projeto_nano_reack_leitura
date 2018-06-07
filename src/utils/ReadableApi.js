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

export const postPostagem = (postagem) =>
    fetch(`${api}/posts`, 
    {
        headers:{
                ...headers,
                'Content-Type': 'application/json'
    }, 
    method:"POST", 
    body: JSON.stringify(postagem)})
            .then(res => res.json())

export const removerPostagem = (postagem) =>
    fetch(`${api}/posts/${postagem.id}`, {headers,method:"DELETE"})
            .then(res => res.json())
    
export const alterarPostagem = (postagem) =>
    fetch(`${api}/posts/${postagem.id}`, 
    {
        headers:{
                ...headers,
                'Content-Type': 'application/json'
    }, 
    method:"PUT", 
    body: JSON.stringify({title: postagem.title, body: postagem.body})})
            .then(res => res.json())
              
export const postComentario = (comentario) =>
    fetch(`${api}/comments`, 
    {
        headers:{
                ...headers,
                'Content-Type': 'application/json'
    }, 
    method:"POST", 
    body: JSON.stringify(comentario)})
            .then(res => res.json())

export const removerComentario = (comentario) =>
    fetch(`${api}/comments/${comentario.id}`, {headers,method:"DELETE"})
            .then(res => res.json())
    
export const alterarComentario = (comentario) =>
    fetch(`${api}/comments/${comentario.id}`, 
    {
        headers:{
                ...headers,
                'Content-Type': 'application/json'
    }, 
    method:"PUT", 
    body: JSON.stringify({timestamp: Date.now(), body: comentario.body})})
            .then(res => res.json())
    
export const votar = (id,tipo,valor) =>
    fetch(`${api}/${tipo}/${id}`,
    {
        headers:{
                ...headers,
                'Content-Type': 'application/json'
    }, 
    method:"POST", 
    body: JSON.stringify({option: valor})})
            .then(res => res.json())
    
export const encontrarPostagemPorId = (id) =>
    fetch(`${api}/posts/${id}`, {headers})
            .then(res => res.json())

export const encontrarComentarioPorId = (id) =>
    fetch(`${api}/comments/${id}`, {headers})
            .then(res => res.json())