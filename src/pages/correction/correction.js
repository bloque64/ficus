import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Header from './components/header.js';


import './correction.css';
const R = require('ramda');

class Post extends Component {

    constructor(props){
      super(props);
      this.state={
        id:"",
        article:"",
        authorValue: '',
        titleValue:'',
        bodyValue:'',
        tagsValue:'',
        imageURL:''
      }
      this.sendData=this.sendData.bind(this);
      this.handleBodyChange=this.handleBodyChange.bind(this);
      this.setData=this.setData.bind(this);
      this.handleTitleChange=this.handleTitleChange.bind(this);
      this.cleanData=this.cleanData.bind(this);
      this.findQuery=this.findQuery.bind(this);


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
    setData(authorData,titleData,bodyData,imageURL){
      const jsonData={
        "autor":authorData,
        "token": this.state.article.token,
        "title":titleData,
        "cuerpo":bodyData,
        "image":imageURL,
        "evaluado":false,
        "formateado":true,
        "curado":true
      }
      return jsonData;
    }

  sendData(event){
    const data=this.setData(this.state.article.autor,this.state.titleValue,this.state.bodyValue,this.state.article.image);
    const finalData=JSON.stringify(data);
    const url="http://0.0.0.0:8000/publicaciones/"+this.state.id+"/";

      fetch(url,{
        method: "PUT",
        body: finalData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      }).then(res => {console.log(res)
          alert("¡Artículo corregido!")

      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
      });

      console.log("/finaldata=", finalData);


  }
  handleBodyChange(event){
    this.setState({bodyValue: event.target.value});
  }
  handleTitleChange(event){
    this.setState({titleValue: event.target.value});
  }
  cleanData(event){
    this.setState({bodyValue:""});
    this.setState({titleValue:""});
  }
  componentWillMount(){
    this.setState({id:parseInt(this.findQuery().article)});

   }
   componentDidMount(){

     fetch("http://0.0.0.0:8000/publicaciones/"+this.state.id+"/",{
       method:"GET",
       mode:'cors',
       credentials:'include'

     }).then((response) => {
          return response.json()
      }).then((json) => {
           console.log('parsed json', json)
           this.setState({article:json});
      }).then((json) => {
          this.setState({bodyValue:this.state.article.cuerpo});
          this.setState({titleValue:this.state.article.title});
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      });



  }

render(){


  return(
    <div className="Post contenido">

    <Header/>

    <form >
      <div className="title-input input">
        <input className="title-form form" placeholder="Título" onChange={this.handleTitleChange} value={this.state.titleValue}></input>
      </div>
      <div className="body-input input">
        <textarea className="main-form form" placeholder="Tu historia" onChange={this.handleBodyChange} value={this.state.bodyValue}></textarea>
      </div>
      <div className="tags-input input">
        <input className="tag-form form" placeholder="Categoría(Política, Economía, etc)"></input>
      </div>

      <div className="button">
       <input type="button" onClick={this.sendData} value="Enviar" ></input>
      </div>
      <div className="button">
       <input type="button" value="Guardar"></input>
      </div>
      </form>
      <br/><br/><br/><br/><hr/>
        <Link to="/test" > <button>Volver</button></Link>
      </div>


    );
  }

}
export default Post;
