import React, { Component } from 'react';
import sc2 from 'sc2-sdk';
import MainPage from './pages/mainpage/mainpage.js';
import Post from './pages/postForm/post.js';
import Login from './pages/login/login.js'
import { Switch, Route } from 'react-router-dom';
import Curate from './pages/curate/curate.js';
import Preview from './pages/preview/preview.js';
import CorrectionList from './pages/correctionlist/correctionlist.js';
import Correction from './pages/correction/correction.js';
import PublishList from './pages/publishlist/publishlist.js';
import Publish from './pages/publish/publish.js';
import Article from './pages/article/article.js';
import User from './pages/user/user.js';
import Header from './header.js';
const R = require('ramda');




class Main extends Component {

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
      usedURL:false
    }
    this.accessToken=null;
    this.tempUser=null;
    this.user='';
    this.api=null;
    this.setUserInfo=this.setUserInfo.bind(this);
    this.findQuery=this.findQuery.bind(this);
    this.setAccessToken=this.setAccessToken.bind(this);
  }
  setUserInfo(){

      var res=this.api.me((err,result)=>{
        console.log('/me',err,result);
        if(!err){
          this.user=result.account;
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
        this.api.setAccessToken(this.accessToken);
        localStorage.setItem('token', this.accessToken);
        this.setUserInfo();
      }
    }
    else{
      this.accessToken=option;
      if(this.accessToken){
        this.api.setAccessToken(this.accessToken);
        localStorage.setItem('token', this.accessToken);
        this.setUserInfo();
      }
    }
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
          app: 'bloquetest',
          callbackURL: 'http://localhost:3001/test',
          accessToken: 'access_token',
          scope: ['login','vote','comment']
      });


  }
  render() {

    return (
      <div id='Main'>
      <Header api={this.api}/>
        <Switch>
          <Route exact path='/test' component={MainPage}/>
          <Route
             exact path='/test/post'
            render={(props) => <Post {...props} api={this.api} />}
          />
        {/*  <Route path='/test/post' component={Post}/>*/}
          <Route path='/test/login' component={Login}/>
          <Route path='/test/curate' component={Curate}/>
          <Route path='/test/previews' component={Preview}/>
          <Route path='/test/correct' component={CorrectionList}/>
          <Route path='/test/correction' component={Correction}/>
          <Route path='/test/publishlist' component={PublishList}/>
          <Route path='/test/publish' component={Publish}/>
          <Route path='/test/article' component={Article}/>
          <Route path='/test/user' render={(props) => <User {...props} api={this.api} />}
        />
        </Switch>
      </div>
    );
  }
}
<Route
   exact path='/test'
  render={(props) => <MainPage {...props} text='caca' />}
/>
export default Main;
