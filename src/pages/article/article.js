import React, {Component} from 'react';
import { Link } from 'react-router-dom';


import './article.css';
const R = require('ramda');
const base64 = require('base-64');


class Articulo extends Component{
  constructor(props){
    super(props);
    this.findQuery=this.findQuery.bind(this);
    this.state={
      id:0,
      titulo:"",
      cuerpo:"",
      articles:""
    }
    this.getDia=this.getDia.bind(this);
    this.getMes=this.getMes.bind(this);
    this.titulo="";
    this.cuerpo="";
  }
  getDia(){
    const fecha=new Date();
    const days=["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
    let dayName;
    dayName="";
    for (var i = 0; i <= days.length; i++) {
      if((fecha.getDay())===i){
        dayName=days[i];
        return dayName;
        break;
      }
    }
  }
  getMes(){
    const fecha=new Date();
    let mes;
    mes="";
    const months=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio",
                  "Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    for (var i = 0; i < months.length; i++) {
      if(fecha.getMonth()===i){
        mes=months[i];
        return mes;
        break;
      }
    }
  }
  findQuery(){
    const parseSearchString = R.compose(
      R.fromPairs,
      R.map(R.split('=')),
      R.split('&'),
      R.slice(1, Infinity));

    const q = parseSearchString(window.location.search);
    return q;
  }
  componentWillMount(){
    this.setState({id:parseInt(this.findQuery().article)});

   }
   componentDidMount(){

     fetch("http://0.0.0.0:8000/steemit/"+this.state.id+"/",{
       method:"GET",
       mode:'cors',
       credentials:'include'

     }).then((response) => {
          return response.json()
      }).then((json) => {
           console.log('parsed json', json)
           this.setState({articles:json});
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      });
  }

  render(){

      const fecha=new Date();
      let fechaString=this.getDia()+", "+fecha.getDate()+" de "+this.getMes()+" de "+fecha.getFullYear().toString();

    return(
    <div className="contenido">

        <div className="articlePage">
           <h1>{this.state.articles.title}</h1>
            <p>{this.state.articles.cuerpo}</p>
            <Link to="/test/"><button><p>Volver</p></button></Link>
        </div>
      </div>

    );

  }

}

export default Articulo;
