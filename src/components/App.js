import React, { Component } from 'react';
import {connect} from 'react-redux';
import {buscarPostagens, buscarCategorias,
        selecionarPostagem, removerPostagem, 
        salvarPostagem, inativarPostagem,
        alterarPostagem} from '../actions';
import {Alert, Button} from 'reactstrap';
import DetalhePostagem from './DetalhePostagem';
import Comentario from './Comentario';
import SalvarPostagem from './SalvarPostagem';
import EditarPostagem from './EditarPostagem';
import Modal from 'react-modal';
import * as ReadableApi from '../utils/ReadableApi';

class App extends Component {
    state = {
        categorias: [],
        postagens: [],
        comentarios: [],
        categoriaSelecionada: null,
        ordenacao: 'votos',
        postagemSelecionada: null,
        modalDetalheAberto: false,
        modalPostagemAberto: false,
        modalAlterarPostagemAberto:false,
    }
    componentDidMount() {
        const {buscarCategorias, buscarPostagens} = this.props;
        buscarCategorias().then(resultado => this.setState({categorias: resultado.categorias}));
        buscarPostagens().then(resultado => this.setState({postagens: resultado.postagens}));        
        Modal.setAppElement('body');
    }
    selecionarCategoria(categoria) {
        this.setState({categoriaSelecionada: categoria});
    }
    selecionarOrdenacao(ordenacao) {
        this.setState({ordenacao: ordenacao});
    }
    selecionarPostagem(postagem) {
        this.setState({postagemSelecionada: postagem, modalDetalheAberto: true});
        ReadableApi.getComentariosDaPostagem(postagem.id)
                .then(comentarios => this.setState({comentarios}))
    }
    removerPostagem(postagem) {
        const {removerPostagem} = this.props;
        removerPostagem(postagem);
        this.setState({postagemSelecionada: null});
        this.props.inativarPostagem(postagem);
    }
    fecharModalDetalhe() {
        this.setState({modalDetalheAberto: false});
    }
    abrirModalPostagem() {
        this.setState({modalPostagemAberto: true});
    }
    fecharModalPostagem() {
        this.setState({modalPostagemAberto: false});
    }
    aoCriarPostagem(postagemParcial) {
        postagemParcial.id = Date.now();
        postagemParcial.timestamp = Date.now();
        postagemParcial.voteScore = 1;
        postagemParcial.deleted = false;
        postagemParcial.commentCount = 0;
        const {postagens} = this.state;
        postagens.push(postagemParcial)
        this.setState({postagens});
        this.props.salvarPostagem(postagemParcial)
        this.fecharModalPostagem();
    }
    abrirModalParaAlterarPostagem(){
        this.setState({modalAlterarPostagemAberto: true});
    }
    selecionarParaEditarPostagem(){
        this.fecharModalDetalhe()
        this.abrirModalParaAlterarPostagem();
    }
    fecharModalAlterarPostagem() {
        this.setState({modalAlterarPostagemAberto: false});
    }
    aoAlterarPostagem(postagemAlterada) {
        const {postagens} = this.state;
        const postagensAjustadas = postagens.map(postagemNoEstado=>{
           if(postagemNoEstado.id === postagemAlterada.id){
               return postagemAlterada;
           }else{
               return postagemNoEstado;
           }
        });
        this.props.alterarPostagem(postagemAlterada)
                .then(this.setState({postagens: postagensAjustadas}));
        this.fecharModalAlterarPostagem();
    }
    aoCriarComentario(comentarioParcial, postagem) {
        comentarioParcial.id = Date.now();
        comentarioParcial.timestamp = Date.now();
        comentarioParcial.voteScore = 1;
        comentarioParcial.deleted = false;
        comentarioParcial.parentDeleted = false;
        const {comentarios, postagens} = this.state;
        comentarios.push(comentarioParcial);       
        postagem.commentCount++;
        this.props.alterarPostagem(postagem);
        ReadableApi.postComentario(comentarioParcial)
            .then(this.setState({comentarios}));
    }
    removerComentario(comentarioRemovido, postagem){
        const {comentarios, postagens} = this.state;
        const comentariosAtualizados = comentarios
                .filter(comentarioNoEstado => comentarioNoEstado.id !== comentarioRemovido.id);   
        postagem.commentCount--;
        this.props.alterarPostagem(postagem);
        ReadableApi.removerComentario(comentarioRemovido)
            .then(this.setState({comentarios: comentariosAtualizados}));
    }
    aoAlterarComentario(comentarioAlterado) {
        const {comentarios} = this.state;
        const comentariosAjustados = comentarios.map(pcomentarioNoEstado=>{
           if(pcomentarioNoEstado.id === comentarioAlterado.id){
               return comentarioAlterado;
           }else{
               return pcomentarioNoEstado;
           }
        });
        ReadableApi.alterarComentario(comentarioAlterado)
            .then(this.setState({comentarios: comentariosAjustados}));
    }
    render() {
        const {categorias, postagens, 
            comentarios, categoriaSelecionada,
            ordenacao, postagemSelecionada, 
            modalDetalheAberto, modalPostagemAberto, 
            modalAlterarPostagemAberto} = this.state;
        const corDefault = 'default';
        const corSuccess = 'success';
        const ordenacaoVotos = 'votos';
        const ordenacaoData = 'data';
        let postagemParaMostrar = postagens;
        if (categoriaSelecionada) {
            postagemParaMostrar = postagemParaMostrar
                    .filter(postagem => (postagem.category === categoriaSelecionada));
        }
        let corBotaoOrdenacaoVotos = corDefault;
        if (ordenacao === ordenacaoVotos) {
            corBotaoOrdenacaoVotos = corSuccess;
            postagemParaMostrar = postagemParaMostrar.sort((a, b) => (a.voteScore < b.voteScore));
        }
        let corBotaoOrdenacaoData = corDefault;
        if (ordenacao === ordenacaoData) {
            corBotaoOrdenacaoData = corSuccess;
            postagemParaMostrar = postagemParaMostrar.sort((a, b) => (a.timestamp < b.timestamp));
        }
        return (<div className="content container">
            <Alert color="primary">
                Mural               
                <Button onClick={() => {this.abrirModalPostagem()}} size="sm" style={{float: 'right'}} color="success">
                    Adicionar Postagem
                </Button>                
            </Alert>        
            <Alert color="info">
                Filtro &nbsp;
                {
                    categorias.map(categoria => {
                        let corBotao = 'default';
                        if (categoria.name === categoriaSelecionada) {
                            corBotao = 'success';
                        }
                    return <Button 
                            color={corBotao}
                            onClick={() => (this.selecionarCategoria(categoria.name))} 
                            key={categoria.name}
                            style={{'marginLeft': '5px'}}>
                                {categoria.name}
                            </Button>
                    })
                }
                <Button 
                    color={
                                        corDefault}
                    onClick={() => (this.selecionarCategoria(null))} 
                    style={{'marginLeft': '5px'}}>
                    Limpar Filtro
                </Button>
            </Alert>
            <Alert color="warning">
                Ordenação
                <Button
                    color={corBotaoOrdenacaoVotos}
                    onClick={() => (this.selecionarOrdenacao('votos'))} 
                    style={{'marginLeft': '5px'}}>
                    Votos
                </Button>
                <Button
                    color={corBotaoOrdenacaoData}
                    onClick={() => (this.selecionarOrdenacao('data'))} 
                    style={{'marginLeft': '5px'}}>
                    Data de Criação
                </Button>        
            </Alert>  
            <Alert>Postagens</Alert>
            {
                postagemParaMostrar
                    .filter(postagem => (postagem.deleted === false))
                    .map(postagem => 
                            (
                                <DetalhePostagem 
                                    key={postagem.id} 
                                    postagem={postagem} 
                                    selecionarPostagem={(postageSelecionada) => {
                                            this.selecionarPostagem(postageSelecionada);
                                    }}
                                />
                            )
                        )
            }
            <Modal isOpen={modalDetalheAberto}>
                <div>
                    <Button onClick={() => {this.fecharModalDetalhe()}}>Fechar</Button>
                    <DetalhePostagem 
                        postagem={postagemSelecionada} 
                        removerPostagem={() => {this.removerPostagem(postagemSelecionada)}}
                        selecionarParaEditarPostagem={() => {this.selecionarParaEditarPostagem()}}
                        aoCriarComentario={(comentarioParcial, postagem)=>(this.aoCriarComentario(comentarioParcial, postagem))}
                        />
                        {postagemSelecionada && comentarios && comentarios
                            .filter(comentario => (comentario.parentId === postagemSelecionada.id))
                            .filter(comentario => (comentario.deleted === false))
                            .sort((a, b) => (a.voteScore < b.voteScore))
                            .map(comentario => (<Comentario 
                                key={comentario.id} 
                                comentario={comentario}
                                removerComentario={comentario => this.removerComentario(comentario, postagemSelecionada)}                                            
                                aoAlterarComentario={comentario => this.aoAlterarComentario(comentario)}
                                />))}
                </div>
            </Modal>
            <Modal isOpen={modalPostagemAberto}>
                <div>
                    <Button onClick={() => {this.fecharModalPostagem()}}>Fechar</Button>
                    <SalvarPostagem 
                        aoCriarPostagem={postagemParcial => this.aoCriarPostagem(postagemParcial)} 
                    />
                </div>
            </Modal>
            <Modal isOpen={modalAlterarPostagemAberto}>
                <div>
                    <Button onClick={() => {this.fecharModalAlterarPostagem()}}>Fechar</Button>
                    <EditarPostagem 
                        aoAlterarPostagem={postagemAlterada => this.aoAlterarPostagem(postagemAlterada)} 
                        postagem={postagemSelecionada}
                    />
                </div>
            </Modal>
        </div>);
    }
}


function mapStateToProps( {categorias, postagens}) {
    return {categorias, postagens};
}

function mapDispatchToProps(dispatch) {
    return {
        buscarCategorias: () => dispatch(buscarCategorias()),
        buscarPostagens: () => dispatch(buscarPostagens()),
        selecionarPostagem: (data) => dispatch(selecionarPostagem(data)),
        removerPostagem: (data) => dispatch(removerPostagem(data)),
        salvarPostagem: (data) => dispatch(salvarPostagem(data)),
        inativarPostagem: (data) => dispatch(inativarPostagem(data)),
        alterarPostagem: (data) => dispatch(alterarPostagem(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);