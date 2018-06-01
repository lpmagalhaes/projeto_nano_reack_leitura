import React, { Component } from 'react';
import {connect} from 'react-redux';
import {buscarComentarios, buscarPostagens, buscarCategorias,
    selecionarPostagem, removerPostagem} from '../actions';
import {Alert, Button} from 'reactstrap';
import Postagem from './Postagem';
import Comentario from './Comentario';
import NovaPostagem from './NovaPostagem';
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
    }    
    componentDidMount() {
        const {buscarCategorias, buscarPostagens, buscarComentarios} = this.props;
        buscarCategorias().then(resultado => this.setState({categorias: resultado.categorias}));
        buscarPostagens().then(resultado => this.setState({postagens: resultado.postagens}));        
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
    render() {
        const {categorias, postagens, comentarios, categoriaSelecionada, 
            ordenacao, postagemSelecionada, modalDetalheAberto, modalPostagemAberto} = this.state;
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
                <Button onClick={()=>{this.abrirModalPostagem()}} size="sm" style={{float: 'right'}} color="success">
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
                    color={corDefault}
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
                    .map(postagem => (
                    <Postagem 
                        key={postagem.id} 
                        postagem={postagem} 
                        selecionarPostagem={(postageSelecionada)=>{
                            this.selecionarPostagem(postageSelecionada);
                        }}
                    />))
            }
                    
                    
            <Modal isOpen={modalDetalheAberto}>
                <div>
                    <Button onClick={()=>{this.fecharModalDetalhe()}}>Fechar</Button>
                    <Postagem 
                        postagem={postagemSelecionada} 
                        removerPostagem={()=>{
                            this.removerPostagem(postagemSelecionada);
                        }}
                    />
                    {postagemSelecionada && comentarios && comentarios
                        .filter(comentario => (comentario.parentId === postagemSelecionada.id))
                        .filter(comentario => (comentario.deleted === false))
                        .sort((a, b) => (a.voteScore < b.voteScore))
                        .map(comentario => (<Comentario key={comentario.id} comentario={comentario} />))}
                </div>
            </Modal>
            <Modal isOpen={modalPostagemAberto}>
                <div>
                    <Button onClick={()=>{this.fecharModalPostagem()}}>Fechar</Button>
                    <NovaPostagem />
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
        buscarComentarios: () => dispatch(buscarComentarios()),
        selecionarPostagem: (data) => dispatch(selecionarPostagem(data)),
        removerPostagem: (data) => dispatch(removerPostagem(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);