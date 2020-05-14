const express = require('express');
const router = express.Router();

const mysql = require('../database');




router.get('/:id',(req,res,next)=>{

    var id = req.params.id;
    var query = 'select * from users where id = "'+id+'" ;';

    console.log(query);
    mysql.query(query,(err,results,fields)=>{
        if(err){
            console.log('err : ',err);
            res.send( JSON.stringify({"err": err}));
            throw err;
        }
        
       res.send(results[0])
       return;
    });

});




router.post('/',(req,res,next)=>{

   var recorde = req.body;

   var query = 'insert into users SET ?';

   mysql.query(query,recorde,(error,results,fields)=>{

    if (error) {
        res.json({
            status : 400,
            error : error,
            
        });

        return;
    }
    
    res.json({   
    status : 200
    });


    
   });

});




module.exports  =router;