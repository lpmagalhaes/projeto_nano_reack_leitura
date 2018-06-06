import React, { Component } from 'react';
import serializeForm from 'form-serialize';
import {connect} from 'react-redux';
import {Button} from 'reactstrap';

class SalvarPostagem extends Component { 
    auxiliarDeSubmiti = (evento) => {
        evento.preventDefault()
        const valores = serializeForm(evento.target, { hash: true })
        if (this.props.aoCriarPostagem){
            this.props.aoCriarPostagem(valores);
        }
    }
    render() {
        const {categorias} = this.props;
        return (<div>
                <h1>Salvar Postagem</h1>
                <form onSubmit={this.auxiliarDeSubmiti}>
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
                </div>);
    };
}

function mapStateToProps({categorias}) {
    return {categorias};
}

export default connect(mapStateToProps, null)(SalvarPostagem);