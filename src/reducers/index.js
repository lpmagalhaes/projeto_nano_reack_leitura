import {
        PEGAR_CATEGORIAS_INICIAIS,
        PEGAR_POSTAGENS_INICIAIS,
        PEGAR_COMENTARIOS_INICIAIS,
        SELECIONAR_POSTAGEM
        } from '../actions';

const estadoInicial = {
    postagemSelecionada: null,
    categorias: [],
    postagens: [],
    comentarios: [],
};

function mural(state = estadoInicial, action) {
    switch (action.type) {
        case PEGAR_CATEGORIAS_INICIAIS:
            return {
                ...state,
                categorias: action.categorias
            };
        case PEGAR_POSTAGENS_INICIAIS:
            return {
                ...state,
                postagens: action.postagens
            };
        case PEGAR_COMENTARIOS_INICIAIS:
            const estadoAtualizado = state;
            estadoAtualizado.comentarios.push(...action.comentarios);
            return estadoAtualizado;
        case SELECIONAR_POSTAGEM:
            return {
                ...state,
                postagemSelecionada: action.postagem
            };
        default:
            return state;
}
}

export default mural;