import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class NovaPostagem extends Component {   
    render() {
        return (<div>
                <h1>Nova Postagem</h1>
                <Link to="/">Voltar ao Mural</Link>
                </div>);
    };
}

export default NovaPostagem;