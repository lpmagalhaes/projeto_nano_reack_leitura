export const PEGAR_CATEGORIAS_INICIAIS = 'PEGAR_CATEGORIAS_INICIAIS';
export const PEGAR_POSTAGENS_INICIAIS = 'PEGAR_POSTAGENS_INICIAIS';
export const PEGAR_COMENTARIOS_INICIAIS = 'PEGAR_COMENTARIOS_INICIAIS';
export const SELECIONAR_POSTAGEM = 'SELECIONAR_POSTAGEM';

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

export function selecionarPostagem(postagem) {
    return {
        type: SELECIONAR_POSTAGEM,
        postagem
    }
}

