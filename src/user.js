import connect from './connect.js';

let result;
let acces="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBwIiwicHJveHkiOiJibG9xdWU2NC5hcHAiLCJ1c2VyIjoidmhpbm9qb3NhIiwic2NvcGUiOlsibG9naW4iLCJ2b3RlIiwiY29tbWVudCJdLCJpYXQiOjE1MTc5NDUzMzUsImV4cCI6MTUxODU1MDEzNX0.LO3poRCjZIvCwvHAJ_zTy1vgqpPLc69j6QeuveAQMeY";

var logURL=connect.getLoginURL();
connect.setAccessToken(acces);

const user=connect.me((err,res)=>{
  result=res;
  console.log('/me',err,res);
});


let obj={
    logURL:logURL,
    result:result
}
export default obj;
