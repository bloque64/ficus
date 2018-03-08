import React, {Component} from 'react';
import selector from '../../../img/selector.jpg';

import Login from './login.js';



class Header extends Component{

  constructor(props){
    super(props);
    this.state={menu:<p>parrafo</p>};
    this.getDia=this.getDia.bind(this);
    this.getMes=this.getMes.bind(this);

  }
  getDia(){
    const fecha=new Date();
    const days=["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
    let dayName;
    dayName="";
    for (var i = 0; i <= days.length; i++) {
      if((fecha.getDay())===i){
        dayName=days[i];
        return dayName;
        break;
      }
    }
  }
  getMes(){
    const fecha=new Date();
    let mes;
    mes="";
    const months=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio",
                  "Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    for (var i = 0; i < months.length; i++) {
      if(fecha.getMonth()===i){
        mes=months[i];
        return mes;
        break;
      }
    }
  }

  render(){
    const fecha=new Date();

    let fechaString=this.getDia()+", "+fecha.getDate()+" de "+this.getMes()+" de "+fecha.getFullYear().toString();


    return(
  <div className="header">
    <div  className="clearfix">
        <div className="logo clearfix">
          <h1 className="logo">Bloque64Logo</h1>
        </div>
        <span id="fecha">{fechaString}</span>
      </div>

      <div className="contenedor clearfix">



        <div className="nav-principal ">

          <nav>
            <ul>
                <li className="clearfix" ><img alt="" style={{ opacity: 0.2 }} src={selector}/>
                  <p>Política</p>
                </li>
                <li><img style={{ opacity: 0.4 }} src={selector} alt=""/>
                  <p>Economía</p>
                </li>
                <li><img style={{ opacity: 0.6 }} src={selector} alt=""/>
                  <p>Cultura</p>
                </li>
                <li><img style={{ opacity: 0.8 }} src={selector} alt=""/>
                  <p>Ciencia</p>

                </li>
                <li><img style={{ opacity: 1 }} src={selector} alt=""/>
                  <p>Deporte</p>
                </li>
            </ul>
          </nav>

        </div> {/*NavPrincipal*/}
        <Login/>

        {/*<div id="nombre">
          <h2>BLOQUE64</h2>
        </div>*/}

      </div> {/*contenedor*/}

    </div>

    );


  }

}

export default Header;
