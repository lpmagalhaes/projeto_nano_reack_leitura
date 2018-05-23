import {PEGAR_CATEGORIAS_INICIAIS, PEGAR_POSTAGENS_INICIAIS} from '../actions';

const estadoInicial = {
    categorias: [],
    postagens: [],
};

function mural(state = estadoInicial, action) {
    switch (action.type) {
        case PEGAR_POSTAGENS_INICIAIS:
            return {
                ...state,
                postagens: action.postagens
            };
        case PEGAR_CATEGORIAS_INICIAIS:
            return {
                ...state,
                categorias: action.categorias
            };
        default:
            return state;
    }
}

export default mural;