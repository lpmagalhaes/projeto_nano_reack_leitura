import React, { Component } from 'react';
import {Jumbotron, Button, Alert} from 'reactstrap';
import {converterTimestamp} from '../utils/helper';
import {Link} from 'react-router-dom';
import {inativarPostagem, alterarPostagem} from '../actions';
import {connect} from 'react-redux';
import EditarPostagem from './EditarPostagem';
import * as ReadableApi from '../utils/ReadableApi';

class Postagem extends Component {
    state = {
        postagem: null,
        divAlterarPostagem: false,
    }
    componentDidMount() {
        this.setState({postagem: this.props.postagem});
    }
    selecionarParaEditarPostagem() {
        this.setState({divAlterarPostagem: true});
    }
    aoAlterarPostagem(postagemAlterada) {
        this.props.alterarPostagem(postagemAlterada)
                .then(() => {
                    this.setState({divAlterarPostagem: false});
                });
    }
    aoInativarPostagem(postagem) {
        this.props.inativarPostagem(postagem);
        postagem.deleted = true;
        this.setState({postagem: postagem});
    }
    votar(valor) { 
        const {postagem} = this.state;        
        if(valor === 'upVote'){
            postagem.voteScore++;
        }else{
            postagem.voteScore--;
        }        
        this.setState({postagem: postagem});
        ReadableApi.votar(postagem.id, 'posts', valor);                       
    }
    render() {
        const {postagem, divAlterarPostagem} = this.state;
        let data = null;
        if (postagem) {
            data = converterTimestamp(postagem.timestamp);
        }
        return (<div>
                    {postagem && postagem.deleted === false ?
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
                                <Button color='success' onClick={() => {this.votar('upVote')}}>Plus</Button>&nbsp;
                                <Button color='danger' onClick={() => {this.votar('downVote')}}>Minus</Button>         
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

                        </Jumbotron> : <Alert color="danger">Postagem Apagada</Alert>}        
        </div>);
    }

}

function mapDispatchToProps(dispatch) {
    return {
        inativarPostagem: (data) => dispatch(inativarPostagem(data)),
        alterarPostagem: (data) => dispatch(alterarPostagem(data)),
    };
}

export default connect(null, mapDispatchToProps)(Postagem);
