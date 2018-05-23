import React, { Component } from 'react';
import Postagem from './Postagem';
import Categoria from './Categoria';
import {Link} from 'react-router-dom';
import {Alert, Button} from 'reactstrap';

class Mural extends Component {
    render() {
        const {categorias, postagens} = this.props;
        return (<div>
            <Alert color="primary">
                Mural
                <Link to="/postagem">
                <Button size="sm" style={{float: 'right'}} color="success">
                    Adicionar Postagem
                </Button>
                </Link>
            </Alert>        
            <Alert color="info">
                Categorias &nbsp;
                {categorias.map(categoria => (<Categoria key={categoria.name} categoria={categoria} />))}
            </Alert>
            <Alert>Postagens</Alert>
                {postagens.filter(postagem => (postagem.deleted === false))
                    .map(postagem => (<Postagem key={postagem.id} postagem={postagem} />))}
                                        
        </div>);
        }
    }

    export default Mural;