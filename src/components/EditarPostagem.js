import React, { Component } from 'react';
import serializeForm from 'form-serialize';
import {Button, Alert} from 'reactstrap';

class EditarPostagem extends Component {
    state = {
        mostrarMensagemDeErro: false,
        title: '',
        body: '',
    }
    componentDidMount() {
        const {postagem} = this.props;
        this.setState(
                {
                    title: postagem.title,
                    body: postagem.body,
                }
        );
    }
    atualizarCampoTitulo = (valor) => {
        this.setState({title: valor});
    }
    atualizarCampoCorpo = (valor) => {
        this.setState({body: valor});
    }
    auxiliarDeSubmiti = (evento) => {
        evento.preventDefault();
        const valores = serializeForm(evento.target, {hash: true});
        if (valores.title === undefined || valores.body === undefined) {
            this.setState({mostrarMensagemDeErro: true});
            return;
        } else {
            this.setState({mostrarMensagemDeErro: false});
        }
        if (this.props.aoAlterarPostagem) {
            const {postagem} = this.props;
            postagem.title = valores.title;
            postagem.body = valores.body;
            this.props.aoAlterarPostagem(postagem);
        }
    }
    render() {
        const {title, body, mostrarMensagemDeErro} = this.state;
        return (<div>
            <h1>Alterar Postagem</h1>
            <form onSubmit={this.auxiliarDeSubmiti}>
                {mostrarMensagemDeErro && <Alert color='danger'>Preencha todos os dados!</Alert>}
                <div>
                    <p>Titulo</p>
                    <p>
                        <input 
                            value={title} 
                            type='text' 
                            name='title' 
                            placeholder='Titulo'
                            onChange={(event) => {
                        this.atualizarCampoTitulo(event.target.value)
                                    }}                    
                            />
                    </p>
                    <p>Corpo</p>
                    <p>
                        <input 
                            value={body}
                            type='text' 
                            name='body'
                            placeholder='Corpo'                            
                            onChange={(event) => {
                            this.atualizarCampoCorpo(event.target.value)
                                    }} 
                            />
                    </p>
                    <p><Button>Alterar Postagem</Button></p>
                </div>
            </form>
        </div>);
    }
}

export default EditarPostagem;