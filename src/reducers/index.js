import {
        PEGAR_CATEGORIAS_INICIAIS,
        PEGAR_POSTAGENS_INICIAIS,
        REMOVER_POSTAGEM,
        ADICIONAR_POSTAGEM,
        ALTERAR_POSTAGEM,
        PEGAR_COMENTARIOS_INICIAIS,
        REMOVER_COMENTARIO,
        ADICIONAR_COMENTARIO,
        ALTERAR_COMENTARIO,
        } from '../actions';
import {combineReducers} from 'redux';

function categorias(state = [], action) {
    switch (action.type) {
        case PEGAR_CATEGORIAS_INICIAIS:
            return [...state, ...action.categorias];
        default:
            return state;
    }
}

function postagens(state = [], action) {
    switch (action.type) {
        case PEGAR_POSTAGENS_INICIAIS:
            return [...state, ...action.postagens];        
        case REMOVER_POSTAGEM:
            const estadoAtualizadoRemovendo = state.map(
                    postagem => {
                        if (postagem.id === action.postagem.id) {
                            postagem.deleted = true
                        }
                        return postagem;
                    });
            return estadoAtualizadoRemovendo;
        case ADICIONAR_POSTAGEM:
            return [...state, action.postagem];
        case ALTERAR_POSTAGEM:           
            const estadoAtualizadoAlterarPostagem = state.map(
                    postagemNoEstado => {
                        if (postagemNoEstado.id === action.postagem.id) {
                            return action.postagem;
                        } else {
                            return postagemNoEstado;
                        }
                    });
            return [...estadoAtualizadoAlterarPostagem];
        default:
            return state;
    }
}

function comentarios(state = [], action) {
    switch (action.type) {
        case PEGAR_COMENTARIOS_INICIAIS:
            return [...state, ...action.comentarios];
        case REMOVER_COMENTARIO:
            const estadoAtualizadoRemovendo = state.map(
                    comentario => {
                        if (comentario.id === action.comentario.id) {
                            comentario.deleted = true
                        }
                        return comentario;
                    });
            return estadoAtualizadoRemovendo;
        case ADICIONAR_COMENTARIO:
            return [...state, action.comentario];
        case ALTERAR_COMENTARIO:           
            const estadoAtualizadoAlterarComentario = state.map(
                    comentarioNoEstado => {
                        if (comentarioNoEstado.id === action.comentario.id) {
                            return action.comentario;
                        } else {
                            return comentarioNoEstado;
                        }
                    });
            return [...estadoAtualizadoAlterarComentario];
        default:
            return state;
    }
}

export default combineReducers({
    categorias,
    postagens,
    comentarios,
});