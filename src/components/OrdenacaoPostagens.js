import React, { Component } from 'react';
import {Alert, Button} from 'reactstrap';

class OrdenacaoPostagens extends Component {
    render() {        
        const {corBotaoOrdenacaoVotos, corBotaoOrdenacaoData, selecionarOrdenacao} = this.props;
        return (<Alert color="warning">
                    Ordenação
                    <Button
                        color={corBotaoOrdenacaoVotos}
                        onClick={() => (selecionarOrdenacao('votos'))} 
                        style={{'marginLeft': '5px'}}>
                        Votos
                    </Button>
                    <Button
                        color={corBotaoOrdenacaoData}
                        onClick={() => (selecionarOrdenacao('data'))} 
                        style={{'marginLeft': '5px'}}>
                        Data de Criação
                    </Button>        
                </Alert>);
    }
}


export default OrdenacaoPostagens;