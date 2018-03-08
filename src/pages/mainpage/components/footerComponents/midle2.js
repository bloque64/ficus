import React, {Component} from 'react';

class Midle2 extends Component{
  render(){
    const Url="https://cdn.discordapp.com/attachments/404260550609207296/408051794598690836/Mock_up_2-04.png"

    return(
      <div id="footer_midle2" style={{ backgroundImage: `url(${Url})`}}>
        <div id="midle2_texto">
          <h1>Únete a nuestra comunidad</h1>
          <h2>Es sencillo, rápido y gratis</h2>
        </div>
      </div>
    );
  }
}

export default Midle2;
