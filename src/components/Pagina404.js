import React, { Component } from 'react';
import {Button, Jumbotron} from 'reactstrap';
import {Link} from 'react-router-dom';

class Pagina404 extends Component {
    render() {
        return (<Jumbotron>
                    <h1>Página não encontrada!</h1>
                    <Link to='/'>
                            <Button size="sm" style={{float: 'right'}} color="success">
                                Voltar ao mural
                            </Button>                
                    </Link>
                </Jumbotron>);
    }
}

export default Pagina404;