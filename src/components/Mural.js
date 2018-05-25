import React, { Component } from 'react';
import Postagem from './Postagem';
import {Link} from 'react-router-dom';
import {Alert, Button} from 'reactstrap';

class Mural extends Component {
    state = {
        categoriaSelecionada: null,
        ordenacao: 'votos'
    }
    selecionarCategoria(categoria) {
        this.setState({categoriaSelecionada: categoria});
    }
    selecionarOrdenacao(ordenacao) {
        this.setState({ordenacao: ordenacao});
    }
    render() {
        const {categorias, postagens} = this.props;
        const {categoriaSelecionada, ordenacao} = this.state;
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
                    .map(postagem => (<Postagem key={postagem.id} postagem={postagem} />))
                }        
        </div>);
                }
            }

export default Mural;