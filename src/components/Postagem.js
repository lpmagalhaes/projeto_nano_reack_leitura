import React, { Component } from 'react';
import {Jumbotron, Button} from 'reactstrap';
import {Link} from 'react-router-dom';

class Postagem extends Component {
    render() {
        const {postagem} = this.props;
        return (<div>
            <Jumbotron>
                <h1 className="display-6">{postagem.title}</h1>
                <p className="lead">{postagem.body}</p>
                <hr className="my-2" />
                <p className="lead">Author: {postagem.author}</p> 
                <div>
                    <Button style={{float:'left'}}>Comentários {postagem.commentCount}</Button>&nbsp;
                    <Link to={postagem.category}><Button>#{postagem.category}</Button></Link>       
                    <p style={{float:'right'}}>
                        Score: {postagem.voteScore}&nbsp;
                        <Button color='success'>Plus</Button>&nbsp;
                        <Button color='danger'>Minus</Button>         
                    </p>
                </div>        
            </Jumbotron>        
        </div>);
    }
}

export default Postagem;