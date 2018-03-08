import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Header from './components/header.js'
import Table from './components/table.js'
import './curate.css';

class Curate extends Component {

  render(){
    
    return(
      <div className="Curate contenido">
        <Header/>
        <Table/>
        <Link to="/test"><button>Volver</button></Link>
      </div>
    );
  }

}
export default Curate;
