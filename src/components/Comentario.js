import React, { Component } from 'react';
import {Jumbotron, Button} from 'reactstrap';
import {converterTimestamp} from '../utils/helper';
import serializeForm from 'form-serialize';
import * as ReadableApi from '../utils/ReadableApi';

class Comentario extends Component {
    state = {
        comentario: null,
        divAlterarComentario: false,
        body: '',
    }  
    componentDidMount() {
        const {comentario} = this.props;
        this.setState({body: comentario.body, comentario});
    }
    mostrarDivParaAlterarComentario(){
        this.setState({divAlterarComentario: true});
    }
    atualizarCampoCorpo = (valor) => {
        this.setState({body: valor});
    }
    auxiliarDeSubmiti = (evento) => {
        evento.preventDefault();
        const valores = serializeForm(evento.target, {hash: true});
        if (this.props.aoAlterarComentario) {
            const {comentario} = this.props;           
            comentario.body = valores.body;
            this.props.aoAlterarComentario(comentario);
            this.esconderDivParaAlterarComentario();
        }
    }    
    esconderDivParaAlterarComentario(){
        this.setState({divAlterarComentario: false});
    }    
    votar(valor) { 
        const {comentario} = this.state;        
        if(valor === 'upVote'){
            comentario.voteScore++;
        }else{
            comentario.voteScore--;
        } 
        this.setState({comentario});
        ReadableApi.votar(comentario.id, 'comments', valor);                       
    }
    render() {
        const {divAlterarComentario, body, comentario} = this.state;
        const {removerComentario, aoAlterarComentario} = this.props;
        let data = null;
        if(comentario){
            data = converterTimestamp(comentario.timestamp);
        }
        return (<div>
            {comentario && <Jumbotron>
                <h3>Comentário</h3>
                <p className="lead">{comentario.body}</p>
                <hr className="my-2" />
                <p className="lead">{data} - Author: {comentario.author}</p> 
                <p>
                    Score: {comentario.voteScore}&nbsp;
                    <Button color='success' onClick={() => {this.votar('upVote')}}>Plus</Button>&nbsp;
                    <Button color='danger' onClick={() => {this.votar('downVote')}}>Minus</Button>       
                </p>  
                {removerComentario &&
                    <div>
                         <p>        
                             <Button onClick={() => removerComentario(comentario)} color='danger' >Remover</Button>         
                         </p>
                    </div>    
                }
                {aoAlterarComentario &&
                    <div>
                         <p>        
                             <Button onClick={() => this.mostrarDivParaAlterarComentario()}>Alterar</Button>         
                         </p>
                    </div>    
                }
                {divAlterarComentario &&
                    <div>
                        <form onSubmit={this.auxiliarDeSubmiti}>
                            <p>Alterar Comentario</p> 
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
                            <p><Button>Alterar</Button></p>
                        </form>
                    </div>    
                }
            </Jumbotron>}       
        </div>);
    }
}


export default (Comentario);
