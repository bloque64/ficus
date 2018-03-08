import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Header from './components/header.js';
import './post.css';
class Post extends Component {
    constructor(props){
      super(props);
      this.state={
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
      this.handleUploadImage = this.handleUploadImage.bind(this);

    }
    setData(authorData,titleData,bodyData){
      const jsonData={
        "autor":authorData,
        "title":titleData,
        "cuerpo":bodyData,
        "evaluado":false,
        "formateado":false,
        "curado":false
      }
      return jsonData;
    }

  sendData(event){
    const data=this.setData("victor",this.state.titleValue,this.state.bodyValue);
    const finalData=JSON.stringify(data);
    const url="http://138.201.188.83:8000/publicaciones/";
      fetch(url,{
        method: "POST",
        body: finalData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then(res => console.log(res))
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

    fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ imageURL: `http://localhost:8000/${body.file}` });
      });
    });
}
render(){

  return(
    <div className="Post contenido">
    <Header/>
    <form onSubmit={this.sendData} >
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
       <input type="submit" value="Publicar" ></input>
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
