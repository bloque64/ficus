import React, {Component} from 'react';
import Top from './footerComponents/top.js';
import Midle1 from './footerComponents/midle1.js';
import Midle2 from './footerComponents/midle2.js';
import Bottom from './footerComponents/bottom.js';

class Footer extends Component{
  render(){
    return(
      <div id="mainpage_footer">
        <Top/>
        <Midle1/>
        <Midle2/>
        <Bottom/>
      </div>
    );
  }


}
export default Footer;
