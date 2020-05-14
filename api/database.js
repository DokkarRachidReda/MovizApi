var mysql = require('mysql');


    var connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        password : 'Vitajus123_',
        database : 'movizdb',
        insecureAuth : true
      });
      
      connection.connect(function(err) {
        if (err){
          console.log('error : ',err);
          throw err
        } 
        console.log('You are now connected with mysql database...')
      })
  
      
   
module.exports = connection;