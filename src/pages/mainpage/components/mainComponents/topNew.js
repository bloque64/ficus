import React, {Component} from 'react';

class TopNew extends Component{
  render(){
    return(
      <div className="noticiaTop clearfix">
        <div className="imagen">
          {/*}<img src={this.props.imagen}/>*/}
          <h2>{this.props.number}</h2>
        </div>
        <h5>{this.props.titular}</h5>
      </div>
    );
  }
}

export default TopNew;
