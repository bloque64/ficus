import React, {Component} from 'react';

class Articulo extends Component{



  render(){

    return(
        <div className="articlePage" style={this.props.show}>
          <h1>{this.props.title}</h1>
           <p>{this.props.body}</p>
        </div>


    );

  }






}

export default Articulo;
