import React, {Component} from 'react';
import { Link } from 'react-router-dom';


class Login extends Component {

  render(){

    return(
      <div className="Login contenido">
        <Link to="/" > <p>Esta es la página para logear</p></Link>


      </div>
    );
  }

}
export default Login;
