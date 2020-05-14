const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

//////////Routes Require////////////////
const favorite = require('./api/routes/favorite');
const userData = require('./api/routes/userData');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','*');

  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods','GET,POST');
    return res.status(200).json({});
  }

  next();
});


///////////ROUTES/////////////////

app.use('/favorite',favorite);
app.use('/users',userData);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(new Error('not found 404'));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
   
   
    // render the error page
    res.status(err.status || 500);
    res.json(
       {
         status:'500',
        error:'an error has occured :('
       }
    );
    
  });

module.exports  =app;