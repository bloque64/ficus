import React, {Component} from 'react';

import trump from '../../../img/trump.jpg';
import cup from '../../../img/worldcup.jpg';

import storm from '../../../img/storm.jpg';

var ReactCSSTransitionGroup =require('react-addons-css-transition-group');


class Pres extends Component{

  constructor(props){
    super(props);

    this.state={
                imagenes:[""]

              };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove=this.handleRemove.bind(this);
  }

  handleAdd(i,lista){
    let listImagenes;
    let newImagenes;

    if(lista===this.state.imagenes){
      newImagenes=this.state.imagenes.slice();
      listImagenes=[cup,trump,storm];
      newImagenes.push(listImagenes[i]);
      this.setState({imagenes:newImagenes});
    }



  }
  handleRemove(i,lista){
    let newImagenes;

    if(lista===this.state.imagenes){
      newImagenes=this.state.imagenes.slice();
      newImagenes.splice(i,1);
      this.setState({imagenes:newImagenes});
    }

  }
  componentDidMount() {
    let count=0;

    setInterval(()=> {
      if(count===0){
        count=count+1;
        this.handleAdd(0,this.state.imagenes);
      }

      else if (count>0){
        count=count+1;
        if(count===5){
          this.handleRemove(1,this.state.imagenes);
        }
        else if (count===6){
          this.handleAdd(1,this.state.imagenes);
        }
        else if (count===11)
        {
          this.handleRemove(1,this.state.imagenes);
        }
        else if (count===12)
        {
          this.handleAdd(2,this.state.imagenes);
        }
        else if (count===17){
          this.handleRemove(1,this.state.imagenes);
          count=0;
        }
      }
    }, 1100);


  }
  render(){

    const imagenes =this.state.imagenes.map((imagen,i)=>(
      <div key={"imagen"+i}className="im" style={{ backgroundImage: `url(${imagen})` }} >

      </div>
    ));


    return(
      <div className="pres clearfix">

        <div id="gradiente">
        <div id="texto-pres">
          <p id="welcome">{this.props.welcome}</p>
          <p id="autor">{this.props.welcomeFooter}</p>
          <p id="registro">Registrate</p>
        </div>
        </div>


        <div id="contenedor" className="clearfix">
        <ReactCSSTransitionGroup
          transitionName="imagenes"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}>
          {imagenes}
        </ReactCSSTransitionGroup>


        </div>

      </div>

    );
  }
}

export default Pres;
