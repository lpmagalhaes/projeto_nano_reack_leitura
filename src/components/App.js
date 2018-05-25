import React, { Component } from 'react';
import {connect} from 'react-redux';
import {buscarComentarios,
buscarPostagens,
buscarCategorias} from '../actions';
import {Route, withRouter} from 'react-router-dom';
import Mural from './Mural'; 
import NovaPostagem from './NovaPostagem'; 
import DetalhePostagem from './DetalhePostagem'; 

class App extends Component {
    componentDidMount() {
        const {buscarCategorias,buscarPostagens, buscarComentarios} = this.props;
        buscarCategorias();
        buscarPostagens();
        buscarComentarios();        
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
        buscarCategorias: () => dispatch(buscarCategorias()),
        buscarPostagens: () => dispatch(buscarPostagens()),
        buscarComentarios: () => dispatch(buscarComentarios()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));