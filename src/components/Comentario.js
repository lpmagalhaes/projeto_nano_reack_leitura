import React, { Component } from 'react';
import {Jumbotron, Button} from 'reactstrap';
import {converterTimestamp} from '../utils/helper';
import serializeForm from 'form-serialize';

class Comentario extends Component {
    state = {
        divAlterarComentario: false,
        body: '',
    }  
    componentDidMount() {
        const {comentario} = this.props;
        this.setState({body: comentario.body});
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
    render() {
        const {divAlterarComentario, body} = this.state;
        const {comentario, removerComentario,
        aoAlterarComentario} = this.props;
        const data = converterTimestamp(comentario.timestamp);
        return (<div>
            <Jumbotron>
                <h3>Comentário</h3>
                <p className="lead">{comentario.body}</p>
                <hr className="my-2" />
                <p className="lead">{data} - Author: {comentario.author}</p> 
                <p>
                    Score: {comentario.voteScore}&nbsp;
                    <Button color='success'>Plus</Button>&nbsp;
                    <Button color='danger'>Minus</Button>         
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
            </Jumbotron>        
        </div>);
    }
    converterTimestamp(valor) {
        const data = new Date(valor);
        return `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}-${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;
    }

}


export default (Comentario);
