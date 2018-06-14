import React, { Component } from 'react';
import Postagem from './Postagem';
import SalvarComentario from './SalvarComentario';
import Comentario from './Comentario';
import {Alert, Button} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';
import {alterarPostagem, salvarComentario} from '../actions';
import {connect} from 'react-redux';

class DetalhePostagem extends Component {
     state = {
        divCriarComentario: false,
    }
    mostrarDivParaCriarComentario(){
        this.setState({divCriarComentario: true});
    }    
    aoCriarComentario(comentarioParcial) {
        let postagem = null;
        const idUrl = this.props.match.params.id;        
        this.props.postagens.map(postagemNaStore => {
            if(postagemNaStore.id.toString() === idUrl.toString()){
               postagem = postagemNaStore;
            }
        });
        const {alterarPostagem, salvarComentario} = this.props;
        comentarioParcial.id = Date.now();
        comentarioParcial.timestamp = Date.now();
        comentarioParcial.voteScore = 1;
        comentarioParcial.deleted = false;
        comentarioParcial.parentDeleted = false;
        comentarioParcial.parentId = postagem.id;  
        postagem.commentCount++;        
        salvarComentario(comentarioParcial)
            .then(alterarPostagem(postagem))
            .then(()=> this.esconderDivParaCriarComentario());
    }
    esconderDivParaCriarComentario(){
        this.setState({divCriarComentario: false});
    }    
    render() {
        let postagem = null;
        const idUrl = this.props.match.params.id;        
        this.props.postagens.map(postagemNaStore => {
            if(postagemNaStore.id.toString() === idUrl.toString()){
               postagem = postagemNaStore;
            }
        });        
        const {divCriarComentario} = this.state;
        const {comentarios} = this.props;
        if(postagem && postagem.deleted){
            return <Redirect to={`/`}/>
        }
        return (<div>
                    <Alert color="primary">
                        Detalhe Postagem               
                        <Link to='/'>
                            <Button size="sm" style={{float: 'right'}} color="default">
                                Voltar ao Mural
                            </Button>                
                        </Link>    
                    </Alert> 
                    {postagem && <Postagem id={postagem.id} />}
                    <div>
                         <p>        
                             <Button onClick={() => this.mostrarDivParaCriarComentario()} color='info' >Novo Cometario</Button>         
                         </p>
                    </div>
                    {divCriarComentario && 
                        <SalvarComentario 
                            aoCriarComentario={(comentario)=>{this.aoCriarComentario(comentario)}}
                        />}
                    {postagem && comentarios && comentarios
                        .filter(comentario => (comentario.parentId === postagem.id))
                        .filter(comentario => (comentario.deleted === false))
                        .sort((a, b) => (a.voteScore < b.voteScore))
                        .map(comentario => (<Comentario 
                                                key={comentario.id} 
                                                id={comentario.id}
                                                removerComentario={comentario=>this.removerComentario(comentario)}
                                                aoAlterarComentario={comentario=>this.aoAlterarComentario(comentario)}
                                            />))}
                </div>);
    }

}

function mapStateToProps({postagens, comentarios}) {
    return {postagens, comentarios};
}

function mapDispatchToProps(dispatch) {
    return {
        alterarPostagem: (data) => dispatch(alterarPostagem(data)),
        salvarComentario: (data) => dispatch(salvarComentario(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalhePostagem);
