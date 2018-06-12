import React, { Component } from 'react';
import * as ReadableApi from '../utils/ReadableApi';
import Postagem from './Postagem';
import SalvarComentario from './SalvarComentario';
import Comentario from './Comentario';
import {Alert, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import {alterarPostagem} from '../actions';
import {connect} from 'react-redux';

class DetalhePostagem extends Component {
     state = {
        postagem: null,
        comentarios: [],
        divCriarComentario: false,
    }
    componentDidMount(){
        const {location} = this.props;
        if(location.pathname.split('/')[2]){
            const postagemUrl = location.pathname.split('/')[2];
            ReadableApi.encontrarPostagemPorId(postagemUrl)
                .then(postagemAchada => {
                    ReadableApi.getComentariosDaPostagem(postagemAchada.id)
                        .then(comentarios => this.setState({comentarios}));    
                    this.setState({postagem: postagemAchada});
            });
        }
    } 
    mostrarDivParaCriarComentario(){
        this.setState({divCriarComentario: true});
    }    
    aoCriarComentario(comentarioParcial) {
        const {comentarios, postagem} = this.state;
        comentarioParcial.id = Date.now();
        comentarioParcial.timestamp = Date.now();
        comentarioParcial.voteScore = 1;
        comentarioParcial.deleted = false;
        comentarioParcial.parentDeleted = false;
        comentarioParcial.parentId = postagem.id;        
        comentarios.push(comentarioParcial);        
        postagem.commentCount++
        ReadableApi.postComentario(comentarioParcial)
            .then(this.props.alterarPostagem(postagem))
            .then(()=>{
                this.esconderDivParaCriarComentario();
                this.setState({comentarios,postagem});
            });
    }
    esconderDivParaCriarComentario(){
        this.setState({divCriarComentario: false});
    }
    removerComentario(comentarioRemovido) {
        const {comentarios, postagem} = this.state;
        const comentariosAtualizados = comentarios
                .filter(comentarioNoEstado => comentarioNoEstado.id !== comentarioRemovido.id);
        postagem.commentCount--;
        ReadableApi.removerComentario(comentarioRemovido)
            .then(this.props.alterarPostagem(postagem))
            .then(()=>{
                this.esconderDivParaCriarComentario();
                this.setState({comentarios: comentariosAtualizados,postagem});
            });
    }
    aoAlterarComentario(comentarioAlterado) {       
        ReadableApi.alterarComentario(comentarioAlterado)
            .then(this.mudarEstadoDoComentarioAlterado(comentarioAlterado));
    }
    mudarEstadoDoComentarioAlterado(comentarioAlterado){
        const {comentarios} = this.state;
        const comentariosAjustados = comentarios.map(comentarioNoEstado => {
            if (comentarioNoEstado.id === comentarioAlterado.id) {
                return comentarioAlterado;
            } else {
                return comentarioNoEstado;
            }
        });        
        this.setState({comentarios: comentariosAjustados})
    }
    render() {
        const {postagem, comentarios, divCriarComentario} = this.state;
        return (<div>
                    <Alert color="primary">
                        Detalhe Postagem               
                        <Link to='/'>
                            <Button size="sm" style={{float: 'right'}} color="default">
                                Voltar ao Mural
                            </Button>                
                        </Link>    
                    </Alert> 
                    {postagem && <Postagem postagem={postagem} />}
                    <div>
                         <p>        
                             <Button onClick={() => this.mostrarDivParaCriarComentario()} color='info' >Novo Cometario</Button>         
                         </p>
                    </div>
                    {divCriarComentario && 
                        <SalvarComentario 
                            aoCriarComentario={(comentario)=>{this.aoCriarComentario(comentario)}}
                        />}
                    {comentarios && comentarios
                        .filter(comentario => (comentario.deleted === false))
                        .sort((a, b) => (a.voteScore < b.voteScore))
                        .map(comentario => (<Comentario 
                                                key={comentario.id} 
                                                comentario={comentario}
                                                removerComentario={comentario=>this.removerComentario(comentario)}
                                                aoAlterarComentario={comentario=>this.aoAlterarComentario(comentario)}
                                            />))}
                </div>);
    }

}

function mapDispatchToProps(dispatch) {
    return {
        alterarPostagem: (data) => dispatch(alterarPostagem(data)),
    };
}

export default connect(null, mapDispatchToProps)(DetalhePostagem);
