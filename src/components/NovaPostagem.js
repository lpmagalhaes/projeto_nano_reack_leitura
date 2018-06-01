import React, { Component } from 'react';
import serializeForm from 'form-serialize';
import {connect} from 'react-redux';

class NovaPostagem extends Component { 
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
                <h1>Nova Postagem</h1>
                <form onSubmit={this.auxiliarDeSubmiti} className='create-contact-form'>
                    <div className='create-contact-details'>
                        <input type='text' name='titulo' placeholder='Titulo'/>
                        <input type='text' name='corpo' placeholder='Corpo'/>
                        <input type='text' name='author' placeholder='Autor'/>
                        Categoria
                        <select type='text' name='author'>
                            <option value="0">Selecione</option>
                            {categorias.map(categoria => (
                                    <option key={categoria.path}>{categoria.name}</option>))}
                        </select>
                        <button>Salvar Postagem</button>
                    </div>
                </form>
                </div>);
    };
}

function mapStateToProps( {categorias,}) {
    return {categorias};
}

export default connect(mapStateToProps, null)(NovaPostagem);