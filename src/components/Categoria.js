import React, { Component } from 'react';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';

class Categoria extends Component {   
    render() {
        const {categoria} = this.props;
        return (<Link to={categoria.path}><Button style={{'margin-left':'5px'}}>{categoria.name}</Button></Link>)
    };
}

export default Categoria;