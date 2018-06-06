import React, { Component } from 'react';
import {Jumbotron, Button, Alert} from 'reactstrap';
import {converterTimestamp} from '../utils/helper';
import serializeForm from 'form-serialize';

class DetalhePostagem extends Component {
    state = {
        divCriarComentario: false,
        body: '',
        author: '',
    }
    
    mostrarDivParaCriarComentario(){
        this.setState({divCriarComentario: true});
    }
    atualizarCampoCorpo = (valor) => {
        this.setState({body: valor});
    }
    atualizarCampoAutor = (valor) => {
        this.setState({author: valor});
    }
    auxiliarDeSubmiti = (evento) => {
        evento.preventDefault();
        const valores = serializeForm(evento.target, {hash: true});
        if (this.props.aoCriarComentario) {
            const {postagem} = this.props;           
            valores.parentId = postagem.id;
            this.props.aoCriarComentario(valores, postagem);
            this.esconderDivParaCriarComentario();
        }
    }
    
    esconderDivParaCriarComentario(){
        this.setState({divCriarComentario: false});
    }
    
    render() {
        const {postagem, selecionarPostagem, 
            removerPostagem, selecionarParaEditarPostagem,
            aoCriarComentario} = this.props;
        const {divCriarComentario, body, author} = this.state;
        let data = null;
        if(postagem){
            data = converterTimestamp(postagem.timestamp);
        }
        return (<div>
            {postagem ?
            <Jumbotron>                
                <h1 className="display-6">{postagem.title}</h1>
                <p className="lead">{postagem.body}</p>
                <hr className="my-2" />
                <p className="lead">{data} - Author: {postagem.author}</p>                
                {selecionarPostagem &&    
                    <p>
                        <Button onClick={() => selecionarPostagem(postagem)}>Detalhes da Postagem</Button>                         
                    </p>              
                }
                <p>
                    <Button>Comentários {postagem.commentCount}</Button>&nbsp;
                    <Button>#{postagem.category}</Button>     
                </p>
                <p>
                    Score: {postagem.voteScore}&nbsp;
                    <Button color='success'>Plus</Button>&nbsp;
                    <Button color='danger'>Minus</Button>         
                </p>
                {removerPostagem &&  
                    <div>
                        <p>        
                            <Button onClick={() => {removerPostagem()}} color='danger'>Remover Postagem</Button>         
                        </p>
                    </div>                    
                }
                {selecionarParaEditarPostagem &&  
                    <div>
                        <p>        
                            <Button onClick={() => {selecionarParaEditarPostagem()}} >Editar Postagem</Button>         
                        </p>
                    </div>                    
                }
                {aoCriarComentario &&
                    <div>
                         <p>        
                             <Button onClick={() => this.mostrarDivParaCriarComentario()} color='info' >Novo Cometario</Button>         
                         </p>
                    </div>    
                }
                {divCriarComentario &&
                    <div>
                        <form onSubmit={this.auxiliarDeSubmiti}>
                            <p>Criar Comentario</p> 
                            <p>Autor</p>
                            <p>
                                <input 
                                    value={author}
                                    type='text' 
                                    name='author'
                                    placeholder='Autor'                            
                                    onChange={(event) => {
                                        this.atualizarCampoAutor(event.target.value)
                                    }} 
                                />
                            </p>
                            <p>Corpo</p>
                            <p>
                                <input 
                                    value={body}
                                    type='text' 
                                    name='body'
                                    placeholder='Corpo'                            
                                    onChange={(event) => {
                                        this.atualizarCampoCorpo(event.target.value)
                                    }} 
                                />
                            </p>
                            <p><Button>Criar</Button></p>
                        </form>
                    </div>
                }
            </Jumbotron> : <Alert color="danger">Postagem Apagada</Alert>}        
        </div>);
    }

}

export default DetalhePostagem;
