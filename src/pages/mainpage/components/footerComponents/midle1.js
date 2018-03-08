import React, {Component} from 'react';
import Pablo from '../../../../img/pablo.jpg';
import Chief2 from '../../../../img/chief2.jpg';
class Midle1 extends Component{
  render(){
    return(
      <div id="footer_midle1" className="clearfix">
        <div className="character clearfix">
          <img src={Pablo} />
          <p>"Los zapatos me aprietan, las medias me dan calor. Por eso camino descalzo y a veces corro bajo el sol."</p>
          <span className="strong"><p>CEO-Chief Executive Officer(head of the company)</p></span>
        </div>
        <div className="character clearfix" >
          <img src={Chief2} />
          <p>"No veo, no veo, que dolor de cabeza tengo.Me gusta más el blanco y negro, por que alma de rockero tengo."</p>
          <span className="strong"><p>CEO-Chief Executive Officer(head of the company)</p></span>
        </div>
        <div className="character clearfix">
          <img src={Chief2} />
          <p>"Soy la nada"</p>
          <span className="strong"><p>La nada</p></span>
        </div>
      </div>
    );
  }
}

export default Midle1;
