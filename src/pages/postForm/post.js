import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Header from './components/header.js';
import sc2 from 'sc2-sdk';
import './post.css';

class Post extends Component {
    constructor(props){
      super(props);
      this.state={
        user: '',
        titleValue:'',
        bodyValue:'',
        tagsValue:'',
        imageURL:'',
        api:this.props.api
      }
      this.accessToken='';
      this.api=null;
      this.sendData=this.sendData.bind(this);
      this.handleBodyChange=this.handleBodyChange.bind(this);
      this.setData=this.setData.bind(this);
      this.handleTitleChange=this.handleTitleChange.bind(this);
      this.cleanData=this.cleanData.bind(this);
      this.handleUploadImage = this.handleUploadImage.bind(this);

    }
    setData(authorData,titleData,bodyData,imageURL){
      const jsonData={
        "autor":authorData,
        "token": this.accessToken,
        "title":titleData,
        "cuerpo":bodyData,
        "image":imageURL,
        "evaluado":false,
        "formateado":false,
        "curado":false
      }
      return jsonData;
    }

  sendData(event){
    const data=this.setData(this.state.user.name,this.state.titleValue,this.state.bodyValue,"URL");
    const finalData=JSON.stringify(data);
    const url="http://0.0.0.0:8000/publicaciones/";
      fetch(url,{
        method: "POST",
        body: finalData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then(res =>{
        console.log(res);
        alert("Artículo enviado a la cola de revisión")

      } )
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
      });

      console.log("/data=", finalData);
      event.preventDefault();

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
  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);

    fetch('https://steemitimages.com', {
      method: 'POST',
      body: data,
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      {/*response.json().then((body) => {
        this.setState({ imageURL: `https://steemitimages.com/${body.file}` });

      }); */}
      console.log(response);
    });
}
setUserInfo(){

    var res=this.state.api.me((err,result)=>{
      console.log('/me',err,result);
      if(!err){
        this.setState({user:result.account})
      }
    });
}

setAccessToken(option){
  {/*this.setState({accessToken:this.findQuery().access_token});*/}
  if(option=='firstTime'){
    this.accessToken=this.findQuery().access_token;
    if(this.accessToken){
      this.state.api.setAccessToken(this.accessToken);
      localStorage.setItem('token', this.accessToken);

      this.setUserInfo();
    }
  }
  else{
    this.accessToken=option;
    if(this.accessToken){
      this.state.api.setAccessToken(this.accessToken);
      console.log('/token', this.accessToken);
      this.setUserInfo();
    }
  }

}
componentWillMount(){
  {/* this.api = sc2.Initialize({
         app: 'bloquetest',
         callbackURL: 'http://localhost:3001/test',
         accessToken: 'access_token',
         scope: ['login','vote','comment']
     });
   */}
 }

 componentDidMount() {
   const preAcces=localStorage.getItem('token');
   if (preAcces){
     this.setAccessToken(preAcces);
   }
   else{
     this.setAccessToken('firstTime');
   }
 }


render(){

  return(
    <div className="Post contenido">

    <Header/>
    <form  >
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
       <input type="button" value="Publicar" onClick={this.sendData} ></input>
      </div>
      <div className="button">
       <input type="button" value="Guardar"></input>
      </div>
      <div className="button">
       <input type="button" value="Limpiar" onClick={this.cleanData}></input>
      </div>
      </form>
      <br/><br/><br/><br/><hr/>
      <form onSubmit={this.handleUploadImage}>
        <div>
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
        </div>
        <div>
          <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
        </div>
        <br />
        <div>
          <button>Upload</button>
        </div>
        <img src={this.state.imageURL} alt="img" />
      </form>
        <Link to="/test" > <button>Volver</button></Link>
      </div>


    );
  }

}
export default Post;
