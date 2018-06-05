import * as ReadableApi from '../utils/ReadableApi';

export const PEGAR_CATEGORIAS_INICIAIS = 'PEGAR_CATEGORIAS_INICIAIS';
export const PEGAR_POSTAGENS_INICIAIS = 'PEGAR_POSTAGENS_INICIAIS';
export const PEGAR_COMENTARIOS_INICIAIS = 'PEGAR_COMENTARIOS_INICIAIS';
export const SELECIONAR_POSTAGEM = 'SELECIONAR_POSTAGEM';
export const REMOVER_POSTAGEM = 'REMOVER_POSTAGEM';
export const ADICIONAR_POSTAGEM = 'ADICIONAR_POSTAGEM';
export const ALTERAR_POSTAGEM = 'ALTERAR_POSTAGEM';

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

export function pegarComentariosIniciais(comentarios) {
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
        .then(postagensNaAPI => dispatch(pegarPostagensIniciais(postagensNaAPI)))
);

export const buscarComentarios = () => dispatch => (
    ReadableApi.getPostagens()
    .then(postagensNaAPI =>
        postagensNaAPI.map(postagem =>
            ReadableApi.getComentariosDaPostagem(postagem.id)
                    .then(comentarios => dispatch(pegarComentariosIniciais(comentarios)))
        )
    )
);

export function selecionarPostagem(postagem) {
    return {
        type: SELECIONAR_POSTAGEM,
        postagem
    }
}

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

export const salvarPostagem = (postagem) => dispatch => (
    ReadableApi.postPostagem(postagem)
        .then(postagemNova => dispatch(adicionarPostagem(postagemNova)))
);

export const inativarPostagem = (postagem) => dispatch => (
    ReadableApi.removerPostagem(postagem.id)
        .then(postagem => dispatch(removerPostagem(postagem)))
);

export const alterarPostagem = (postagem) => dispatch => (
    ReadableApi.alterarPostagem(postagem)
        .then(postagem => dispatch(atualizarPostagem(postagem)))
);

