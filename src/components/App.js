import React, { Component } from 'react';
import {buscarPostagens, buscarCategorias} from '../actions';
import Mural from './Mural';
import DetalhePostagem from './DetalhePostagem';
import SalvarPostagem from './SalvarPostagem';
import Pagina404 from './Pagina404';
import {Route, withRouter, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

class App extends Component {    
    componentDidMount() {
        const {buscarCategorias, buscarPostagens} = this.props;
        buscarCategorias();
        buscarPostagens();
    }    
    render() {        
        return (<div className="content container">
                    <Switch>
                        <Route exact path='/' component={Mural} />
                        <Route exact path={`/:category`} component={Mural} />
                        <Route exact path={`/:category/:id`} component={DetalhePostagem} />                            
                        <Route path='/nova/postagem' component={SalvarPostagem} />
                        <Route component={Pagina404} />
                    </Switch>        
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
