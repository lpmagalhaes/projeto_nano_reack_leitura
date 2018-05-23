export const PEGAR_POSTAGENS_INICIAIS = 'PEGAR_POSTAGENS_INICIAIS';
export const PEGAR_CATEGORIAS_INICIAIS = 'PEGAR_CATEGORIAS_INICIAIS';

export function pegarPostagensIniciais(postagens) {
    return {
        type: PEGAR_POSTAGENS_INICIAIS,
        postagens
    }
}

export function pegarCategoriasIniciais(categorias) {
    return {
        type: PEGAR_CATEGORIAS_INICIAIS,
        categorias
    }
}
