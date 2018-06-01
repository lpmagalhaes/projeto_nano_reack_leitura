import React, { Component } from 'react';
import {Jumbotron, Button} from 'reactstrap';
import {converterTimestamp} from '../utils/helper';

class Comentario extends Component {
    render() {
        const {comentario} = this.props;
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
            </Jumbotron>        
        </div>);
    }
    converterTimestamp(valor) {
        const data = new Date(valor);
        return `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}-${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;
    }

}


export default (Comentario);
