import React, { Component } from 'react';
import {buscarPostagens, buscarCategorias} from '../actions';
import Mural from './Mural';
import DetalhePostagem from './DetalhePostagem';
import SalvarPostagem from './SalvarPostagem';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class App extends Component {    
    componentDidMount() {
        const {buscarCategorias, buscarPostagens} = this.props;
        buscarCategorias();
        buscarPostagens();
    }    
    render() {        
        return (<div className="content container">
                    <Route exact path='/' component={Mural} />
                    <Route exact path={`/:category`} component={Mural} />
                    <Route exact path={`/:category/:id`} component={DetalhePostagem} />                            
                    <Route path='/nova/postagem/0' component={SalvarPostagem} />
                </div>);
    }
}

function mapDispatchToProps(dispatch) {
    return {
        buscarCategorias: () => dispatch(buscarCategorias()),
        buscarPostagens: () => dispatch(buscarPostagens()),
    };
}

export default withRouter(connect(null, mapDispatchToProps)(App));
