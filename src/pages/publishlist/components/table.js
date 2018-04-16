import React, {Component} from 'react';

import { Link } from 'react-router-dom';

class Table extends Component {

  constructor(props){
    super(props);
    this.state={
      articles:[],
      indents:[],
      style:`none`
    }
    this.setPreview=this.setPreview.bind(this);
    this.handleShow=this.handleShow.bind(this);

  }
  setPreview(title,body){
    this.setState({previewTitle:title});
    this.setState({previewBody:body});
  }
  handleShow(){
    if (this.state.style===`none`){
      this.setState({style:`block`})
    }
    else{
      this.setState({style:`none`})
    }
  }
  componentDidMount(){

    var result=fetch("http://0.0.0.0:8000/publicaciones/?format=json",{
      method:"GET",
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
    console.log("/data=",this.state.articles);
    let indents = [];
    this.state.articles.forEach((articulo) => {
      if(articulo.curado===true && articulo.formateado===true && articulo.evaluado===false){

        const sec=
        <div>
          <tr>

            <th><Link to={"/test/publish/publish?article="+articulo.id+"&"}><p>Ver</p></Link></th>
            <th>{articulo.autor}</th>
            <th>{articulo.title}</th>
            <th>fecha</th>
            <th>Reputacion</th>
            <th>Nivel</th>
            <th>Deadline</th>
            <th>Categoría</th>
          </tr>

        </div>
          indents.push(sec);
        }
    });

    return(
      <div className="publishTable contenido">
        <table>
          <tr>
            <th></th>
            <th>Autor</th>
            <th>Título</th>
            <th>Enviado</th>
            <th>Rep</th>
            <th>Nivel</th>
            <th>Deadline</th>
            <th>Categoría</th>
          </tr>
        </table>

        <div id="publicables">
          <table>
            {indents}
          </table>
        </div>

      </div>
    );
  }

}
export default Table;
