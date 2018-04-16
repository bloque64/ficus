import React, { Component } from 'react';
import Pres from './components/pres.js';


import Header from './components/header.js';
import Main from './components/main.js';
import Footer from './components/footer.js';

class MainPage extends Component {
  render() {
    let welcome="Infórmate de las noticias mundiales en tu web descentralizada";
    let welcomeFooter="Únete a la comunidad de lectores y autores del primer periódico descentralizado para la comunidad hispana";
    return (
      <div className="contenido Mainpage">
        <Pres welcome={welcome} welcomeFooter={welcomeFooter}/>
        <Main/>
        <p>{this.props.text}</p>
        <Footer/>
      </div>
    );
  }
}

export default MainPage;
