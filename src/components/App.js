import React, { Component } from 'react';
import * as ReadableApi from '../utils/ReadableApi';
import {connect} from 'react-redux';
import {pegarPostagensIniciais, 
    pegarCategoriasIniciais,
pegarComentariosIniciais} from '../actions';
import {Route, withRouter} from 'react-router-dom';
import Mural from './Mural'; 
import NovaPostagem from './NovaPostagem'; 
import DetalhePostagem from './DetalhePostagem'; 

class App extends Component {
    componentDidMount() {
        const {pegarPostagensIniciais, pegarCategoriasIniciais,pegarComentariosIniciais} = this.props;
        ReadableApi.getCategorias()
                .then(categoriasNaAPI => pegarCategoriasIniciais(categoriasNaAPI));
        ReadableApi.getPostagens()
                .then(postagensNaAPI => pegarPostagensIniciais(postagensNaAPI)); 
        ReadableApi.getPostagens()
                .then(postagensNaAPI => 
                   postagensNaAPI.map(postagem => 
                        ReadableApi.getComentariosDaPostagem(postagem.id)
                                    .then(comentarios => pegarComentariosIniciais(comentarios)) 
                   )                   
        );
    }
    render() {
        const {categorias, postagens} = this.props;
        return (<div className="content container">
                    <Route exact path="/" render={() => (
                            <Mural 
                            categorias={categorias}
                            postagens={postagens}
                            />)} />  
                    <Route path="/postagem" component={NovaPostagem} />
                    <Route path="/detalhe" component={DetalhePostagem} />
                </div>);
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        pegarCategoriasIniciais: (data) => dispatch(pegarCategoriasIniciais(data)),
        pegarPostagensIniciais: (data) => dispatch(pegarPostagensIniciais(data)),
        pegarComentariosIniciais: (data) => dispatch(pegarComentariosIniciais(data)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));