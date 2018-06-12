import React, { Component } from 'react';
import serializeForm from 'form-serialize';
import {Button, Alert} from 'reactstrap';

class SalvarComentario extends Component {
    state = {
        mostrarMensagemDeErro: false,
        author: '',
        body: '',
    }
    atualizarCampoAutor = (valor) => {
        this.setState({author: valor});
    }
    atualizarCampoCorpo = (valor) => {
        this.setState({body: valor});
    }
    auxiliarDeSubmiti = (evento) => {
        evento.preventDefault();
        const valores = serializeForm(evento.target, {hash: true});
        if (valores.author === undefined || valores.body === undefined) {
            this.setState({mostrarMensagemDeErro: true});
            return;
        } else {
            this.setState({mostrarMensagemDeErro: false});
        }
        if (this.props.aoCriarComentario) {
            this.props.aoCriarComentario(valores);
        }
    }
    render() {
        const {author, body, mostrarMensagemDeErro} = this.state;
        return (<div>
            <h1>Novo Comentário</h1>
            <form onSubmit={this.auxiliarDeSubmiti}>
                {mostrarMensagemDeErro && <Alert color='danger'>Preencha todos os dados!</Alert>}
                <div>
                    <p>Titulo</p>
                    <p>
                        <input 
                            value={author} 
                            type='text' 
                            name='author' 
                            placeholder='Autor'
                            onChange={(event) => {this.atualizarCampoAutor(event.target.value)}}                    
                            />
                    </p>
                    <p>Corpo</p>
                    <p>
                        <input 
                            value={body}
                            type='text' 
                            name='body'
                            placeholder='Corpo'                            
                            onChange={(event) => {this.atualizarCampoCorpo(event.target.value)}} 
                            />
                    </p>
                    <p><Button>Adicionar Comentário</Button></p>
                </div>
            </form>
        </div>);
    }
}

export default SalvarComentario;