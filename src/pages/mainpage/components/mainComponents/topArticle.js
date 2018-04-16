import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class TopArticle extends Component{
  constructor(props){
    super(props);
    this.state={

      article:""

    }

  }

  componentDidMount(){
    console.log(this.props.id);

    fetch("http://0.0.0.0:8000/steemit/"+this.props.id+"/?format=json",{
      method:"GET",
      mode:'cors',
      credentials:'include'

    }).then((response) => {
         return response.json()
     }).then((json) => {
          console.log('parsed json', json)
          this.setState({article:json});
     }).catch(function(ex) {
       console.log('parsing failed', ex)
     });
  }


  render(){
    return(
      <div className="articuloTop clearfix" style={{ backgroundImage: `url(${this.props.Url})` }}>

        <div className="articuloTop_contenido">
          <h4>{this.props.titular}</h4>
          <Link to ={"/test/previews/preview?article="+this.props.id+"&"}><p>{this.state.article.title}</p></Link>
        </div>
      </div>
    );
  }
}

export default TopArticle;
