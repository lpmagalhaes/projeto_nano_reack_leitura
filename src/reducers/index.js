import {
PEGAR_CATEGORIAS_INICIAIS,
        PEGAR_POSTAGENS_INICIAIS,
        PEGAR_COMENTARIOS_INICIAIS,
        SELECIONAR_POSTAGEM,
        REMOVER_POSTAGEM,
        ADICIONAR_POSTAGEM
} from '../actions';

const estadoInicial = {
    categorias: [],
    postagens: [],
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
        case REMOVER_POSTAGEM:
            const estadoAtualizadoRemovendo = state;
            estadoAtualizadoRemovendo.postagens = estadoAtualizadoRemovendo.postagens.map(
                    postagem => {
                        if (postagem.id === action.postagem.id) {
                            postagem.deleted = true
                        }
                        return postagem;
                    });
            return estadoAtualizadoRemovendo;
        case ADICIONAR_POSTAGEM:
            const estadoAtualizadoPostagem = state;
            estadoAtualizadoPostagem.postagens.push(...action.postagem);
            return estadoAtualizadoPostagem;
        default:
            return state;
    }
}

export default mural;