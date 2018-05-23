import React, { Component } from 'react';
import * as ReadableApi from '../utils/ReadableApi';
import {connect} from 'react-redux';
import {pegarPostagensIniciais, pegarCategoriasIniciais} from '../actions';
import {Route, withRouter} from 'react-router-dom';
import Mural from './Mural'; 
import NovaPostagem from './NovaPostagem'; 

class App extends Component {
    componentDidMount() {
        const {pegarPostagensIniciais, pegarCategoriasIniciais} = this.props;
        ReadableApi.getCategorias()
                .then(resposta => pegarCategoriasIniciais(resposta));
        ReadableApi.getPostagens()
                .then(resposta => pegarPostagensIniciais(resposta));
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
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));