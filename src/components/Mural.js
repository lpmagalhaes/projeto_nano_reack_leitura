import React, { Component } from 'react';
import {connect} from 'react-redux';
import {removerPostagem,
        inativarPostagem,
        alterarPostagem} from '../actions';
import {Alert, Button} from 'reactstrap';
import Postagem from './Postagem';
import FiltroPostagens from './FiltroPostagens';
import OrdenacaoPostagens from './OrdenacaoPostagens';
import {Link} from 'react-router-dom';

class Mural extends Component {
    state = {
        categoriaSelecionada: null,
        ordenacao: 'votos',
        modalAlterarPostagemAberto: false,
        postagemParaEditar: null,
    }
    componentDidMount(){
        const {categoriaSelecionada} = this.state;
        const {location} = this.props;
        if(categoriaSelecionada === null && location.pathname.split('/')[1]){
            const categoriaUrl = location.pathname.split('/')[1];
            this.selecionarCategoria(categoriaUrl);
        }
    }
    selecionarCategoria(categoria) {
        this.setState({categoriaSelecionada: categoria});
    }
    selecionarOrdenacao(ordenacao) {
        this.setState({ordenacao: ordenacao});
    }    
    render() {
        const {categoriaSelecionada, ordenacao} = this.state;
        const {postagens} = this.props;
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
                    <Link to='/nova/postagem/0'>
                        <Button size="sm" style={{float: 'right'}} color="success">
                            Adicionar Postagem
                        </Button>                
                    </Link>
                </Alert> 
                <FiltroPostagens 
                    categoriaSelecionada={categoriaSelecionada} 
                    selecionarCategoria={(categoria)=>this.selecionarCategoria(categoria)}/>
                <OrdenacaoPostagens 
                    corBotaoOrdenacaoVotos={corBotaoOrdenacaoVotos} 
                    corBotaoOrdenacaoData={corBotaoOrdenacaoData} 
                    selecionarOrdenacao={(ordenacao)=>this.selecionarOrdenacao(ordenacao)}/>
                <Alert>Postagens</Alert>
                {postagemParaMostrar
                    .filter(postagem => (postagem.deleted === false))
                    .map(postagem =>
                            (
                            <Postagem 
                                key={postagem.id} 
                                postagem={postagem}                                        
                                />
                            )
                        )
                }
                </div>)
    }

}

function mapStateToProps({categorias, postagens}) {
    return {categorias, postagens};
}

function mapDispatchToProps(dispatch) {
    return {
        removerPostagem: (data) => dispatch(removerPostagem(data)),
        inativarPostagem: (data) => dispatch(inativarPostagem(data)),
        alterarPostagem: (data) => dispatch(alterarPostagem(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Mural);
