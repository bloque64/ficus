import React, {Component} from 'react';

class Bootom extends Component{

  render(){
    const fecha=new Date();
    return(
      <div id="footer_bottom">
        <div id="bottom_texto">
          <h1 className="footer_inline">BLOQUE64</h1>
          <p className="footer_inline">Todos los derechos reservados, {fecha.getFullYear()}</p>
        </div>
      </div>
    );
  }
}

export default Bootom;
