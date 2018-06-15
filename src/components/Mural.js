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
        const categoriaUrl = this.props.match.params.category;
        if(categoriaSelecionada === null && categoriaUrl){        
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
        let {postagemParaMostrar} = this.props;
        const corDefault = 'default';
        const corSuccess = 'success';
        const ordenacaoVotos = 'votos';
        const ordenacaoData = 'data';
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
                                id={postagem.id}                                        
                                />
                            )
                        )
                }
                </div>)
    }

}

const mapStateToProps = ({postagens},{match}) => ({postagemParaMostrar: match.params.category ? postagens.filter(postagem => postagem.category === match.params.category) : postagens});

function mapDispatchToProps(dispatch) {
    return {
        removerPostagem: (data) => dispatch(removerPostagem(data)),
        inativarPostagem: (data) => dispatch(inativarPostagem(data)),
        alterarPostagem: (data) => dispatch(alterarPostagem(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Mural);
