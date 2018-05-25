import React, { Component } from 'react';
import Postagem from './Postagem';
import Categoria from './Categoria';
import {Link} from 'react-router-dom';
import {Alert, Button} from 'reactstrap';

class Mural extends Component {
    state = {
        categoriaSelecionada: null
    }
    selecionarCategoria(categoria) {
        this.setState({categoriaSelecionada: categoria});
    }
    render() {
        const {categorias, postagens} = this.props;
        const {categoriaSelecionada} = this.state;
        let postagemParaMostrar = postagens;
        if(categoriaSelecionada){
            postagemParaMostrar = postagemParaMostrar
                    .filter(postagem => (postagem.category === categoriaSelecionada));
        }
        
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
                Filtro &nbsp;
                {categorias.map(categoria => {
                    let corBotao = 'default';
                    if(categoria.name === categoriaSelecionada){
                        corBotao = 'success';
                    }
                    return <Button 
                        color={corBotao}
                        onClick={() => (this.selecionarCategoria(categoria.name))} 
                        key={categoria.name}
                        style={{'marginLeft': '5px'}}>
                        {categoria.name}
                    </Button>})}
                    <Button 
                        color='default'
                        onClick={() => (this.selecionarCategoria(null))} 
                        style={{'marginLeft': '5px'}}>
                        Limpar Filtro
                    </Button>
            </Alert>
            <Alert>Postagens</Alert>
            {postagemParaMostrar.filter(postagem => (postagem.deleted === false))
                                        .map(postagem => (<Postagem key={postagem.id} postagem={postagem} />))}
        
        </div>);
            }
        }

        export default Mural;