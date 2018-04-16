import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class User extends Component {

  constructor(props){
    super(props);
    this.state={
      api:this.props.api,
      user:'',
      articles:[]

    };
    this.setAccessToken=this.setAccessToken.bind(this);
    this.setUserInfo=this.setUserInfo.bind(this);

  }
  setUserInfo(){
      var res=this.state.api.me((err,result)=>{
        console.log('/me',err,result);
        if(!err){
          this.setState({user:result.account})
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
        console.log('/token', this.accessToken);
        this.setUserInfo();
      }
    }

  }
componentWillMount() {
    const preAcces=localStorage.getItem('token');
    if (preAcces){
      this.setAccessToken(preAcces);
    }
    else{
      this.setAccessToken('firstTime');
    }
  }
  componentDidMount(){

    var result=fetch("http://0.0.0.0:8000/steemit/?format=json",{
      method:"GET",
      credentials:'include'
    }).then((response) => {
         return response.json()
     }).then((json) => {
          console.log('parsed json', json)
          this.setState({articles:json});
     }).catch(function(ex) {
       console.log('parsing failed', ex)
     });

  }
  render() {
    let indents = [];
    this.state.articles.forEach((articulo) => {
      if(articulo.autor===this.state.user.name){
        const sec=
        <div>
            <Link to={"/test/article/article?article="+articulo.id+"&"}><p>Ver</p></Link>
            <h3>{articulo.title}</h3>
            <hr/>
        </div>
          indents.push(sec);
        }
    });
    return(
      <div className='contenido' id='userPage'>
        <h1>User page</h1>
        <h2>Articulos publicados {indents.length}</h2>
        {indents}
      </div>
    );
  }
}

export default User;
