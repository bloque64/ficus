import React, { Component } from 'react';
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
import './App.css';



class App extends Component {


  render() {

    return (
      <div >
        <Switch>
          <Route exact path='/test' component={MainPage}/>
          <Route path='/test/post' component={Post}/>
          <Route path='/test/login' component={Login}/>
          <Route path='/test/curate' component={Curate}/>
          <Route path='/test/previews' component={Preview}/>
          <Route path='/test/correct' component={CorrectionList}/>
          <Route path='/test/correction' component={Correction}/>
          <Route path='/test/publishlist' component={PublishList}/>
          <Route path='/test/publish' component={Publish}/>
          <Route path='/test/articles' component={Article}/>

        </Switch>
      </div>
    );
  }
}

export default App;
