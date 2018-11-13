const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = new express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((request,response,next)=>{
  var now = new Date().toString();
  var log = `${now}:${request.method} ${request.url}`;
  console.log(log);
  fs.appendFile('server log',log+'\n',(error)=>{
    if(error){
      console.log('unable to append to server log.');
    }
  });
  next();
});

app.use((req,res,next)=>{
  res.render('maintenance.hbs');
});

app.get('/',(request,response)=>{
  //response.send('<H1>Hello Express</H1>');
//  response.send({
//    name:'oscar',
//    last:'Hernandez'
//  });
  response.render('homePage.hbs',{
    pageTitle:'About page',
    currentYear:new Date().getFullYear(),
    welcomeMessage:'Welcome to my WebSite'
  });
});

app.get('/about',(request,response)=>{
  response.render('about.hbs',{
    pageTitle:'About page',
    currentYear:new Date().getFullYear()
  });
})


app.listen(3000,()=>{
  console.log('Server is up in 3000');
});
