import * as ReadableApi from '../utils/ReadableApi';

export const PEGAR_CATEGORIAS_INICIAIS = 'PEGAR_CATEGORIAS_INICIAIS';
export const PEGAR_POSTAGENS_INICIAIS = 'PEGAR_POSTAGENS_INICIAIS';
export const PEGAR_COMENTARIOS_INICIAIS = 'PEGAR_COMENTARIOS_INICIAIS';
export const REMOVER_POSTAGEM = 'REMOVER_POSTAGEM';
export const ADICIONAR_POSTAGEM = 'ADICIONAR_POSTAGEM';
export const ALTERAR_POSTAGEM = 'ALTERAR_POSTAGEM';
export const REMOVER_COMENTARIO = 'REMOVER_COMENTARIO';
export const ADICIONAR_COMENTARIO = 'ADICIONAR_COMENTARIO';
export const ALTERAR_COMENTARIO = 'ALTERAR_COMENTARIO';

export function pegarCategoriasIniciais(categorias) {
    return {
        type: PEGAR_CATEGORIAS_INICIAIS,
        categorias
    }
}

export function pegarPostagensIniciais(postagens) {
    return {
        type: PEGAR_POSTAGENS_INICIAIS,
        postagens
    }
}

function pegarComentariosIniciais(comentarios) {
    return {
        type: PEGAR_COMENTARIOS_INICIAIS,
        comentarios
    }
}

export const buscarCategorias = () => dispatch => (
    ReadableApi.getCategorias()
        .then(categoriasNaAPI => dispatch(pegarCategoriasIniciais(categoriasNaAPI)))
);

export const buscarPostagens = () => dispatch => (
    ReadableApi.getPostagens()
        .then(postagensNaAPI => {
            dispatch(pegarPostagensIniciais(postagensNaAPI));
            postagensNaAPI.map(postagem => 
                 ReadableApi.getComentariosDaPostagem(postagem)
                    .then(comentariosNaAPI => dispatch(pegarComentariosIniciais(comentariosNaAPI)))
            );               
    })
);

export function removerPostagem(postagem) {
    return {
        type: REMOVER_POSTAGEM,
        postagem
    }
}

export function adicionarPostagem(postagem) {
    return {
        type: ADICIONAR_POSTAGEM,
        postagem
    }
}

export function atualizarPostagem(postagem) {
    return {
        type: ALTERAR_POSTAGEM,
        postagem
    }
}

export function removerComentario(comentario) {
    return {
        type: REMOVER_COMENTARIO,
        comentario
    }
}

export function adicionarComentario(comentario) {
    return {
        type: ADICIONAR_COMENTARIO,
        comentario
    }
}

export function atualizarComentario(comentario) {
    return {
        type: ALTERAR_COMENTARIO,
        comentario
    }
}

export const salvarPostagem = (postagem) => dispatch => (
    ReadableApi.postPostagem(postagem)
        .then(postagemNova => dispatch(adicionarPostagem(postagemNova)))
);

export const inativarPostagem = (postagem) => dispatch => (
    ReadableApi.removerPostagem(postagem)
        .then(postagem => dispatch(removerPostagem(postagem)))
);

export const alterarPostagem = (postagem) => dispatch => (
    ReadableApi.alterarPostagem(postagem)
        .then(postagem => dispatch(atualizarPostagem(postagem)))
);

export const salvarComentario = (comentario) => dispatch => (
    ReadableApi.postComentario(comentario)
        .then(comentario => dispatch(adicionarComentario(comentario)))
);

export const inativarComentario = (comentario) => dispatch => (
    ReadableApi.removerComentario(comentario)
        .then(comentario => dispatch(removerComentario(comentario)))
);

export const alterarComentario = (comentario) => dispatch => (
    ReadableApi.alterarComentario(comentario)
        .then(comentario => dispatch(atualizarComentario(comentario)))
);