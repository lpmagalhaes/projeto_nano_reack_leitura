import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Alert, Button} from 'reactstrap';
import {Link} from 'react-router-dom';

class FiltroPostagens extends Component {
    render() {        
        const {categorias, categoriaSelecionada, selecionarCategoria} = this.props;
        return (<Alert color="info">
                    Filtro &nbsp;
                    {
                        categorias.map(categoria => {
                            let corBotao = 'default';
                            if (categoria.name === categoriaSelecionada) {
                                corBotao = 'success';
                            }
                            return  <Link key={categoria.name} to={categoria.path}>
                                        <Button 
                                            color={corBotao}
                                            onClick={() => (selecionarCategoria(categoria.name))}
                                            style={{'marginLeft': '5px'}}>
                                            {categoria.name}
                                        </Button>
                                    </Link>
                        })
                    }
                    <Link to="/">
                        <Button 
                            color='default'
                            onClick={() => (selecionarCategoria(null))} 
                            style={{'marginLeft': '5px'}}>
                            Limpar Filtro
                        </Button>
                    </Link>
                </Alert>);
    }
}


function mapStateToProps({categorias}) {
    return {categorias};
}

export default connect(mapStateToProps, null)(FiltroPostagens);