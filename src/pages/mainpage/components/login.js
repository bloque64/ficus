import React, {Component} from 'react';
import sc2 from 'sc2-sdk'
import { Link } from 'react-router-dom';
import Cookie from 'js-cookie';
const R = require('ramda');

class Login extends Component{

  constructor(props){
    super(props);

    this.state={
      loading:false,
      parentAuthor:'',
      parentPermlink:'',
      accessToken:null,
      expiresIn:'',
      loginURL:null,
      user:'',
      metadata:null
    }
    this.tempUser=null;
    this.api=null;
    this.setUserInfo=this.setUserInfo.bind(this);
    this.findQuery=this.findQuery.bind(this);

  }


  setUserInfo(){

      var res=this.api.me((err,result)=>{
        console.log('/me',err,result);
        if(!err){
          this.setState({user:result.account})
          this.setState({metadata:JSON.stringify(result.user_metadata, null, 2)});
        }
      });
  }

  findQuery(){
    const parseSearchString = R.compose(
      R.fromPairs,
      R.map(R.split('=')),
      R.split('&'),
      R.slice(1, Infinity));

    const q = parseSearchString(window.location.search);
    return q;
  }
  componentWillMount(){
    this.api = sc2.Initialize({
          app: 'bloque64.app',
          callbackURL: 'http://www.bloque64.com/test',
          accessToken: 'access_token',
          scope: ['login','vote','comment']
      });

  }

    componentDidMount() {

        this.setState({loginURL:this.api.getLoginURL()})

        this.setState({accessToken:this.findQuery().access_token});
        if(this.state.accessToken){
          this.api.setAccessToken(this.state.accessToken);
          console.log('/access_token', this.state.accessToken);
          this.setUserInfo();
        }
  }

  render(){
    let log='';
    if(this.state.user){
      log=<p>{this.state.user.name}</p>
    }
    else{
      log=<p><a href={this.state.loginURL}>Iniciar sesión</a></p>
    }

    return(
      <div className="usuario clearfix">
      <ul>
        <li> <Link to='/test/post'><p>Publicar</p></Link></li>
        <li> <Link to='/test/curate'><p>Curar</p></Link></li>
        <li> <Link to='/test/correct'><p>Corregir</p></Link></li>
        <li> <Link to='/test/publishlist'><p>PublishList</p></Link></li>
        <li><p>{log}</p></li>
        {/*<li>{userd}</li>
        <li>{window.location.href.search("expires")}</li> */}
      </ul>
      </div>
    );
  }

}

export default Login;
