import React, {Component} from 'react';
import TopNew from './mainComponents/topNew.js';
import Titulares from './mainComponents/titulares.js';
import TopArticle from './mainComponents/topArticle.js';
import Aside from './mainComponents/asides.js';
import cup from '../../../img/worldcup.jpg';
import sophia from '../../../img/sophia.jpg';
import steemit from '../../../img/steemit.png';
import storm from '../../../img/storm.jpg';
import protesta from '../../../img/protestas.jpg';
import trump2 from '../../../img/trump2.jpg';
import speech from '../../../img/9.jpg';
import steemit2 from '../../../img/steemit.jpg';
import cuatro from '../../../img/4.jpg';
import circo from '../../../img/circo.jpg';
import snow from '../../../img/snow.jpg';
import champions from '../../../img/champions.jpg';
import bruno from '../../../img/bruno.jpg';




class Main extends Component{

  constructor(props){
    super(props);
    this.state={
      articles:[],
      ids:[]
    }
      this.ids=[];
      this.handleAdd = this.handleAdd.bind(this);

  }
  handleAdd(){
      let newIds=this.state.ids.slice();
      this.state.articles.forEach((article)=>{
        if(article.curado===true){
          newIds.push(article.id.toString());
        }

    });
    this.setState({ids:newIds});
  }

  componentWillMount(){
    fetch("http://138.201.188.83:8000/steemit/",{
      method:"GET",
      mode:'cors',
      credentials:'include'

    }).then((response) => {
         return response.json()
     }).then((json) => {
          console.log('parsed json', json)
          this.setState({articles:json});
     }).then((action)=>{
       let newIds=this.state.ids.slice();
       this.state.articles.forEach((article)=>{
         if(article.curado===true){
           newIds.push(article.id.toString());
         }
     });
     this.setState({ids:newIds});
     }).catch(function(ex) {
       console.log('parsing failed', ex)
     });


  }





  render(){
    this.ids=this.state.ids.slice();
    console.log(this.state.ids);



    return(
    <div className="main">

      <Titulares/>
      <div className="contenedor clearfix">

        <main className="main-cuerpo clearfix">
          <div className="mainTitle">
            <h1>Política</h1>
          </div>
          <div className="categoria clearfix">
            <TopArticle Url={trump2} titular="Política" id="1"/>
            <TopArticle Url={speech} titular='Política' id="2"/>
          </div>{/*Categoria*/}
          <div className="mainTitle">
            <h1>Economía</h1>
          </div>
          <div className="categoria clearfix">
            <TopArticle Url={steemit2} titular="Economía" id="3"/>
            <TopArticle Url={cuatro} titular='Economía' id="4"/>
          </div>{/*Categoria*/}
          <div className="mainTitle">
            <h1>Cultura</h1>
          </div>
          <div className="categoria clearfix">
            <TopArticle Url={circo} titular="Cultura" id="5"/>
            <TopArticle Url={sophia} titular='Cultura' id="6"/>
          </div>{/*Categoria*/}
          <div className="mainTitle">
            <h1>Deporte</h1>
          </div>
          <div className="categoria clearfix">
            <TopArticle Url={snow} titular="Deporte" id="7"/>
            <TopArticle Url={champions} titular='Deporte' id="8"/>
          </div>{/*Categoria*/}
          <div className="mainTitle">
            <h1>Suceso</h1>
          </div>
          <div className="categoria clearfix">
            <TopArticle Url={sophia} titular="Suceso" id="9"/>
            <TopArticle Url={bruno} titular='Suceso' id="10"/>
          </div>{/*Categoria*/}
        </main>
        <Aside/>

      </div>
    </div>
    );

  }

}

export default Main;
