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

export const removerPostagem = (idPostagem) =>
    fetch(`${api}/posts/${idPostagem}`, {headers,method:"DELETE"})
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
            .catch(e => {
                console.log(e instanceof SyntaxError); // true
                console.log(e.message);                // "missing ; before statement"
                console.log(e.name);                   // "SyntaxError"
                console.log(e.fileName);               // "Scratchpad/1"
                console.log(e.lineNumber);             // 1
                console.log(e.columnNumber);           // 4
                console.log(e.stack);                  // "@Scratchpad/1:2:3\n"
              })