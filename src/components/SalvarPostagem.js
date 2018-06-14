import React, { Component } from 'react';
import serializeForm from 'form-serialize';
import {connect} from 'react-redux';
import {Button, Alert} from 'reactstrap';
import {salvarPostagem} from '../actions';
import {Link, Redirect} from 'react-router-dom';

class SalvarPostagem extends Component {
    state = {
        mostrarMensagemDeErro: false,
        irParaOMural: false,
    }
    auxiliarDeSubmiti = (evento) => {
        evento.preventDefault()
        const valores = serializeForm(evento.target, {hash: true})
        if (valores.title === undefined || valores.body === undefined || valores.author === undefined || valores.category === '0') {
            this.setState({mostrarMensagemDeErro: true});
            return;
        } else {
            this.setState({mostrarMensagemDeErro: false});
        }
        valores.id = Date.now().toString();
        valores.timestamp = Date.now();
        valores.voteScore = 1;
        valores.deleted = false;
        valores.commentCount = 0;
        this.props.salvarPostagem(valores)
                .then(this.setState({irParaOMural: true}));
    }
    render() {
        const {mostrarMensagemDeErro, irParaOMural} = this.state;
        const {categorias} = this.props;
        return (<div>
            <Alert color="primary">
                Salvar Postagem               
                <Link to='/'>
                <Button size="sm" style={{float: 'right'}} color="default">
                    Voltar ao Mural
                </Button>                
                </Link>    
            </Alert>
            <form onSubmit={this.auxiliarDeSubmiti}>
                {mostrarMensagemDeErro && <Alert color='danger'>Preencha todos os dados!</Alert>}
                <div>
                    <p><input type='text' name='title' placeholder='Titulo'/></p>
                    <p><input type='text' name='body' placeholder='Corpo'/></p>
                    <p><input type='text' name='author' placeholder='Autor'/></p>
                    <p>Categoria</p>
                    <p><select type='text' name='category'>
                            <option value="0">Selecione</option>
                            {categorias.map(categoria => (
                                    <option key={categoria.path}>{categoria.name}</option>))}
                        </select></p>
                    <p><Button>Salvar Postagem</Button></p>
                </div>
            </form>
            {irParaOMural && <Redirect to="/" />}
        </div>);
        }
    }

function mapStateToProps( {categorias}) {
    return {categorias};
}

function mapDispatchToProps(dispatch) {
    return {
        salvarPostagem: (data) => dispatch(salvarPostagem(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SalvarPostagem);