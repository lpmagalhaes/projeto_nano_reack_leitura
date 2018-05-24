import React, { Component } from 'react';
import {Jumbotron, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {selecionarPostagem} from '../actions';

class Postagem extends Component {
    render() {
        const {postagem, selecionarPostagem} = this.props;
        const data = this.converterTimestamp(postagem.timestamp);
        return (<div>
            <Jumbotron>               
                <h1 className="display-6">{postagem.title}</h1>
                <p className="lead">{postagem.body}</p>
                <hr className="my-2" />
                <p className="lead">{data} - Author: {postagem.author}</p> 
                <p>
                    <Link to={`/detalhe/${postagem.id}`}>
                    <Button onClick={() => selecionarPostagem(postagem)}>Detalhes da Postagem</Button> 
                    </Link>
                </p>  
                <p>
                    <Button>Comentários {postagem.commentCount}</Button>&nbsp;
                    <Link to={postagem.category}><Button>#{postagem.category}</Button></Link>       
                </p>
                <p>
                    Score: {postagem.voteScore}&nbsp;
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

function mapDispatchToProps(dispatch) {
    return {
        selecionarPostagem: (data) => dispatch(selecionarPostagem(data)),
    }
}

export default connect(null, mapDispatchToProps)(Postagem);
