import React, {Component} from 'react';



class Header extends Component {

  render(){

    return(
      <div className="publishHeader contenido clearfix">
        <div id="cabecera_iz">
          <p>nivel:</p>
          <p>reputación:</p>
        </div>
        <div id="cabecera_de">
          <p>usuario:</p>
          <p>rol:</p>
        </div>
      </div>
    );
  }

}
export default Header;
