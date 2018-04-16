import React, {Component} from 'react';



class Header extends Component {

  render(){
    const user=localStorage.getItem('user');
    const defUser=JSON.parse(user);
    return(
      <div className="curateHeader contenido clearfix">
        <div id="cabecera_iz">
          <p>nivel:</p>
          <p>reputación:</p>
        </div>
        <div id="cabecera_de">
          <p>usuario:{defUser.name}</p>
          <p>rol:</p>
        </div>
      </div>
    );
  }

}
export default Header;
