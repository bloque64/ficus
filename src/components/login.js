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
      expiresIn:'',
      loginURL:null,
      user:'',
      metadata:null,
      localData:null,
      usedURL:false,
      api:this.props.api

    }
    this.accessToken=null;
    this.tempUser=null;
    this.api=null;
    this.setUserInfo=this.setUserInfo.bind(this);
    this.findQuery=this.findQuery.bind(this);
    this.setAccessToken=this.setAccessToken.bind(this);
    this.post=this.post.bind(this);
    this.cleanToken=this.cleanToken.bind(this);
  }

  setUserInfo(){

      var res=this.state.api.me((err,result)=>{
        console.log('/me',err,result);
        if(!err){
          this.setState({user:result.account})
          this.setState({metadata:JSON.stringify(result.user_metadata, null, 2)});
          localStorage.setItem('account', JSON.stringify(result));
          localStorage.setItem('user', JSON.stringify(result.account));
          this.setState({localData: localStorage.getItem('user')});
        }
      });
  }

  setAccessToken(option){
    {/*this.setState({accessToken:this.findQuery().access_token});*/}
    if(option=='firstTime'){
      this.accessToken=this.findQuery().access_token;
      if(this.accessToken){
        this.state.api.setAccessToken(this.accessToken);
        localStorage.setItem('token', this.accessToken);
        this.setUserInfo();
      }
    }
    else{
      this.accessToken=option;
      if(this.accessToken){
        this.state.api.setAccessToken(this.accessToken);
        localStorage.setItem('token', this.accessToken);
        this.setUserInfo();
      }
    }
  }
  post(event){
    this.state.api.comment('', 'testing', this.state.user.name, 'test', 'test-post', 'esto es un test', '', function (err, res) {
      console.log(err, res)
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
  cleanToken(event){
    localStorage.removeItem('token');
    this.setState({usedURL:true});
  }
 componentWillMount(){
  {/*  this.api = sc2.Initialize({
          app: 'bloquetest',
          callbackURL: 'http://localhost:3001/test',
          accessToken: 'access_token',
          scope: ['login','vote','comment']
      }); */}
      this.setState({loginURL:this.state.api.getLoginURL()});

  }

  componentDidMount() {
    const preAcces=localStorage.getItem('token');
    if (preAcces && this.state.usedURL===false){
      this.setAccessToken(preAcces);
    }
    else{
      this.setAccessToken('firstTime');
    }
  }

  render(){

    let log='';
    let menu=null;
    if(this.state.user){
      log=<Link to={'/test/user/@'+this.state.user.name}><p>{this.state.user.name}</p></Link>;
      menu= <ul>
        <li>{log}</li>
        <li> <Link to='/test/post'><p>Publicar</p></Link></li>
        <li> <Link to='/test/curate'><p>Curar</p></Link></li>
        <li> <Link to='/test/correct'><p>Corregir</p></Link></li>
        <li> <Link to='/test/publishlist'><p>PublishList</p></Link></li>
        <li><input type='button' onClick={this.post} value='post' /></li>;
        </ul>
    }
    else{
      log=<input type='button' href={this.state.loginURL} onClick={this.cleanToken} value='Iniciar Sesión' />;
      menu=<ul>
        <li>{log}</li></ul>;
    }

    return(
      <div className="usuario clearfix">
        {menu}
      </div>
    );
  }

}

export default Login;
