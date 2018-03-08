import React, {Component} from 'react';

var ReactCSSTransitionGroup =require('react-addons-css-transition-group');



class Titulares extends Component{
  constructor(props) {
    super(props);
    this.state = {titulares:[""] };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove=this.handleRemove.bind(this);
  }


  handleAdd(i) {
    const listTitulares=["El precio del sbd aumenta 30% el día de hoy"
                         ,"Sophia sorprende nuevamente"
                         ,"Perú abré mercado para recibir pagos en criptomonedas"];

    const newTitulares =this.state.titulares.slice();
    newTitulares.push(listTitulares[i]);
    this.setState({titulares:newTitulares});
  }

  handleRemove(i) {
    let newTitulares = this.state.titulares.slice();
    newTitulares.splice(i, 1);
    this.setState({titulares: newTitulares});
  }

  componentDidMount() {
    let count=0;
    setInterval(()=> {

      if (count===0){
        this.handleAdd(0);
        count=count+1;
      }
      else if (count>0){
        count=count+1;
        if(count===5){
          this.handleRemove(1);
        }
        else if (count===6){
          this.handleAdd(1);
        }
        else if (count===11)
        {
          this.handleRemove(1);
        }
        else if (count===12)
        {
          this.handleAdd(2);
        }
        else if (count===17){
          this.handleRemove(1);
          count=0;
        }

      }


      }, 2000);

  }

  render(){
    const titulares =  this.state.titulares.map((titular, i) => (

    <p key={titular.toString()} onClick={() => this.handleRemove(i)}>
       {titular}
     </p>

   ));
    return(
      <div id="Titulares" className="clearfix">
        <h2 >Titulares</h2>

        <ReactCSSTransitionGroup
          transitionName="titulares"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {titulares}
        </ReactCSSTransitionGroup>


      </div>






    );
  }
}
export default Titulares;
