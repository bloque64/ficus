import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import sc2 from 'sc2-sdk';

import './publish.css';
const R = require('ramda');
const base64 = require('base-64');


class Articulo extends Component{
  constructor(props){
    super(props);
    this.findQuery=this.findQuery.bind(this);
    this.state={
      id:0,
      user:null,
      titulo:"",
      cuerpo:"",
      articles:""
    }
    this.post=this.post.bind(this);
    this.api=null;
    this.sendData=this.sendData.bind(this);
    this.setData=this.setData.bind(this);
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
  setData(authorData,titleData,bodyData){
    const jsonData={
      "autor": authorData,
      "title": titleData,
      "cuerpo": bodyData,
      "image": this.state.articles.image,
      "votado": false,
      "publicado": true
    }
    return jsonData;
  }
  post(){
    this.api.comment('', 'testing', this.state.user.name,this.state.articles.title.toLowerCase(), this.state.articles.title, this.state.articles.cuerpo, '', function (err, res) {
      console.log(err, res)
    });
  }

sendData(event){
  const data=this.setData(this.state.articles.autor,this.state.articles.title,this.state.articles.cuerpo, this.state.articles.image);
  const finalData=JSON.stringify(data);
  const url="http://0.0.0.0:8000/steemit/";
  const url2="http://0.0.0.0:8000/publicaciones/"+this.state.id+"/";

    fetch(url,{
      method: "POST",
      body: finalData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    }).then(res => {console.log(res)
        alert("¡Artículo publicado!")

    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ', error.message);
    });

    fetch(url2,{
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    }).then(res => {console.log(res)
    })
    .catch(function(error) {
      console.log('There has been a problem with your delete operation: ', error.message);
    });
    console.log("/finaldata=", finalData);

    this.post();

}
setUserInfo(){

    var res=this.api.me((err,result)=>{
      console.log('/me',err,result);
      if(!err){
        this.setState({user:result.account})
      }
    });
}

setAccessToken(option){
  {/*this.setState({accessToken:this.findQuery().access_token});*/}

    this.accessToken=option;
    if(this.accessToken){
      this.api.setAccessToken(this.accessToken);
      console.log('/token', this.accessToken);
      this.setUserInfo();
    }


}
  componentWillMount(){
    this.api = sc2.Initialize({
          app: 'bloquetest',
          callbackURL: 'http://localhost:3001/test',
          accessToken: 'access_token',
          scope: ['login','vote','comment']
      });
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
           this.setState({articles:json});
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      }).then(()=>{
        const preAcces=localStorage.getItem('token');
        this.setAccessToken(this.state.articles.token);
      });


  }

  render(){

      const fecha=new Date();
      let fechaString=this.getDia()+", "+fecha.getDate()+" de "+this.getMes()+" de "+fecha.getFullYear().toString();

    return(
    <div className="contenido">

        <div className="previewPage">
           <h1>{this.state.articles.title}</h1>
            <p>{this.state.articles.cuerpo}</p>
            <input type="button" value="publicar" onClick={this.sendData}/>
            <Link to="/test/publishlist"><button><p>Volver</p></button></Link>
        </div>
      </div>

    );

  }

}

export default Articulo;
