import React, {Component} from 'react';
import TopNew from './topNew.js';

class Aside extends Component{


  render(){
    return(
      <div>
      <aside className="aside">

      <div className="top">
          <h3>En caliente</h3>
        <div id="top-noticias">
         <TopNew number="1"   titular="Tormenta en Chile"/>
          <TopNew number="2"  titular="La red social que paga a sus autores"/>
          <TopNew number="3"  titular="Sophia: Robot humanoide"/>
          <TopNew number="4"  titular="Trump acusa a dirigentes politicos"/>
          <TopNew number="5"  titular="Venezuela protesta"/>
        </div>
      </div>
      <div id="suscriptor">
      <h3>Suscríbete</h3>
      </div>
      <div className="top">
          <h3>Autores destacados</h3>
        <div id="top-noticias">
         <TopNew number="1"   titular="Tormenta en Chile"/>
          <TopNew number="2"  titular="La red social que paga a sus autores"/>
          <TopNew number="3"  titular="Sophia: Robot humanoide"/>
          <TopNew number="4"  titular="Trump acusa a dirigentes politicos"/>
          <TopNew number="5"  titular="Venezuela protesta"/>
        </div>
      </div>
      <div className="patrocinador">
        <h3>Patrocinador</h3>
      </div>
      <div className="top">
          <h3>Hoy</h3>
        <div id="top-noticias">
         <TopNew number="1"   titular="Tormenta en Chile"/>
          <TopNew number="2"  titular="La red social que paga a sus autores"/>
          <TopNew number="3"  titular="Sophia: Robot humanoide"/>
          <TopNew number="4"  titular="Trump acusa a dirigentes politicos"/>
          <TopNew number="5"  titular="Venezuela protesta"/>
        </div>
      </div>
      <div className="patrocinador">
        <h3>Patrocinador</h3>
      </div>

      </aside>
      </div>
    );
  }
}

export default Aside;
