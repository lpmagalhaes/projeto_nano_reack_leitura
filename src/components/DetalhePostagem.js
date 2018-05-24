import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button, Alert} from 'reactstrap';
import Postagem from './Postagem';
import Comentario from './Comentario';
import {selecionarPostagem} from '../actions';
import * as ReadableApi from '../utils/ReadableApi';

class DetalhePostagem extends Component {
    componentDidMount() {
        const {postagemSelecionada, selecionarPostagem, location} = this.props;
        if (postagemSelecionada === null) {
            ReadableApi.getPostagemPorId(location.pathname.split('/')[2])
                    .then(postagem => {
                        if (!postagem.deleted) {
                            selecionarPostagem(postagem)
                        }
                        return postagem;
                    })
                    .then(postagem => (
                                ReadableApi.getComentariosDaPostagem(postagem.id)
                                .then(comentarios => this.setState({comentariosParaMostrar: comentarios}))
                                )
                    );
        }

    }
    state = {
        comentariosParaMostrar: []
    }
    render() {
        const {postagemSelecionada, comentarios} = this.props;
        let {comentariosParaMostrar} = this.state;
        if (comentariosParaMostrar.length === 0) {
            comentariosParaMostrar = comentarios;
        }
        return (<div>
            <h1>Detalhes</h1>
            <Link to="/">
            <Button onClick={() => selecionarPostagem(null)}>Voltar ao Mural</Button>
            </Link>
            <Link to="/comentario">
            <Button size="sm" style={{float: 'right'}} color="success">
                Adicionar Comentario
            </Button>
            </Link>
            {postagemSelecionada ? <Postagem postagem={postagemSelecionada} /> : <Alert color="danger">Postagem Apagada</Alert>}
            {comentariosParaMostrar &&
                                    comentariosParaMostrar
                                    .filter(comentario => (comentario.parentId === postagemSelecionada.id))
                                    .filter(comentario => (comentario.deleted === false))
                                    .map(comentario => (<Comentario key={comentario.id} comentario={comentario} />))}
        </div>);
        }
    }

    function mapStateToProps( {postagemSelecionada, comentarios}) {
        return {postagemSelecionada, comentarios};
    }

    function mapDispatchToProps(dispatch) {
        return {
            selecionarPostagem: (data) => dispatch(selecionarPostagem(data)),
        }
    }

    export default connect(mapStateToProps, mapDispatchToProps)(DetalhePostagem);


    