import React, { Component } from 'react';
import {Jumbotron, Button} from 'reactstrap';
import {converterTimestamp} from '../utils/helper';
import {Link} from 'react-router-dom';
import {inativarPostagem, alterarPostagem, atualizarPostagem} from '../actions';
import {connect} from 'react-redux';
import EditarPostagem from './EditarPostagem';
import * as ReadableApi from '../utils/ReadableApi';

class Postagem extends Component {
    state = {
        divAlterarPostagem: false,
    }
    selecionarParaEditarPostagem() {
        this.setState({divAlterarPostagem: true});
    }
    aoAlterarPostagem(postagemAlterada) {
        this.props.alterarPostagem(postagemAlterada)
            .then(this.setState({divAlterarPostagem: false}));
    }
    aoInativarPostagem(postagem) {
        this.props.inativarPostagem(postagem);
    }
    votar(valor, postagem) {           
        if(valor === 'upVote'){
            postagem.voteScore++;
        }else{
            postagem.voteScore--;
        }        
        ReadableApi.votar(postagem.id, 'posts', valor)
            .then(this.props.atualizarPostagem(postagem));                                
    }
    render() {
        const {divAlterarPostagem} = this.state;
        let postagem = null;
        const id = this.props.id;        
        this.props.postagens.map(postagemNaStore => {
            if(postagemNaStore.id.toString() === id.toString()){
               postagem = postagemNaStore;
            }
        });   
        let data = null;
        if (postagem) {
            data = converterTimestamp(postagem.timestamp);
        }        
        return (<div>
                    {postagem &&
                        <Jumbotron>                
                            <h1 className="display-6">{postagem.title}</h1>
                            <p className="lead">{postagem.body}</p>
                            <hr className="my-2" />
                            <p className="lead">{data} - Author: {postagem.author}</p>
                            <p>
                                <Link to={`/${postagem.category}/${postagem.id}`}>
                                <Button>Detalhes da Postagem</Button>
                                </Link>    
                            </p> 
                            <div>
                                <p>Comentários {postagem.commentCount}</p>
                                <p><Link to={`/${postagem.category}`}><Button>#{postagem.category}</Button></Link></p>     
                            </div>
                             <p>
                                Score: {postagem.voteScore}&nbsp;
                                <Button color='success' onClick={() => {this.votar('upVote', postagem)}}>Plus</Button>&nbsp;
                                <Button color='danger' onClick={() => {this.votar('downVote', postagem)}}>Minus</Button>         
                            </p>
                            <div>
                                <p>        
                                    <Button onClick={() => {this.aoInativarPostagem(postagem)}} color='danger'>Remover Postagem</Button>         
                                </p>
                            </div> 
                            <div>
                                <p>        
                                    <Button onClick={() => {this.selecionarParaEditarPostagem()}} >Editar Postagem</Button>         
                                </p>
                            </div>
                            {divAlterarPostagem &&
                                <div>
                                    <EditarPostagem 
                                        postagem={postagem}
                                        aoAlterarPostagem={(postagem) => this.aoAlterarPostagem(postagem)}/>
                                </div>
                            }

                        </Jumbotron>}        
        </div>);
    }

}

function mapStateToProps({postagens}) {
    return {postagens};
}

function mapDispatchToProps(dispatch) {
    return {
        inativarPostagem: (data) => dispatch(inativarPostagem(data)),
        alterarPostagem: (data) => dispatch(alterarPostagem(data)),
        atualizarPostagem: (data) => dispatch(atualizarPostagem(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Postagem);
