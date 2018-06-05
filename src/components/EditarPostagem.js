import React, { Component } from 'react';
import serializeForm from 'form-serialize';
import {Button} from 'reactstrap';

class EditarPostagem extends Component {
    state = {
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
        if (this.props.aoAlterarPostagem) {
            const {postagem} = this.props;
            postagem.title = valores.title;
            postagem.body = valores.body;
            this.props.aoAlterarPostagem(postagem);
        }
    }
    render() {
        const {title, body} = this.state;
        return (<div>
            <h1>Alterar Postagem</h1>
            <form onSubmit={this.auxiliarDeSubmiti} className='create-contact-form'>
                <div className='create-contact-details'>
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